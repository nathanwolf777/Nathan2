import fs from "fs";
import path from "path";
import { FrameConfig } from "@/data/product";

export interface Order {
  id: string;
  createdAt: string;
  status: "paid" | "shipped";
  config: FrameConfig;
  shipping: {
    name: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  amount: number;
  sessionId: string;
}

// On Vercel the project filesystem is read-only; only /tmp is writable
// (and ephemeral). We use it as a best-effort cache. Email + Stripe remain
// the reliable sources of truth. Every fs call is guarded so the app NEVER
// crashes (no more 500 errors) even when writing/reading fails.
const FILE = path.join("/tmp", "trophyframes-orders.json");

function readAll(): Order[] {
  try {
    if (!fs.existsSync(FILE)) return [];
    return JSON.parse(fs.readFileSync(FILE, "utf-8"));
  } catch {
    return [];
  }
}

function writeAll(orders: Order[]): void {
  try {
    fs.writeFileSync(FILE, JSON.stringify(orders, null, 2));
  } catch (e) {
    // Read-only or ephemeral FS — ignore, email/Stripe hold the real data.
    console.log("Stockage commande non persistant (normal sur Vercel).");
  }
}

export function getOrders(): Order[] {
  return readAll();
}

export function saveOrder(order: Order): void {
  const orders = readAll();
  orders.unshift(order);
  writeAll(orders);
}

export function updateStatus(id: string, status: Order["status"]): void {
  const orders = readAll();
  const idx = orders.findIndex((o) => o.id === id);
  if (idx >= 0) {
    orders[idx].status = status;
    writeAll(orders);
  }
}

export function getOrderBySession(sessionId: string): Order | undefined {
  return readAll().find((o) => o.sessionId === sessionId);
}
