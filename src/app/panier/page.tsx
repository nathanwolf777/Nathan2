"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/lib/cart";
import {
  labelFor,
  priceFor,
  isDuoType,
  shippingCost,
  shippingLabel,
  SHIPPING_HOME_SURCHARGE,
  ShippingMethod,
} from "@/data/product";

export default function CartPage() {
  const { items, remove, setQuantity, subtotal, clear } = useCart();
  const [shipping, setShipping] = useState<ShippingMethod>("relay");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = subtotal + shippingCost(shipping);

  async function checkout() {
    if (items.length === 0) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((it) => ({
            config: { ...it.config, shipping },
            quantity: it.quantity,
          })),
          shipping,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "Une erreur est survenue.");
        setLoading(false);
      }
    } catch {
      setError("Impossible de contacter le serveur de paiement.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen px-5 pt-28 pb-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-semibold tracking-tight mb-8">
          Votre panier
        </h1>

        {items.length === 0 ? (
          <div className="glass rounded-2xl p-10 text-center">
            <p className="text-mist mb-6">Votre panier est vide.</p>
            <Link
              href="/configurateur"
              className="inline-block px-7 py-3.5 rounded-full bg-pearl text-ink font-medium hover:bg-white transition-colors"
            >
              Créer un cadre
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_320px] gap-6 items-start">
            {/* items */}
            <div className="space-y-4">
              {items.map((it) => {
                const c = it.config;
                const names = isDuoType(c.type)
                  ? `${c.p1FirstName} & ${c.p2FirstName}`
                  : c.firstName;
                return (
                  <motion.div
                    key={it.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="glass rounded-2xl p-5 flex items-start justify-between gap-4"
                  >
                    <div className="min-w-0">
                      <div className="font-medium text-pearl">
                        Cadre {labelFor(c.type)}
                      </div>
                      <div className="text-sm text-mist mt-1">
                        {names || "—"} · {c.time || "--:--:--"}
                      </div>
                      {c.showRanking && (
                        <div className="text-xs text-mist mt-0.5">
                          #OV {c.rankingOverall} · #AG {c.rankingAge}
                        </div>
                      )}
                      {c.nfc && (
                        <div className="text-xs text-accent mt-0.5">
                          Patch NFC
                        </div>
                      )}
                      <button
                        onClick={() => remove(it.id)}
                        className="text-xs text-mist underline mt-2 hover:text-pearl"
                      >
                        Retirer
                      </button>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-semibold">
                        {(priceFor(c.type) * it.quantity).toLocaleString(
                          "fr-FR",
                          { style: "currency", currency: "EUR" }
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-2 justify-end">
                        <button
                          onClick={() => setQuantity(it.id, it.quantity - 1)}
                          className="w-7 h-7 rounded-full border border-white/15 hover:border-white/40"
                        >
                          −
                        </button>
                        <span className="w-5 text-center text-sm">
                          {it.quantity}
                        </span>
                        <button
                          onClick={() => setQuantity(it.id, it.quantity + 1)}
                          className="w-7 h-7 rounded-full border border-white/15 hover:border-white/40"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
              <button
                onClick={clear}
                className="text-xs text-mist underline hover:text-pearl"
              >
                Vider le panier
              </button>
            </div>

            {/* summary */}
            <div className="glass rounded-2xl p-6 lg:sticky lg:top-24">
              <div className="text-[11px] tracking-wider text-mist uppercase mb-2">
                Livraison
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <button
                  onClick={() => setShipping("relay")}
                  className={`rounded-xl border px-3 py-2.5 text-left transition-all ${
                    shipping === "relay"
                      ? "border-accent/60 bg-accent/10"
                      : "border-white/[0.08] hover:border-white/20"
                  }`}
                >
                  <div className="text-sm font-medium">Point relais</div>
                  <div className="text-xs text-accent">Offerte</div>
                </button>
                <button
                  onClick={() => setShipping("home")}
                  className={`rounded-xl border px-3 py-2.5 text-left transition-all ${
                    shipping === "home"
                      ? "border-accent/60 bg-accent/10"
                      : "border-white/[0.08] hover:border-white/20"
                  }`}
                >
                  <div className="text-sm font-medium">À domicile</div>
                  <div className="text-xs text-mist">
                    +{SHIPPING_HOME_SURCHARGE.toFixed(2).replace(".", ",")} €
                  </div>
                </button>
              </div>

              {shipping === "relay" && (
                <p className="text-[11px] text-mist leading-relaxed mb-3">
                  Vous recevrez un email après votre commande pour choisir votre
                  point relais.
                </p>
              )}

              <div className="flex justify-between text-sm text-mist">
                <span>Sous-total</span>
                <span>
                  {subtotal.toLocaleString("fr-FR", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </span>
              </div>
              <div className="flex justify-between text-sm text-mist mt-1">
                <span>{shippingLabel(shipping)}</span>
                <span>
                  {shipping === "home"
                    ? shippingCost(shipping).toLocaleString("fr-FR", {
                        style: "currency",
                        currency: "EUR",
                      })
                    : "Offerte"}
                </span>
              </div>
              <div className="flex justify-between mt-3 pt-3 border-t border-white/[0.08]">
                <span className="text-pearl">Total</span>
                <span className="text-2xl font-semibold">
                  {total.toLocaleString("fr-FR", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </span>
              </div>

              <p className="text-[11px] text-mist/70 mt-2">
                Nous livrons uniquement en France pour le moment.
              </p>

              {error && (
                <div className="text-xs text-red-400 mt-3 bg-red-400/10 rounded-lg px-3 py-2">
                  {error}
                </div>
              )}

              <button
                onClick={checkout}
                disabled={loading}
                className="w-full py-4 rounded-full bg-pearl text-ink font-medium hover:bg-white transition-colors disabled:opacity-60 mt-4 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-ink/30 border-t-ink rounded-full animate-spin" />
                    Redirection…
                  </>
                ) : (
                  "Payer"
                )}
              </button>
              <p className="text-center text-[11px] text-mist mt-3">
                Paiement sécurisé via Stripe
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
