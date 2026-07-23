import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import {
  priceFor,
  labelFor,
  isDuoType,
  shippingCost,
  shippingLabel,
  FrameConfig,
} from "@/data/product";

export async function POST(req: NextRequest) {
  try {
    const { config } = (await req.json()) as { config: FrameConfig };

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      req.headers.get("origin") ||
      "http://localhost:3000";

    // Compact config for Stripe metadata (limit: 500 chars/value).
    const compact = { ...config };

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `TrophyFrames — Cadre ${labelFor(config.type)}`,
              description: `${
                isDuoType(config.type)
                  ? `${config.p1FirstName} ${config.p1LastName} & ${config.p2FirstName} ${config.p2LastName}`
                  : `${config.firstName} ${config.lastName}`
              } · #OV ${config.rankingOverall} · #AG ${config.rankingAge}`,
            },
            unit_amount: Math.round(priceFor(config.type) * 100),
          },
          quantity: 1,
        },
        // Shipping as its own line so the customer sees the breakdown.
        ...(shippingCost(config.shipping) > 0
          ? [
              {
                price_data: {
                  currency: "eur" as const,
                  product_data: {
                    name: shippingLabel(config.shipping),
                  },
                  unit_amount: Math.round(shippingCost(config.shipping) * 100),
                },
                quantity: 1,
              },
            ]
          : []),
      ],
      shipping_address_collection: {
        allowed_countries: [
          "FR", "BE", "CH", "CA", "US", "GB", "DE", "ES", "IT",
          "PT", "NL", "SE", "NO", "DK", "AU", "LU", "IE",
        ],
      },
      metadata: {
        frameConfig: JSON.stringify(compact).slice(0, 490),
        livraison: shippingLabel(config.shipping),
      },
      success_url: `${baseUrl}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/configurateur`,
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
