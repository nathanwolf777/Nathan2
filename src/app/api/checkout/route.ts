import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import {
  priceFor,
  labelFor,
  isDuoType,
  shippingCost,
  shippingLabel,
  FrameConfig,
  ShippingMethod,
} from "@/data/product";

interface CartLine {
  config: FrameConfig;
  quantity: number;
}

function encodeItem(c: FrameConfig, q: number): string {
  const names = isDuoType(c.type)
    ? `${c.p1FirstName} ${c.p1LastName} & ${c.p2FirstName} ${c.p2LastName}`
    : c.type === "hexa"
    ? c.firstName
    : `${c.firstName} ${c.lastName}`;
  return JSON.stringify({
    t: c.type,
    q,
    n: names,
    ti: c.time,
    ov: c.showRanking ? c.rankingOverall : "",
    ag: c.showRanking ? c.rankingAge : "",
    nfc: c.nfc ? 1 : 0,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      config?: FrameConfig;
      quantity?: number;
      items?: CartLine[];
      shipping?: ShippingMethod;
      eventName?: string;
    };

    let lines: CartLine[];
    let shipping: ShippingMethod;

    if (body.items && body.items.length > 0) {
      lines = body.items.map((it) => ({
        config: it.config,
        quantity: Math.min(20, Math.max(1, Math.floor(it.quantity || 1))),
      }));
      shipping = body.shipping || lines[0].config.shipping || "relay";
    } else if (body.config) {
      const quantity = Math.min(20, Math.max(1, Math.floor(body.quantity || 1)));
      lines = [{ config: body.config, quantity }];
      shipping = body.config.shipping || "relay";
    } else {
      return NextResponse.json({ error: "Panier vide." }, { status: 400 });
    }

    const eventName =
      body.eventName ||
      lines[0]?.config?.eventName ||
      "";

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      req.headers.get("origin") ||
      "http://localhost:3000";

    const line_items = lines.map((l) => {
      const c = l.config;
      const detail = isDuoType(c.type)
        ? `${c.p1FirstName} ${c.p1LastName} & ${c.p2FirstName} ${c.p2LastName}`
        : c.type === "hexa"
        ? `${c.firstName}`
        : `${c.firstName} ${c.lastName}`;
      const ranking = c.showRanking
        ? ` · #OV ${c.rankingOverall} · #AG ${c.rankingAge}`
        : "";
      return {
        price_data: {
          currency: "eur" as const,
          product_data: {
            name: `TrophyFrames — Cadre ${labelFor(c.type)}`,
            description: `${detail} · ${c.time}${ranking}${
              c.nfc ? " · Patch NFC" : ""
            }`,
          },
          unit_amount: Math.round(priceFor(c.type) * 100),
        },
        quantity: l.quantity,
      };
    });

    if (shippingCost(shipping) > 0) {
      line_items.push({
        price_data: {
          currency: "eur" as const,
          product_data: {
            name: shippingLabel(shipping),
            description: "Frais de livraison",
          },
          unit_amount: Math.round(shippingCost(shipping) * 100),
        },
        quantity: 1,
      });
    }

    const metadata: Record<string, string> = {
      livraison: shippingLabel(shipping),
      nb_articles: String(lines.length),
      ...(eventName ? { enseigne: eventName } : {}),
    };
    lines.forEach((l, i) => {
      if (i < 15) {
        metadata[`item${i}`] = encodeItem(l.config, l.quantity).slice(0, 490);
      }
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      locale: "fr",
      allow_promotion_codes: true,
      line_items,
      shipping_address_collection: { allowed_countries: ["FR"] },
      metadata,
      success_url: `${baseUrl}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/panier`,
    });

    return NextResponse.json({ url: session.url });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Erreur lors de la création du paiement." },
      { status: 500 }
    );
  }
}
