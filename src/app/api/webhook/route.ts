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

    let config: FrameConfig = defaultConfig;
    try {
      config = {
        ...defaultConfig,
        ...JSON.parse(session.metadata?.frameConfig || "{}"),
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
    };

    saveOrder(order);
    await sendOrderEmail(order);
  }

  return NextResponse.json({ received: true });
}
