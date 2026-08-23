"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Minimal cookie notice. The site uses only technical/functional cookies
 * (cart storage) plus Stripe's payment-security cookies — no advertising or
 * analytics tracking — so a simple acknowledgement is sufficient.
 * The choice is stored in localStorage so the banner shows only once.
 */
export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const ack = localStorage.getItem("tf_cookie_ack");
      if (!ack) setVisible(true);
    } catch {
      /* if storage is blocked, don't nag */
    }
  }, []);

  function accept() {
    try {
      localStorage.setItem("tf_cookie_ack", "1");
    } catch {
      /* ignore */
    }
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-[200] p-4"
        >
          <div className="max-w-3xl mx-auto glass rounded-2xl border border-white/10 p-5 sm:flex sm:items-center sm:gap-5 shadow-2xl">
            <p className="text-sm text-mist leading-relaxed flex-1">
              Ce site utilise uniquement des cookies nécessaires à son
              fonctionnement (panier) et à la sécurité des paiements (Stripe).
              Aucun cookie publicitaire ni de suivi.{" "}
              <Link
                href="/confidentialite"
                className="text-pearl underline hover:text-white"
              >
                En savoir plus
              </Link>
              .
            </p>
            <button
              onClick={accept}
              className="mt-4 sm:mt-0 shrink-0 px-6 py-2.5 rounded-full bg-pearl text-ink text-sm font-medium hover:bg-white transition-colors w-full sm:w-auto"
            >
              J&apos;ai compris
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
