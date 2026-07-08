"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

/**
 * A button that plays a short "entering the frame" animation (a golden frame
 * zooms toward the viewer, filling the screen) and then navigates to `href`.
 * The overlay is rendered in a portal on document.body so it always covers the
 * full viewport, even when the button sits inside a transformed ancestor.
 */
export default function FrameEnterButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [animating, setAnimating] = useState(false);
  const [mounted, setMounted] = useState(false);
  const navigated = useRef(false);

  // Total animation duration (ms). Higher = slower.
  const DURATION = 1600;

  useEffect(() => setMounted(true), []);

  function go() {
    if (animating) return;
    setAnimating(true);
    navigated.current = false;
    window.setTimeout(() => {
      navigated.current = true;
      router.push(href);
    }, DURATION - 250);
  }

  // Clear the overlay once the route actually changes (never stays stuck).
  useEffect(() => {
    if (animating && navigated.current) {
      const t = window.setTimeout(() => setAnimating(false), 150);
      return () => window.clearTimeout(t);
    }
  }, [pathname, animating]);

  // Safety net: force-clear after the animation no matter what.
  useEffect(() => {
    if (!animating) return;
    const t = window.setTimeout(() => setAnimating(false), DURATION + 600);
    return () => window.clearTimeout(t);
  }, [animating]);

  const overlay = (
    <AnimatePresence>
      {animating && (
        <motion.div
          key="frame-enter-overlay"
          className="fixed inset-0 flex items-center justify-center overflow-hidden"
          style={{ zIndex: 9999, background: "#0a0a0b" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* the frame we "enter" — zooms from center to fill the screen */}
          <motion.div
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: [0.3, 0.85, 14], opacity: [0, 1, 0] }}
            transition={{
              duration: DURATION / 1000,
              times: [0, 0.4, 1],
              ease: [0.5, 0, 0.5, 1],
            }}
            className="relative"
            style={{ transformOrigin: "center center" }}
          >
            <div
              className="rounded-[12px]"
              style={{
                width: "min(60vw, 320px)",
                aspectRatio: "1.28/1",
                padding: "20px",
                background:
                  "repeating-linear-gradient(90deg,#0a0a0a 0px,#161616 1px,#0c0c0c 2px,#101010 3px,#080808 4px)",
                boxShadow:
                  "0 40px 80px -20px rgba(0,0,0,0.9), 0 0 70px rgba(201,162,75,0.3), inset 0 2px 3px rgba(255,255,255,0.1)",
              }}
            >
              <div
                className="w-full h-full rounded-[5px] flex items-center justify-center"
                style={{
                  background:
                    "radial-gradient(130% 130% at 50% 40%,#1c1c1e 0%,#0b0b0c 78%)",
                }}
              >
                <span className="gold3d font-extrabold tracking-[0.25em] text-[clamp(11px,2.6vw,17px)]">
                  TROPHYFRAMES
                </span>
              </div>
            </div>
          </motion.div>

          {/* golden flash as we pass "through" the glass */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 0.55, 0] }}
            transition={{
              duration: DURATION / 1000,
              times: [0, 0.55, 0.82, 1],
            }}
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(226,201,135,0.65), transparent 60%)",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <button type="button" onClick={go} className={className}>
        {children}
      </button>
      {mounted && createPortal(overlay, document.body)}
    </>
  );
}
