"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Order } from "@/lib/orders";
import { labelFor, isDuoType } from "@/data/product";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Order | null>(null);

  const load = useCallback(
    async (pass: string) => {
      setLoading(true);
      const res = await fetch("/admin/api", {
        headers: { "x-admin-password": pass },
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders);
        setAuthed(true);
        setError("");
      } else {
        setError("Mot de passe incorrect.");
      }
      setLoading(false);
    },
    []
  );

  async function markShipped(id: string) {
    await fetch("/admin/api", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-password": password },
      body: JSON.stringify({ id, status: "shipped" }),
    });
    setOrders((os) =>
      os.map((o) => (o.id === id ? { ...o, status: "shipped" } : o))
    );
    setSelected((s) => (s && s.id === id ? { ...s, status: "shipped" } : s));
  }

  useEffect(() => {
    if (authed) {
      const t = setInterval(() => load(password), 15000);
      return () => clearInterval(t);
    }
  }, [authed, password, load]);

  if (!authed) {
    return (
      <div className="pt-28 pb-20 px-5 min-h-[70vh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-8 w-full max-w-sm"
        >
          <h1 className="text-2xl font-semibold mb-1">Espace administrateur</h1>
          <p className="text-mist text-sm mb-6">Accès réservé.</p>
          <input
            type="password"
            className="field-input mb-3"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && load(password)}
          />
          {error && <p className="text-red-400 text-xs mb-3">{error}</p>}
          <button
            onClick={() => load(password)}
            disabled={loading}
            className="w-full py-3 rounded-full bg-pearl text-ink font-medium hover:bg-white transition-colors disabled:opacity-60"
          >
            {loading ? "Connexion…" : "Se connecter"}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Commandes</h1>
            <p className="text-mist text-sm mt-1">
              {orders.length} commande{orders.length > 1 ? "s" : ""} ·{" "}
              {orders.filter((o) => o.status === "paid").length} à expédier
            </p>
          </div>
          <button
            onClick={() => load(password)}
            className="text-sm px-4 py-2 rounded-full glass hover:border-accent/30 transition-colors"
          >
            Actualiser
          </button>
        </div>

        {orders.length === 0 ? (
          <div className="glass rounded-2xl p-12 text-center text-mist">
            Aucune commande pour le moment.
          </div>
        ) : (
          <div className="grid gap-3">
            {orders.map((o) => (
              <motion.button
                key={o.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => setSelected(o)}
                className="glass rounded-2xl p-5 text-left hover:border-accent/20 transition-colors grid grid-cols-[auto_1fr_auto] gap-4 items-center"
              >
                <MiniFrame order={o} />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{o.id}</span>
                    <StatusBadge status={o.status} />
                  </div>
                  <div className="text-sm text-mist mt-1">
                    {o.shipping.name} · Cadre{" "}
                    {labelFor(o.config.type)} · #OV{" "}
                    {o.config.rankingOverall}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">
                    {o.amount.toLocaleString("fr-FR", {
                      style: "currency",
                      currency: "EUR",
                    })}
                  </div>
                  <div className="text-xs text-mist mt-1">
                    {new Date(o.createdAt).toLocaleDateString("fr-FR")}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </div>

      {/* detail drawer */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md glass z-50 overflow-y-auto p-7"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-semibold">{selected.id}</h2>
                  <StatusBadge status={selected.status} />
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="text-mist hover:text-pearl text-xl"
                >
                  ✕
                </button>
              </div>

              <MiniFrame order={selected} large />

              <Section title="Client">
                <Detail label="Nom" value={selected.shipping.name} />
                <Detail label="Email" value={selected.shipping.email} />
                <Detail label="Adresse" value={selected.shipping.address} />
                <Detail
                  label="Ville"
                  value={`${selected.shipping.postalCode} ${selected.shipping.city}`}
                />
                <Detail label="Pays" value={selected.shipping.country} />
              </Section>

              <Section title="Personnalisation">
                <Detail
                  label="Modèle"
                  value={`Cadre ${
                    labelFor(selected.config.type)
                  }`}
                />
                <Detail label="Temps" value={selected.config.time} />
                {isDuoType(selected.config.type) ? (
                  <>
                    <Detail
                      label="Participant 1"
                      value={`${selected.config.p1FirstName} ${selected.config.p1LastName}`}
                    />
                    <Detail
                      label="Participant 2"
                      value={`${selected.config.p2FirstName} ${selected.config.p2LastName}`}
                    />
                  </>
                ) : (
                  <Detail
                    label="Athlète"
                    value={`${selected.config.firstName} ${selected.config.lastName}`}
                  />
                )}
                <Detail label="Pays" value={`FRA — France`} />
                <Detail
                  label="Classement général"
                  value={`#OV ${selected.config.rankingOverall}`}
                />
                <Detail
                  label="Classement catégorie"
                  value={`#AG ${selected.config.rankingAge}`}
                />
              </Section>

              {selected.status === "paid" ? (
                <button
                  onClick={() => markShipped(selected.id)}
                  className="w-full mt-6 py-3.5 rounded-full bg-gold-sheen text-ink font-medium hover:brightness-110 transition-all"
                >
                  Marquer comme expédiée
                </button>
              ) : (
                <div className="w-full mt-6 py-3.5 rounded-full glass text-center text-sm text-mist">
                  Commande expédiée ✓
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatusBadge({ status }: { status: Order["status"] }) {
  return (
    <span
      className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full ${
        status === "shipped"
          ? "bg-green-500/15 text-green-400"
          : "bg-accent/15 text-accent"
      }`}
    >
      {status === "shipped" ? "Expédiée" : "À expédier"}
    </span>
  );
}

function MiniFrame({ order, large }: { order: Order; large?: boolean }) {
  return (
    <div
      className={`rounded-lg border border-accent/30 flex flex-col items-center justify-center text-center p-2 shrink-0 ${
        large ? "w-full aspect-[3/4] my-4" : "w-12 h-16"
      }`}
      style={{
        background: "linear-gradient(135deg,#1a1a1f,#0c0c0e)",
      }}
    >
      {large && (
        <>
          <div className="text-[9px] gold-text tracking-widest uppercase">
            TrophyFrames
          </div>
          <div className="gold-text font-bold text-2xl mt-3">
            {order.config.time}
          </div>
          <div className="text-pearl text-sm mt-2 font-medium">
            {isDuoType(order.config.type)
              ? `${order.config.p1FirstName} ${order.config.p1LastName} & ${order.config.p2FirstName} ${order.config.p2LastName}`
              : `${order.config.firstName} ${order.config.lastName}`}
          </div>
          <div className="text-mist text-xs mt-2">FRA 🇫🇷</div>
          <div className="gold-text text-xs mt-1">
            #OV {order.config.rankingOverall} · #AG {order.config.rankingAge}
          </div>
        </>
      )}
      {!large && (
        <div className="gold-text font-bold text-[8px]">
          {order.config.rankingOverall
            ? `#${order.config.rankingOverall}`
            : "TF"}
        </div>
      )}
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-6">
      <div className="text-xs uppercase tracking-widest text-accent mb-3">
        {title}
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm gap-4">
      <span className="text-mist shrink-0">{label}</span>
      <span className="text-pearl font-medium text-right">{value}</span>
    </div>
  );
}
