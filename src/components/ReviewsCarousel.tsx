"use client";

import { motion } from "framer-motion";

export interface Review {
  name: string;
  text: string;
  stars: number;
}

// Avis d'exemple (seront remplacés par de vrais avis via base de données au Lot 2).
const sampleReviews: Review[] = [
  { name: "Julie M.", text: "Cadre magnifique, la finition est incroyable. Il trône dans mon salon !", stars: 5 },
  { name: "Thomas R.", text: "Parfait pour immortaliser ma première compétition. Livraison rapide.", stars: 5 },
  { name: "Camille D.", text: "Qualité au top, le rendu doré est superbe. Je recommande à 100%.", stars: 5 },
  { name: "Alexandre P.", text: "Commandé en duo avec mon binôme, on est fiers de l'exposer.", stars: 5 },
  { name: "Sarah L.", text: "Un super souvenir de compétition, très bonne idée cadeau.", stars: 4 },
  { name: "Kevin B.", text: "Emballage soigné, cadre robuste. Exactement comme sur le configurateur.", stars: 5 },
];

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill={i < n ? "#f2c53d" : "none"}
          stroke={i < n ? "#f2c53d" : "#4a4a52"}
          strokeWidth="1.5"
        >
          <path d="M12 2.5l2.9 5.9 6.6 1-4.7 4.6 1.1 6.5L12 17.9 6.1 21l1.1-6.5L2.5 9.4l6.6-1L12 2.5Z" />
        </svg>
      ))}
    </div>
  );
}

function Card({ r }: { r: Review }) {
  return (
    <div className="shrink-0 w-[300px] rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 mx-3">
      <Stars n={r.stars} />
      <p className="text-sm text-pearl/90 leading-relaxed mt-3 mb-4">
        &ldquo;{r.text}&rdquo;
      </p>
      <div className="text-xs text-mist font-medium">{r.name}</div>
    </div>
  );
}

export default function ReviewsCarousel({
  reviews = sampleReviews,
}: {
  reviews?: Review[];
}) {
  // Duplicate the list so the marquee loops seamlessly.
  const loop = [...reviews, ...reviews];
  return (
    <div className="relative w-full overflow-hidden py-2">
      {/* fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-ink to-transparent" />
      <motion.div
        className="flex w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {loop.map((r, i) => (
          <Card key={i} r={r} />
        ))}
      </motion.div>
    </div>
  );
}
