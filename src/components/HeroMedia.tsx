"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * Hero media block: a video on the left and two stacked photos on the right.
 * The video is loaded from /hero.mp4 if present; otherwise a styled
 * placeholder is shown so the layout never looks broken.
 */
export default function HeroMedia() {
  const [hasVideo, setHasVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Detect whether /hero.mp4 exists so we can show the placeholder instead.
  useEffect(() => {
    let alive = true;
    fetch("/hero.mp4", { method: "HEAD" })
      .then((r) => {
        if (alive && r.ok) setHasVideo(true);
      })
      .catch(() => {
        /* keep the placeholder */
      });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      {/* golden halo behind the media */}
      <div className="absolute -inset-6 bg-accent/10 blur-3xl rounded-full" />

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="relative grid grid-cols-5 gap-3 items-stretch"
      >
        {/* LEFT — portrait video, the star of the block */}
        <div className="col-span-3 relative rounded-2xl overflow-hidden shadow-2xl border border-white/[0.06] aspect-[9/16]">
          {hasVideo ? (
            <video
              ref={videoRef}
              src="/hero.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <VideoPlaceholder />
          )}

          {/* sweeping light reflection */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            initial={{ x: "-120%" }}
            animate={{ x: "120%" }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut",
            }}
            style={{
              background:
                "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.16) 50%, transparent 60%)",
            }}
          />
        </div>

        {/* RIGHT — two photos stacked */}
        <div className="col-span-2 grid grid-rows-2 gap-3">
          <PhotoTile
            src="/cadre-hero.jpg"
            alt="Cadre souvenir TrophyFrames — modèle Duo"
            delay={0}
          />
          <PhotoTile
            src="/produit-1.jpg"
            alt="Cadre souvenir TrophyFrames personnalisé"
            delay={1.5}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

function PhotoTile({
  src,
  alt,
  delay,
}: {
  src: string;
  alt: string;
  delay: number;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
      className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/[0.06] h-full"
    >
      <Image
        src={src}
        alt={alt}
        width={600}
        height={800}
        className="w-full h-full object-cover"
      />
      {/* subtle sweeping glare, offset from the video's */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        initial={{ x: "-130%" }}
        animate={{ x: "130%" }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          repeatDelay: 4,
          delay,
          ease: "easeInOut",
        }}
        style={{
          background:
            "linear-gradient(105deg, transparent 42%, rgba(255,255,255,0.14) 50%, transparent 58%)",
        }}
      />
    </motion.div>
  );
}

/** Styled stand-in shown until /hero.mp4 is added to the public folder. */
function VideoPlaceholder() {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-3"
      style={{
        background:
          "radial-gradient(120% 100% at 50% 25%, #1b1a17 0%, #0d0d0e 70%)",
      }}
    >
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="w-14 h-14 rounded-full border border-accent/50 flex items-center justify-center"
        style={{ boxShadow: "0 0 30px rgba(201,162,75,0.25)" }}
      >
        <span className="ml-1 text-accent text-xl">▶</span>
      </motion.div>
      <div className="text-sm text-pearl font-medium">Vidéo à venir</div>
      <div className="text-[11px] text-mist px-6 text-center leading-relaxed">
        Déposez votre fichier <span className="text-mist/90">hero.mp4</span>
        <br />
        dans le dossier public
      </div>
    </div>
  );
}
