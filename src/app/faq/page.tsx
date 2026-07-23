"use client";

import { useState } from "react";
import type { Metadata } from "next";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "@/components/Reveal";

const faqs = [
  {
    q: "Comment personnaliser mon cadre ?",
    a: "Rendez-vous sur le configurateur, choisissez le modèle Solo ou Duo, puis renseignez votre temps, nom, pays, ville, année, catégorie, classement et ajoutez votre visuel central. La prévisualisation se met à jour en temps réel.",
  },
  {
    q: "Quelle est la différence entre le cadre Solo et Duo ?",
    a: "Le cadre Solo met en avant une performance individuelle (34,99 €). Le cadre Duo affiche deux participants avec deux emplacements de patch et le temps de l'équipe (39,99 €). Le cadre Duo (1 patch) affiche également deux participants mais avec un seul emplacement de patch (34,99 €).",
  },
  {
    q: "Quelles sont les dimensions du cadre ?",
    a: "Chaque cadre mesure 27 cm de longueur, 21 cm de largeur et 1,4 cm d'épaisseur. Un format pensé pour être posé ou accroché facilement.",
  },
  {
    q: "Quel est le délai de livraison ?",
    a: "Chaque cadre est fabriqué à la demande. Comptez généralement 5 à 10 jours ouvrés pour la fabrication et l'expédition. Vous recevez un email de suivi dès l'expédition.",
  },
  {
    q: "Quelles sont les options de livraison ?",
    a: "La livraison en point relais est offerte, sans montant minimum. La livraison à domicile est disponible pour 2 € supplémentaires. Nous livrons uniquement en France pour le moment.",
  },
  {
    q: "Comment fonctionne l'emplacement pour le patch ?",
    a: "Le centre du cadre comporte une bande velcro. Vous y collez vous-même le patch reçu lors de votre compétition, à la réception du cadre. Rien à envoyer de votre côté au moment de la commande.",
  },
  {
    q: "Le paiement est-il sécurisé ?",
    a: "Absolument. Les paiements sont traités par Stripe, leader mondial du paiement en ligne. Nous ne stockons aucune donnée bancaire.",
  },
  {
    q: "Puis-je modifier ma commande après paiement ?",
    a: "Contactez-nous dans les 24 heures suivant la commande via la page Contact. Tant que la fabrication n'a pas démarré, nous pouvons ajuster vos personnalisations.",
  },
];

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="pt-28 pb-20 px-5">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-4">
            Questions fréquentes
          </h1>
          <p className="text-mist mb-12">
            Tout ce que vous devez savoir avant de commander.
          </p>
        </Reveal>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <div className="glass rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="font-medium">{f.q}</span>
                  <motion.span
                    animate={{ rotate: open === i ? 45 : 0 }}
                    className="text-accent text-xl shrink-0"
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm text-mist leading-relaxed">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
