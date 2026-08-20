import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { saveOrder } from "@/lib/orders";
import { sendOrderEmail } from "@/lib/email";
import { FrameConfig, defaultConfig } from "@/data/product";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;
  try {
    if (secret && sig) {
      event = stripe.webhooks.constructEvent(body, sig, secret);
    } else {
      event = JSON.parse(body) as Stripe.Event;
    }
  } catch (err) {
    console.error("Webhook signature error", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // Look up the promo code the customer entered, if any.
    let promoCode = "";
    try {
      const full = await stripe.checkout.sessions.retrieve(session.id, {
        expand: ["total_details.breakdown.discounts"],
      });
      const disc = full.total_details?.breakdown?.discounts?.[0];
      if (disc) {
        // discount.discount.promotion_code may be an id; fetch its code.
        const promoId =
          typeof disc.discount?.promotion_code === "string"
            ? disc.discount.promotion_code
            : disc.discount?.promotion_code?.id;
        if (promoId) {
          const promo = await stripe.promotionCodes.retrieve(promoId);
          promoCode = promo.code || "";
        }
      }
    } catch (e) {
      console.error("Lecture code promo échouée:", e);
    }

    // Decode cart items (item0, item1, …). Falls back to legacy frameConfig.
    const items: {
      type: string;
      quantity: number;
      names: string;
      time: string;
      rankingOverall: string;
      rankingAge: string;
      nfc: boolean;
    }[] = [];

    const meta = session.metadata || {};
    const nb = parseInt(meta.nb_articles || "0", 10);
    if (nb > 0) {
      for (let i = 0; i < nb && i < 15; i++) {
        try {
          const raw = meta[`item${i}`];
          if (!raw) continue;
          const d = JSON.parse(raw);
          items.push({
            type: d.t || "solo",
            quantity: d.q || 1,
            names: d.n || "—",
            time: d.ti || "--:--:--",
            rankingOverall: d.ov || "",
            rankingAge: d.ag || "",
            nfc: d.nfc === 1,
          });
        } catch {
          /* skip malformed item */
        }
      }
    }

    // Legacy single-config fallback (older checkout).
    let config: FrameConfig = defaultConfig;
    try {
      config = {
        ...defaultConfig,
        ...JSON.parse(meta.frameConfig || "{}"),
      };
    } catch {
      /* keep default */
    }

    const shipping = session.customer_details;
    const addr = shipping?.address;

    const order = {
      id: `TF-${Date.now().toString(36).toUpperCase()}`,
      createdAt: new Date().toISOString(),
      status: "paid" as const,
      config,
      items: items.length > 0 ? items : undefined,
      shipping: {
        name: shipping?.name || "—",
        email: shipping?.email || "—",
        address: [addr?.line1, addr?.line2].filter(Boolean).join(", ") || "—",
        city: addr?.city || "—",
        postalCode: addr?.postal_code || "—",
        country: addr?.country || "—",
      },
      amount: (session.amount_total || 0) / 100,
      sessionId: session.id,
      promoCode,
      enseigne: meta.enseigne || "",
    };

    saveOrder(order);
    await sendOrderEmail(order);
  }

  return NextResponse.json({ received: true });
}
