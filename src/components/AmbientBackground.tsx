"use client";

import { motion } from "framer-motion";

/**
 * Ambient animated backdrop for the homepage.
 * Uses generic athletic/competition motifs (weights, sled, rowing, timer,
 * track lines) — deliberately no third-party branding or logos.
 */
export default function AmbientBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
      {/* slow drifting golden orbs */}
      <Orb className="w-[520px] h-[520px] -top-40 -left-32" delay={0} />
      <Orb className="w-[420px] h-[420px] top-[40%] -right-24" delay={3} />
      <Orb className="w-[360px] h-[360px] bottom-[5%] left-[10%]" delay={6} />

      {/* faint track lines sweeping across */}
      <TrackLines />

      {/* floating sport icons, very subtle */}
      <FloatIcon className="top-[12%] left-[6%]" delay={0} size={54}>
        <Dumbbell />
      </FloatIcon>
      <FloatIcon className="top-[30%] right-[8%]" delay={1.6} size={60}>
        <Sled />
      </FloatIcon>
      <FloatIcon className="top-[58%] left-[12%]" delay={0.8} size={50}>
        <Stopwatch />
      </FloatIcon>
      <FloatIcon className="top-[72%] right-[14%]" delay={2.4} size={56}>
        <Kettlebell />
      </FloatIcon>
      <FloatIcon className="top-[86%] left-[45%]" delay={3.2} size={48}>
        <Rower />
      </FloatIcon>

      {/* rising gold particles */}
      {PARTICLES.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            left: p.left,
            bottom: -10,
            width: p.size,
            height: p.size,
            background: "rgba(201,162,75,0.5)",
            filter: "blur(0.5px)",
          }}
          animate={{ y: [0, -900], opacity: [0, 0.7, 0] }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

const PARTICLES = [
  { left: "8%", size: 3, dur: 18, delay: 0 },
  { left: "22%", size: 2, dur: 22, delay: 3 },
  { left: "37%", size: 4, dur: 16, delay: 6 },
  { left: "51%", size: 2, dur: 20, delay: 1.5 },
  { left: "66%", size: 3, dur: 24, delay: 8 },
  { left: "79%", size: 2, dur: 19, delay: 4.5 },
  { left: "91%", size: 3, dur: 21, delay: 10 },
];

function Orb({ className, delay }: { className: string; delay: number }) {
  return (
    <motion.div
      className={`absolute rounded-full ${className}`}
      style={{
        background:
          "radial-gradient(circle, rgba(201,162,75,0.10) 0%, rgba(201,162,75,0) 70%)",
        filter: "blur(30px)",
      }}
      animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0.85, 0.5] }}
      transition={{ duration: 14, repeat: Infinity, delay, ease: "easeInOut" }}
    />
  );
}

function TrackLines() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.06]"
      preserveAspectRatio="none"
    >
      {[18, 34, 50, 66, 82].map((y, i) => (
        <motion.line
          key={y}
          x1="-10%"
          x2="110%"
          y1={`${y}%`}
          y2={`${y - 4}%`}
          stroke="#c9a24b"
          strokeWidth="1"
          animate={{ opacity: [0.25, 0.7, 0.25] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: i * 1.1,
            ease: "easeInOut",
          }}
        />
      ))}
    </svg>
  );
}

function FloatIcon({
  className,
  delay,
  size,
  children,
}: {
  className: string;
  delay: number;
  size: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className={`absolute ${className}`}
      style={{ width: size, height: size, color: "#c9a24b", opacity: 0.09 }}
      animate={{ y: [0, -18, 0], rotate: [0, 4, 0] }}
      transition={{
        duration: 11,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

/* ---- generic athletic icons (no third-party branding) ---- */

function Dumbbell() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5">
      <rect x="6" y="24" width="8" height="16" rx="2" />
      <rect x="50" y="24" width="8" height="16" rx="2" />
      <rect x="14" y="28" width="6" height="8" rx="1.5" />
      <rect x="44" y="28" width="6" height="8" rx="1.5" />
      <line x1="20" y1="32" x2="44" y2="32" />
    </svg>
  );
}

function Kettlebell() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M24 22a8 8 0 0 1 16 0" />
      <path d="M22 22c-6 4-9 11-9 18a9 9 0 0 0 9 9h20a9 9 0 0 0 9-9c0-7-3-14-9-18z" />
    </svg>
  );
}

function Sled() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M10 44h44" />
      <path d="M16 44V26h12v18" />
      <path d="M28 30h20" />
      <path d="M48 26v18" />
      <circle cx="18" cy="49" r="3" />
      <circle cx="46" cy="49" r="3" />
    </svg>
  );
}

function Stopwatch() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5">
      <circle cx="32" cy="36" r="18" />
      <path d="M32 26v10l7 5" />
      <path d="M26 12h12" />
      <path d="M32 12v6" />
    </svg>
  );
}

function Rower() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M8 46h48" />
      <path d="M14 46l10-14 12 6 14-16" />
      <circle cx="24" cy="32" r="3" />
      <circle cx="50" cy="22" r="4" />
    </svg>
  );
}
