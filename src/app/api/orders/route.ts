import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getOrderBySession, saveOrder } from "@/lib/orders";
import { FrameConfig, defaultConfig } from "@/data/product";

// Called by the confirmation page. Ensures an order exists even when webhooks
// aren't configured (e.g. local/demo). Returns a safe summary.
export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");
  if (!sessionId)
    return NextResponse.json({ error: "session_id manquant" }, { status: 400 });

  let order = getOrderBySession(sessionId);

  if (!order) {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      if (session.payment_status === "paid") {
        let config: FrameConfig = defaultConfig;
        try {
          config = {
            ...defaultConfig,
            ...JSON.parse(session.metadata?.frameConfig || "{}"),
          };
        } catch {
          /* default */
        }
        const cd = session.customer_details;
        const addr = cd?.address;
        order = {
          id: `TF-${Date.now().toString(36).toUpperCase()}`,
          createdAt: new Date().toISOString(),
          status: "paid",
          config,
          shipping: {
            name: cd?.name || "—",
            email: cd?.email || "—",
            address:
              [addr?.line1, addr?.line2].filter(Boolean).join(", ") || "—",
            city: addr?.city || "—",
            postalCode: addr?.postal_code || "—",
            country: addr?.country || "—",
          },
          amount: (session.amount_total || 0) / 100,
          sessionId: session.id,
        };
        saveOrder(order);
      }
    } catch (e) {
      console.error(e);
      return NextResponse.json({ error: "Session introuvable" }, { status: 404 });
    }
  }

  if (!order)
    return NextResponse.json({ error: "Commande introuvable" }, { status: 404 });

  return NextResponse.json({
    id: order.id,
    config: order.config,
    shipping: { name: order.shipping.name, email: order.shipping.email },
    amount: order.amount,
  });
}
