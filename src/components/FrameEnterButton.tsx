"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

/**
 * A button that, when clicked, plays a short "entering the frame" animation
 * (a golden frame zooms toward the viewer) and then navigates to `href`.
 * Used for all "Créer/Commander mon cadre" calls to action.
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
  const [animating, setAnimating] = useState(false);

  function go() {
    if (animating) return;
    setAnimating(true);
    // navigate a touch before the animation fully ends for a seamless feel
    setTimeout(() => router.push(href), 850);
  }

  return (
    <>
      <button onClick={go} className={className}>
        {children}
      </button>

      <AnimatePresence>
        {animating && (
          <motion.div
            className="fixed inset-0 z-[999] flex items-center justify-center bg-ink"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* the frame that we "enter" */}
            <motion.div
              initial={{ scale: 0.35, opacity: 0, rotateX: 12 }}
              animate={{ scale: [0.35, 1, 8], opacity: [0, 1, 0] }}
              transition={{
                duration: 1.1,
                times: [0, 0.45, 1],
                ease: [0.6, 0, 0.4, 1],
              }}
              style={{ transformStyle: "preserve-3d", perspective: 1000 }}
              className="relative"
            >
              <div
                className="rounded-[10px]"
                style={{
                  width: "min(70vw, 300px)",
                  aspectRatio: "1.28/1",
                  padding: "18px",
                  background:
                    "repeating-linear-gradient(90deg,#0a0a0a 0px,#161616 1px,#0c0c0c 2px,#101010 3px,#080808 4px)",
                  boxShadow:
                    "0 40px 80px -20px rgba(0,0,0,0.9), 0 0 60px rgba(201,162,75,0.25), inset 0 2px 3px rgba(255,255,255,0.1)",
                }}
              >
                <div
                  className="w-full h-full rounded-[4px] flex items-center justify-center"
                  style={{
                    background:
                      "radial-gradient(130% 130% at 50% 40%,#1c1c1e 0%,#0b0b0c 78%)",
                  }}
                >
                  <span className="gold3d font-extrabold tracking-[0.2em] text-[clamp(12px,3vw,18px)]">
                    TROPHYFRAMES
                  </span>
                </div>
              </div>
            </motion.div>

            {/* golden flash as we pass "through" the glass */}
            <motion.div
              className="pointer-events-none absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 0.5, 0] }}
              transition={{ duration: 1.1, times: [0, 0.55, 0.8, 1] }}
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(226,201,135,0.6), transparent 60%)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
