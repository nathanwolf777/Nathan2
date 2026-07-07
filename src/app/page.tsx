"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import ReviewsCarousel from "@/components/ReviewsCarousel";
import ReviewForm from "@/components/ReviewForm";
import FrameEnterButton from "@/components/FrameEnterButton";
import { PRICE_SOLO } from "@/data/product";

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
  { n: "03", t: "Commandez", d: "Paiement sécurisé, livraison gratuite chez vous." },
];

export default function Home() {
  return (
    <div className="relative">
      {/* black → gold ambient gradient background */}
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, rgba(201,162,75,0.14) 0%, rgba(201,162,75,0.05) 22%, rgba(10,10,11,0) 55%), linear-gradient(180deg, #0a0a0b 0%, #0d0b07 45%, #0a0a0b 100%)",
        }}
      />
      {/* ambient glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-accent/5 blur-[120px]" />

      {/* HERO */}
      <section className="relative pt-32 pb-20 px-5">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs text-mist mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Cadres souvenirs pour athlètes
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tightest leading-[0.95]"
            >
              Vos performances,
              <br />
              <span className="gold-text">immortalisées.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 text-lg text-mist max-w-md leading-relaxed"
            >
              Un cadre premium personnalisé qui capture votre exploit sportif.
              Solo ou duo. Fabriqué à la demande.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <FrameEnterButton
                href="/configurateur"
                className="group px-7 py-3.5 rounded-full bg-pearl text-ink font-medium hover:bg-white transition-all duration-300 hover:scale-105"
              >
                Créer mon cadre
                <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </FrameEnterButton>
              <div className="text-sm text-mist">
                <span className="text-pearl font-semibold text-lg">
                  À partir de{" "}
                  {PRICE_SOLO.toLocaleString("fr-FR", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </span>
                {" · "}Livraison gratuite
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="absolute -inset-6 bg-accent/10 blur-3xl rounded-full" />

            {/* gentle continuous float */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.03 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/cadre-hero.jpg"
                alt="Cadre souvenir TrophyFrames personnalisé pour athlètes — modèle Duo"
                width={1000}
                height={1333}
                priority
                className="relative w-full h-auto"
              />

              {/* light reflection sweeping across the glass, in a loop */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                initial={{ x: "-120%" }}
                animate={{ x: "120%" }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatDelay: 3.5,
                  ease: "easeInOut",
                }}
                style={{
                  background:
                    "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)",
                }}
              />
            </motion.div>
          </motion.div>
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

      {/* MODELS */}
      <section className="px-5 py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
          {[
            {
              t: "Cadre Solo",
              d: "Votre performance individuelle sublimée. Temps, nom, pays et vos classements #OV / #AG.",
              href: "/configurateur?type=solo",
            },
            {
              t: "Cadre Duo",
              d: "Pour les performances en équipe. Deux athlètes, un exploit, un cadre.",
              href: "/configurateur?type=duo",
            },
          ].map((m, i) => (
            <Reveal key={m.t} delay={i * 0.1}>
              <div className="relative overflow-hidden rounded-3xl glass p-10 h-full group">
                <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-accent/5 blur-3xl group-hover:bg-accent/10 transition-colors duration-700" />
                <span className="text-xs uppercase tracking-widest text-accent">
                  Modèle
                </span>
                <h3 className="text-3xl font-semibold mt-2 mb-3">{m.t}</h3>
                <p className="text-mist leading-relaxed max-w-sm">{m.d}</p>
                <FrameEnterButton
                  href={m.href}
                  className="inline-flex items-center gap-2 mt-6 text-sm text-pearl hover:gap-3 transition-all"
                >
                  Personnaliser →
                </FrameEnterButton>
              </div>
            </Reveal>
          ))}
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

      {/* GALLERY */}
      <section className="px-5 py-20">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-center mb-4">
              Chaque cadre, une <span className="gold-text">pièce unique</span>.
            </h2>
            <p className="text-mist text-center max-w-xl mx-auto mb-12">
              Un objet pensé pour être exposé, fabriqué avec soin.
            </p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-5">
            <Reveal>
              <div className="rounded-2xl overflow-hidden aspect-[4/5] relative group">
                <Image
                  src="/produit-1.jpg"
                  alt="Cadre TrophyFrames en situation"
                  width={1200}
                  height={1500}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              {/* video placeholder */}
              <div className="rounded-2xl overflow-hidden aspect-[4/5] relative border border-white/[0.07] bg-white/[0.02] flex flex-col items-center justify-center text-center px-6">
                <div className="w-16 h-16 rounded-full border border-accent/40 flex items-center justify-center mb-4">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="#f2c53d">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <div className="text-sm text-pearl font-medium">Vidéo à venir</div>
                <div className="text-xs text-mist mt-1">
                  Un aperçu animé du cadre arrive bientôt.
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="rounded-2xl overflow-hidden aspect-[4/5] relative group">
                <Image
                  src="/produit-2.jpg"
                  alt="Cadre TrophyFrames premium"
                  width={1200}
                  height={1500}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </Reveal>
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
                Créez votre cadre en quelques minutes. À partir de {PRICE_SOLO}€
                · livraison gratuite.
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
