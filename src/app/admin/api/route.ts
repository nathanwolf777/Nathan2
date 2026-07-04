import { NextRequest, NextResponse } from "next/server";
import { getOrders, updateStatus } from "@/lib/orders";

function authorized(req: NextRequest): boolean {
  const pass = process.env.ADMIN_PASSWORD || "changeme";
  const header = req.headers.get("x-admin-password");
  const cookie = req.cookies.get("tf_admin")?.value;
  return header === pass || cookie === pass;
}

export async function GET(req: NextRequest) {
  if (!authorized(req))
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  return NextResponse.json({ orders: getOrders() });
}

export async function POST(req: NextRequest) {
  if (!authorized(req))
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  const { id, status } = await req.json();
  if (!id || !["paid", "shipped"].includes(status))
    return NextResponse.json({ error: "Paramètres invalides" }, { status: 400 });
  updateStatus(id, status);
  return NextResponse.json({ ok: true });
}
