"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { FrameConfig, priceFor } from "@/data/product";

export interface CartItem {
  id: string; // unique line id
  config: FrameConfig;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  add: (config: FrameConfig, quantity: number) => void;
  remove: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
}

const CartContext = createContext<CartContextValue | null>(null);

// In-memory only (artifacts/browser-storage constraints). The cart lives for
// the session; it resets on a full page reload, which is acceptable here.
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Restore from sessionStorage if available (best-effort, never throws).
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("tf_cart");
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      sessionStorage.setItem("tf_cart", JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items, hydrated]);

  function add(config: FrameConfig, quantity: number) {
    setItems((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        config,
        quantity: Math.min(20, Math.max(1, quantity)),
      },
    ]);
  }

  function remove(id: string) {
    setItems((prev) => prev.filter((it) => it.id !== id));
  }

  function setQuantity(id: string, quantity: number) {
    setItems((prev) =>
      prev.map((it) =>
        it.id === id
          ? { ...it, quantity: Math.min(20, Math.max(1, quantity)) }
          : it
      )
    );
  }

  function clear() {
    setItems([]);
  }

  const count = items.reduce((n, it) => n + it.quantity, 0);
  const subtotal = items.reduce(
    (s, it) => s + priceFor(it.config.type) * it.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ items, add, remove, setQuantity, clear, count, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
