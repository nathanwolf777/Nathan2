"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ReviewForm() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", text: "", stars: 5 });

  async function submit() {
    if (!form.name || !form.text) return;
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) setSent(true);
      else setError(data.error || "Une erreur est survenue.");
    } catch {
      setError("Impossible d'envoyer votre avis pour le moment.");
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 text-center">
        <div className="text-pearl font-medium mb-1">Merci pour votre avis !</div>
        <p className="text-sm text-mist">
          Il sera publié après vérification.
        </p>
      </div>
    );
  }

  if (!open) {
    return (
      <div className="text-center">
        <button
          onClick={() => setOpen(true)}
          className="text-sm px-6 py-3 rounded-full border border-white/15 text-pearl hover:border-accent/40 transition-colors"
        >
          Laisser un avis
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 space-y-4"
    >
      <div className="text-sm font-medium text-pearl">Votre avis</div>

      {/* stars */}
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setForm({ ...form, stars: i + 1 })}
            aria-label={`${i + 1} étoiles`}
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill={i < form.stars ? "#f2c53d" : "none"}
              stroke={i < form.stars ? "#f2c53d" : "#4a4a52"}
              strokeWidth="1.5"
            >
              <path d="M12 2.5l2.9 5.9 6.6 1-4.7 4.6 1.1 6.5L12 17.9 6.1 21l1.1-6.5L2.5 9.4l6.6-1L12 2.5Z" />
            </svg>
          </button>
        ))}
      </div>

      <input
        className="field-input"
        placeholder="Votre nom"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <textarea
        className="field-input min-h-[90px] resize-none"
        placeholder="Votre expérience…"
        value={form.text}
        onChange={(e) => setForm({ ...form, text: e.target.value })}
      />

      {error && <div className="text-xs text-red-400">{error}</div>}

      <button
        onClick={submit}
        disabled={sending}
        className="w-full py-3 rounded-full bg-pearl text-ink font-medium hover:bg-white transition-colors disabled:opacity-60"
      >
        {sending ? "Envoi…" : "Publier mon avis"}
      </button>
    </motion.div>
  );
}
