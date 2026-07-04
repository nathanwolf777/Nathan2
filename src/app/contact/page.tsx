"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  async function submit() {
    if (!form.name || !form.email || !form.message) return;
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setSent(true);
      } else {
        setError(data.error || "Une erreur est survenue.");
      }
    } catch {
      setError("Impossible d'envoyer le message pour le moment.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="pt-28 pb-20 px-5">
      <div className="max-w-2xl mx-auto">
        <Reveal>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-4">
            Contact
          </h1>
          <p className="text-mist mb-10">
            Une question sur votre commande ou une demande spéciale ? Écrivez-nous,
            nous répondons sous 24 h.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass rounded-2xl p-10 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-gold-sheen mx-auto flex items-center justify-center mb-4">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 13l4 4L19 7"
                    stroke="#0a0a0b"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2">Message envoyé</h2>
              <p className="text-mist text-sm">
                Merci {form.name.split(" ")[0]}, nous revenons vers vous très vite.
              </p>
            </motion.div>
          ) : (
            <div className="glass rounded-2xl p-6 space-y-5">
              <div>
                <label className="field-label">Nom</label>
                <input
                  className="field-input"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Votre nom"
                />
              </div>
              <div>
                <label className="field-label">Email</label>
                <input
                  className="field-input"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="vous@email.com"
                />
              </div>
              <div>
                <label className="field-label">Message</label>
                <textarea
                  className="field-input min-h-[120px] resize-none"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Votre message…"
                />
              </div>
              {error && (
                <div className="text-xs text-red-400 bg-red-400/10 rounded-lg px-3 py-2">
                  {error}
                </div>
              )}
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={submit}
                disabled={sending}
                className="w-full py-3.5 rounded-full bg-pearl text-ink font-medium hover:bg-white transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {sending ? (
                  <>
                    <span className="w-4 h-4 border-2 border-ink/30 border-t-ink rounded-full animate-spin" />
                    Envoi…
                  </>
                ) : (
                  "Envoyer le message"
                )}
              </motion.button>
            </div>
          )}
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-8 text-center text-sm text-mist">
            Ou par email :{" "}
            <span className="text-pearl">trophyframespro@gmail.com</span>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
