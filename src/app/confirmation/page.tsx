"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import FramePreview from "@/components/FramePreview";
import { FrameConfig, defaultConfig } from "@/data/product";

interface Summary {
  id: string;
  config: FrameConfig;
  shipping: { name: string; email: string };
  amount: number;
}

function Confirmation() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");
  const [data, setData] = useState<Summary | null>(null);
  const [state, setState] = useState<"loading" | "ok" | "error">("loading");

  useEffect(() => {
    if (!sessionId) {
      setState("error");
      return;
    }
    fetch(`/api/orders?session_id=${sessionId}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.error) setState("error");
        else {
          setData(d);
          setState("ok");
        }
      })
      .catch(() => setState("error"));
  }, [sessionId]);

  return (
    <div className="pt-28 pb-20 px-5 min-h-[70vh]">
      <div className="max-w-4xl mx-auto">
        {state === "loading" && (
          <div className="text-center py-20">
            <div className="w-8 h-8 border-2 border-white/20 border-t-accent rounded-full animate-spin mx-auto" />
            <p className="text-mist mt-4">Confirmation de votre commande…</p>
          </div>
        )}

        {state === "error" && (
          <div className="text-center py-20">
            <h1 className="text-3xl font-semibold mb-3">Commande introuvable</h1>
            <p className="text-mist mb-6">
              Nous n&apos;avons pas pu retrouver votre commande. Si vous avez été
              débité, contactez-nous.
            </p>
            <Link
              href="/configurateur"
              className="inline-block px-6 py-3 rounded-full bg-pearl text-ink font-medium"
            >
              Retour au configurateur
            </Link>
          </div>
        )}

        {state === "ok" && data && (
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="w-14 h-14 rounded-full bg-gold-sheen flex items-center justify-center mb-6"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 13l4 4L19 7"
                    stroke="#0a0a0b"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
              <h1 className="text-4xl font-semibold tracking-tight mb-3">
                Merci, {data.shipping.name?.split(" ")[0] || "champion"} !
              </h1>
              <p className="text-mist leading-relaxed mb-6">
                Votre commande est confirmée. Votre cadre est en cours de
                fabrication et vous recevrez un email de suivi à{" "}
                <span className="text-pearl">{data.shipping.email}</span>.
              </p>
              <div className="glass rounded-2xl p-5 space-y-3 mb-6">
                <Row label="Référence" value={data.id} />
                <Row
                  label="Modèle"
                  value={`Cadre ${data.config.type === "duo" ? "Duo" : "Solo"}`}
                />
                <Row
                  label="Montant"
                  value={data.amount.toLocaleString("fr-FR", {
                    style: "currency",
                    currency: "EUR",
                  })}
                />
                <Row label="Livraison" value="Gratuite" />
              </div>
              <Link
                href="/"
                className="inline-block px-6 py-3 rounded-full bg-pearl text-ink font-medium hover:bg-white transition-colors"
              >
                Retour à l&apos;accueil
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <FramePreview config={{ ...defaultConfig, ...data.config }} />
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-mist">{label}</span>
      <span className="text-pearl font-medium">{value}</span>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="pt-28 text-center text-mist">…</div>}>
      <Confirmation />
    </Suspense>
  );
}
