"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, MouseEvent } from "react";
import { FrameConfig, COUNTRY_LABEL } from "@/data/product";

export default function FramePreview({ config }: { config: FrameConfig }) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-9, 9]), {
    stiffness: 150,
    damping: 20,
  });
  const glareX = useTransform(mouseX, [-0.5, 0.5], ["25%", "75%"]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ["25%", "75%"]);

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function onLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  const isDuo = config.type === "duo";
  const isDuoSolo = config.type === "duo-solo";
  const twoNames = isDuo || isDuoSolo;
  const soloName = `${config.firstName || "Prénom"} ${config.lastName || "Nom"}`;
  const p1Name = `${config.p1FirstName || "Prénom 1"} ${config.p1LastName || "Nom 1"}`;
  const p2Name = `${config.p2FirstName || "Prénom 2"} ${config.p2LastName || "Nom 2"}`;

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="w-full flex items-center justify-center py-8"
      style={{ perspective: "1500px" }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.04 }}
        transition={{ scale: { type: "spring", stiffness: 200, damping: 25 } }}
        className="relative"
      >
        {/* ===== BLACK WOOD FRAME (deep rebate) ===== */}
        <div
          className="relative shadow-2xl"
          style={{
            width: "min(90vw, 500px)",
            aspectRatio: "1.28/1",
            borderRadius: "4px",
            padding: "30px",
            background:
              "repeating-linear-gradient(90deg,#0a0a0a 0px,#161616 1px,#0c0c0c 2px,#101010 3px,#080808 4px)",
            boxShadow:
              "0 50px 100px -30px rgba(0,0,0,0.9), inset 0 3px 4px rgba(255,255,255,0.10), inset 0 -4px 8px rgba(0,0,0,0.7)",
          }}
        >
          {/* wood outer sheen */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              borderRadius: "4px",
              background:
                "linear-gradient(120deg,rgba(255,255,255,0.08),transparent 22%,transparent 78%,rgba(255,255,255,0.04))",
            }}
          />

          {/* deep rebate shadow */}
          <div
            className="absolute"
            style={{
              inset: "18px",
              borderRadius: "3px",
              boxShadow:
                "0 6px 14px 2px rgba(0,0,0,0.85), inset 0 2px 6px rgba(0,0,0,0.9)",
              background: "#0b0b0c",
            }}
          />

          {/* ===== INNER BLACK BOARD ===== */}
          <div
            className="relative w-full h-full overflow-hidden"
            style={{
              borderRadius: "2px",
              background:
                "radial-gradient(135% 130% at 50% 42%,#1c1c1e 0%,#0b0b0c 78%)",
              boxShadow: "inset 0 0 45px rgba(0,0,0,0.9)",
            }}
          >
            {/* ===== CONTENT ===== */}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-[5%] pt-[9%] pb-[6%]">
              {/* TIME */}
              <div
                className="gold3d font-extrabold tracking-tight leading-none"
                style={{ fontSize: "clamp(28px,9vw,52px)" }}
              >
                {config.time || "--:--:--"}
              </div>

              {isDuo ? (
                <>
                  {/* two patches side by side */}
                  <div className="flex items-center justify-center gap-[5%] w-full mt-[4%]">
                    <VelcroPatch width="34%" />
                    <VelcroPatch width="34%" />
                  </div>
                  {/* single #OV / #AG centered below */}
                  {config.showRanking && (
                    <div className="flex items-center justify-center gap-[10%] mt-[3.5%]">
                      <RankBadge label="#OV" value={config.rankingOverall} />
                      <RankBadge label="#AG" value={config.rankingAge} />
                    </div>
                  )}
                </>
              ) : config.showRanking ? (
                /* MIDDLE ROW: #OV — patch — #AG (solo & duo-solo: 1 patch) */
                <div className="flex items-center justify-center gap-[3%] w-full mt-[4%]">
                  <div className="w-[18%] shrink-0 flex justify-center">
                    <RankBadge label="#OV" value={config.rankingOverall} />
                  </div>
                  <VelcroPatch width="42%" />
                  <div className="w-[18%] shrink-0 flex justify-center">
                    <RankBadge label="#AG" value={config.rankingAge} />
                  </div>
                </div>
              ) : (
                /* rankings hidden: patch centered alone */
                <div className="flex items-center justify-center w-full mt-[4%]">
                  <VelcroPatch width="42%" />
                </div>
              )}

              {/* NAME(S) + FRA flag */}
              {twoNames ? (
                <div className="mt-[5%] flex flex-col items-center gap-[2%]">
                  <NameLine name={p1Name} />
                  <NameLine name={p2Name} />
                </div>
              ) : (
                <>
                  <div
                    className="gold3d font-extrabold uppercase leading-tight text-center mt-[5%] px-2"
                    style={{ fontSize: "clamp(16px,5vw,30px)" }}
                  >
                    {soloName}
                  </div>
                  <div className="flex items-center justify-center gap-2 mt-[2%]">
                    <span className="gold3d font-bold text-[clamp(11px,3vw,17px)]">
                      {COUNTRY_LABEL}
                    </span>
                    <FrenchFlag />
                  </div>
                </>
              )}
            </div>

            {/* ===== GLASS: brillant + reflets ===== */}
            <motion.div
              className="pointer-events-none absolute inset-0 z-20"
              style={{
                background: useTransform(
                  [glareX, glareY],
                  ([x, y]) =>
                    `radial-gradient(480px circle at ${x} ${y}, rgba(255,255,255,0.24), transparent 40%)`
                ),
              }}
            />
            <div
              className="pointer-events-none absolute inset-0 z-20"
              style={{
                background:
                  "linear-gradient(118deg, rgba(255,255,255,0.16) 0%, transparent 20%, transparent 60%, rgba(255,255,255,0.09) 100%)",
              }}
            />
            <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
              <div
                className="absolute -inset-y-16 left-[-25%] w-1/5 rotate-[20deg] opacity-45"
                style={{
                  background:
                    "linear-gradient(90deg,transparent,rgba(255,255,255,0.32),transparent)",
                }}
              />
            </div>
          </div>
        </div>

        {/* floor shadow */}
        <div
          className="mx-auto mt-2 opacity-30 blur-md"
          style={{
            width: "min(80vw, 450px)",
            height: "36px",
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.75), transparent 70%)",
          }}
        />
      </motion.div>
    </div>
  );
}

