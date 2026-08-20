"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import ReviewsCarousel from "@/components/ReviewsCarousel";
import ReviewForm from "@/components/ReviewForm";
import FrameEnterButton from "@/components/FrameEnterButton";
import HeroMedia from "@/components/HeroMedia";
import {
  PRICE_HEXA,
  PRICE_SOLO,
  PRICE_DUO,
  PRICE_DUO_SOLO,
} from "@/data/product";

const features = [
  {
    icon: "eye",
    title: "Prévisualisation temps réel",
    desc: "Personnalisez chaque détail et voyez votre cadre prendre vie instantanément.",
  },
  {
    icon: "gem",
    title: "Finition premium",
    desc: "Cadre bois noir, lettrage doré en relief et fond mat. Un objet à exposer.",
  },
  {
    icon: "star",
    title: "Édition unique",
    desc: "Chaque cadre est fabriqué à la demande, à votre performance, à votre exploit.",
  },
];

function FeatureIcon({ name }: { name: string }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (name === "eye")
    return (
      <svg {...common}>
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  if (name === "gem")
    return (
      <svg {...common}>
        <path d="M6 3h12l4 6-10 12L2 9Z" />
        <path d="M2 9h20M12 3 8 9l4 12 4-12-4-6" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M12 2.5l2.9 5.9 6.6 1-4.7 4.6 1.1 6.5L12 17.9 6.1 21l1.1-6.5L2.5 9.4l6.6-1L12 2.5Z" />
    </svg>
  );
}

const steps = [
  { n: "01", t: "Personnalisez", d: "Temps, nom, pays et classements #OV / #AG." },
  { n: "02", t: "Prévisualisez", d: "Un rendu ultra-réaliste, mis à jour en direct." },
  { n: "03", t: "Commandez", d: "Paiement sécurisé, livraison offerte en point relais." },
];

export default function Home() {
  const [brand, setBrand] = useState<null | "crossfit-valence" | "bdp">(null);
  return (
    <div className="relative overflow-x-clip">
      {/* ambient glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[min(800px,100vw)] h-[500px] sm:h-[800px] rounded-full bg-accent/5 blur-[120px]" />

      {/* HERO — brand choice, then products */}
      <section className="relative pt-32 pb-16 px-5 min-h-[70vh] flex items-center">
        <div className="max-w-6xl mx-auto w-full">
          {brand === null ? (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="text-center mb-12"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs text-mist mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  Cadres souvenirs pour athlètes
                </div>
                <h1 className="text-4xl sm:text-6xl font-semibold tracking-tightest leading-[0.95]">
                  Vos performances,
                  <br />
                  <span className="gold-text">immortalisées.</span>
                </h1>
                <p className="mt-5 text-mist max-w-lg mx-auto">
                  Choisissez votre événement pour découvrir les cadres
                  disponibles.
                </p>
              </motion.div>

              <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
                {(
                  [
                    {
                      id: "crossfit-valence" as const,
                      name: "CrossFit Valence",
                      sub: "Cadres souvenirs officiels de l'événement",
                    },
                    {
                      id: "bdp" as const,
                      name: "BDP",
                      sub: "Cadres souvenirs officiels de l'événement",
                    },
                  ]
                ).map((b, i) => (
                  <motion.button
                    key={b.id}
                    onClick={() => setBrand(b.id)}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative overflow-hidden rounded-3xl glass p-10 min-h-[240px] flex flex-col justify-end text-left border border-white/[0.07] hover:border-accent/40 transition-colors"
                  >
                    <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-accent/10 blur-3xl group-hover:bg-accent/20 transition-colors duration-700" />
                    <span className="text-xs uppercase tracking-widest text-accent mb-2">
                      Notre partenaire
                    </span>
                    <span className="text-3xl sm:text-4xl font-semibold">
                      {b.name}
                    </span>
                    <span className="text-mist text-sm mt-2">{b.sub}</span>
                    <span className="inline-flex items-center gap-2 mt-5 text-sm text-pearl group-hover:gap-3 transition-all">
                      Voir les cadres →
                    </span>
                  </motion.button>
                ))}
              </div>
            </>
          ) : (
            <motion.div
              key={brand}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                <div>
                  <button
                    onClick={() => setBrand(null)}
                    className="text-sm text-mist hover:text-pearl mb-2 inline-flex items-center gap-1"
                  >
                    ← Changer d'événement
                  </button>
                  <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                    Cadres{" "}
                    <span className="gold-text">
                      {brand === "crossfit-valence" ? "CrossFit Valence" : "BDP"}
                    </span>
                  </h2>
                  <p className="text-mist mt-2">
                    Utilisez votre bon de réduction reçu le jour de l'événement au
                    moment du paiement.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    label: "Hexagone",
                    price: PRICE_HEXA,
                    img: "/carte-hexagone.jpg",
                    type: "hexa",
                  },
                  {
                    label: "Solo",
                    price: PRICE_SOLO,
                    img: "/carte-solo.jpg",
                    type: "solo",
                  },
                  {
                    label: "Duo",
                    price: PRICE_DUO,
                    img: "/carte-duo.jpg",
                    type: "duo",
                  },
                  {
                    label: "Duo (1 patch)",
                    price: PRICE_DUO_SOLO,
                    img: "/carte-duo-1patch.jpg",
                    type: "duo-solo",
                  },
                ].map((prod, i) => (
                  <Reveal key={prod.label} delay={i * 0.08}>
                    <div className="group rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden hover:border-accent/25 transition-colors duration-500 flex flex-col h-full">
                      <div className="relative aspect-square overflow-hidden bg-smoke/40">
                        <Image
                          src={prod.img}
                          alt={`Cadre ${prod.label}`}
                          width={400}
                          height={400}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4 flex flex-col flex-1">
                        <div className="text-sm font-medium text-pearl">
                          Cadre {prod.label}
                        </div>
                        <div className="text-lg font-semibold gold-text mt-0.5">
                          {prod.price.toLocaleString("fr-FR", {
                            style: "currency",
                            currency: "EUR",
                          })}
                        </div>
                        <FrameEnterButton
                          href={`/configurateur?type=${prod.type}&event=${brand}`}
                          className="mt-3 w-full py-2.5 rounded-full bg-pearl text-ink text-sm font-medium hover:bg-white transition-colors text-center"
                        >
                          Commander
                        </FrameEnterButton>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              <p className="text-center text-xs text-mist mt-8">
                À partir de{" "}
                {PRICE_HEXA.toLocaleString("fr-FR", {
                  style: "currency",
                  currency: "EUR",
                })}{" "}
                · Livraison offerte en point relais · Expédition en moins de 5
                jours ouvrés
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-5 py-20">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-center max-w-2xl mx-auto">
              Pensé comme un <span className="gold-text">objet d&apos;exception</span>.
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-5 mt-14">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.1}>
                <div className="group relative h-full rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.03] to-transparent p-8 hover:border-accent/25 transition-all duration-500 overflow-hidden">
                  <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-accent/[0.06] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative flex items-center gap-3 mb-5">
                    <div className="flex items-center justify-center w-11 h-11 rounded-xl border border-accent/30 text-accent group-hover:bg-accent/10 transition-colors duration-500">
                      <FeatureIcon name={f.icon} />
                    </div>
                    <span className="text-xs font-mono text-mist/60">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="relative text-lg font-semibold mb-2">
                    {f.title}
                  </h3>
                  <p className="relative text-sm text-mist leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="px-5 py-20">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-center mb-14">
              Trois étapes. Un souvenir éternel.
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.12}>
                <div className="text-center">
                  <div className="gold-text text-5xl font-bold mb-4">{s.n}</div>
                  <h3 className="text-xl font-semibold mb-2">{s.t}</h3>
                  <p className="text-sm text-mist">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-5">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-center mb-4">
              Ils ont immortalisé leur exploit
            </h2>
            <p className="text-mist text-center max-w-xl mx-auto mb-10">
              Ce que disent nos clients.
            </p>
          </Reveal>
        </div>
        <Reveal>
          <ReviewsCarousel />
        </Reveal>
        <div className="max-w-md mx-auto px-5 mt-12">
          <Reveal>
            <ReviewForm />
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 py-24">
        <Reveal>
          <div className="max-w-4xl mx-auto text-center relative overflow-hidden rounded-[32px] glass p-12 sm:p-16">
            <div className="absolute inset-0 bg-accent/5 blur-3xl" />
            <div className="relative">
              <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-4">
                Prêt à immortaliser votre exploit ?
              </h2>
              <p className="text-mist mb-8 max-w-md mx-auto">
                Créez votre cadre en quelques minutes. À partir de {PRICE_HEXA}€
                · livraison offerte en point relais.
              </p>
              <FrameEnterButton
                href="/configurateur"
                className="inline-block px-8 py-4 rounded-full bg-pearl text-ink font-medium hover:bg-white transition-all duration-300 hover:scale-105"
              >
                Commander mon cadre
              </FrameEnterButton>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