function NameLine({ name }: { name: string }) {
  return (
    <div className="flex items-center justify-center gap-2 flex-wrap px-2">
      <span
        className="gold3d font-extrabold uppercase leading-tight text-center"
        style={{ fontSize: "clamp(14px,4.3vw,26px)" }}
      >
        {name}
      </span>
      <span className="gold3d font-bold text-[clamp(10px,2.8vw,16px)]">FRA</span>
      <FrenchFlag />
    </div>
  );
}

function RankBadge({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center leading-none">
      <div className="gold3d font-extrabold text-[clamp(12px,3.4vw,18px)]">
        {label}
      </div>
      <div className="gold3d font-extrabold text-[clamp(12px,3.4vw,18px)] mt-1">
        {value || "—"}
      </div>
    </div>
  );
}

/* French flag drawn in CSS */
function FrenchFlag() {
  return (
    <span
      className="inline-flex overflow-hidden rounded-[2px] border border-white/20 align-middle"
      style={{
        width: "clamp(18px,4.5vw,26px)",
        height: "clamp(12px,3vw,17px)",
        boxShadow: "0 1px 2px rgba(0,0,0,0.5)",
      }}
      aria-label="Drapeau français"
    >
      <span className="h-full" style={{ width: "33.33%", background: "#0055A4" }} />
      <span className="h-full" style={{ width: "33.33%", background: "#ffffff" }} />
      <span className="h-full" style={{ width: "33.33%", background: "#EF4135" }} />
    </span>
  );
}

/* Velcro/scratch zone where the athlete sticks their competition patch. */
function VelcroPatch({ width = "42%" }: { width?: string }) {
  return (
    <div
      className="relative rounded-[5px] flex items-center justify-center shrink-0"
      style={{
        width,
        aspectRatio: "1.5/1",
        background:
          "repeating-conic-gradient(from 0deg at 50% 50%,#2a2a2d 0deg 6deg,#232326 6deg 12deg)",
        boxShadow:
          "inset 0 0 10px rgba(0,0,0,0.75), 0 2px 6px rgba(0,0,0,0.5)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div
        className="absolute inset-0 rounded-[5px] opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.05) 0.5px, transparent 0.5px)",
          backgroundSize: "3px 3px",
        }}
      />
      <div className="relative text-center px-1">
        <div className="text-pearl/70 font-semibold tracking-[0.14em] text-[clamp(6px,1.5vw,9px)] leading-tight">
          VOTRE PATCH
        </div>
        <div className="text-mist/50 text-[clamp(5px,1.1vw,7px)] tracking-wider mt-0.5">
          zone velcro
        </div>
      </div>
    </div>
  );
}
