"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FramePreview from "@/components/FramePreview";
import {
  FrameConfig,
  FrameType,
  defaultConfig,
  COUNTRY_LABEL,
  flagEmoji,
  priceFor,
  totalFor,
  shippingCost,
  shippingLabel,
  SHIPPING_HOME_SURCHARGE,
  labelFor,
  isDuoType,
  FRAME_DIMENSIONS,
} from "@/data/product";

export default function Configurator({
  initialType = "solo",
}: {
  initialType?: FrameType;
}) {
  const [config, setConfig] = useState<FrameConfig>({
    ...defaultConfig,
    type: initialType,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof FrameConfig>(key: K, value: FrameConfig[K]) {
    setConfig((c) => ({ ...c, [key]: value }));
  }

  // Auto-format time as HH:MM:SS while typing — user types digits, colons appear.
  function onTimeChange(raw: string) {
    const digits = raw.replace(/\D/g, "").slice(0, 6);
    const parts = [];
    for (let i = 0; i < digits.length; i += 2) parts.push(digits.slice(i, i + 2));
    update("time", parts.join(":"));
  }

  function setType(type: FrameType) {
    setConfig((c) => ({ ...c, type }));
  }

  async function checkout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ config }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "Une erreur est survenue.");
        setLoading(false);
      }
    } catch {
      setError("Impossible de contacter le serveur de paiement.");
      setLoading(false);
    }
  }

  const isDuo = isDuoType(config.type);

  return (
    <div className="pt-24 pb-20 px-5">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
            Configurateur
          </h1>
          <p className="text-mist mt-3">
            Personnalisez votre cadre. La prévisualisation se met à jour en
            direct.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.05fr] gap-10">
          {/* LEFT — fields */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="order-2 lg:order-1"
          >
            {/* type switch */}
            <div className="glass rounded-2xl p-1.5 flex mb-6">
              {(["solo", "duo", "duo-solo"] as FrameType[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className="relative flex-1 py-2.5 rounded-xl text-[13px] font-medium transition-colors"
                >
                  {config.type === t && (
                    <motion.div
                      layoutId="typePill"
                      className="absolute inset-0 bg-pearl rounded-xl"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span
                    className={`relative z-10 ${
                      config.type === t ? "text-ink" : "text-mist"
                    }`}
                  >
                    {labelFor(t)}
                  </span>
                </button>
              ))}
            </div>

            <div className="glass rounded-2xl p-6 space-y-5">
              {/* time */}
              <Field label={isDuo ? "Temps de l'équipe" : "Temps"}>
                <input
                  className="field-input"
                  value={config.time}
                  onChange={(e) => onTimeChange(e.target.value)}
                  inputMode="numeric"
                  placeholder="00:00:00"
                />
              </Field>

              {/* names */}
              <AnimatePresence mode="wait">
                {isDuo ? (
                  <motion.div
                    key="duo"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="grid grid-cols-1 gap-5 overflow-hidden"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Prénom participant 1">
                        <input
                          className="field-input"
                          value={config.p1FirstName}
                          onChange={(e) => update("p1FirstName", e.target.value)}
                          placeholder="Pierre"
                        />
                      </Field>
                      <Field label="Nom participant 1">
                        <input
                          className="field-input"
                          value={config.p1LastName}
                          onChange={(e) => update("p1LastName", e.target.value)}
                          placeholder="Anthony"
                        />
                      </Field>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Prénom participant 2">
                        <input
                          className="field-input"
                          value={config.p2FirstName}
                          onChange={(e) => update("p2FirstName", e.target.value)}
                          placeholder="David"
                        />
                      </Field>
                      <Field label="Nom participant 2">
                        <input
                          className="field-input"
                          value={config.p2LastName}
                          onChange={(e) => update("p2LastName", e.target.value)}
                          placeholder="Tom"
                        />
                      </Field>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="solo"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="grid grid-cols-2 gap-4 overflow-hidden"
                  >
                    <Field label="Prénom">
                      <input
                        className="field-input"
                        value={config.firstName}
                        onChange={(e) => update("firstName", e.target.value)}
                        placeholder="Pierre"
                      />
                    </Field>
                    <Field label="Nom">
                      <input
                        className="field-input"
                        value={config.lastName}
                        onChange={(e) => update("lastName", e.target.value)}
                        placeholder="Anthony"
                      />
                    </Field>
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <label className="flex items-center gap-2.5 cursor-pointer select-none mb-3">
                  <input
                    type="checkbox"
                    checked={!config.showRanking}
                    onChange={(e) => update("showRanking", !e.target.checked)}
                    className="w-4 h-4 rounded accent-accent cursor-pointer"
                  />
                  <span className="text-sm text-mist">
                    Je ne souhaite pas afficher mon classement
                  </span>
                </label>

                {config.showRanking && (
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Classement général (#OV)">
                      <input
                        className="field-input"
                        value={config.rankingOverall}
                        onChange={(e) =>
                          update(
                            "rankingOverall",
                            e.target.value.replace(/\D/g, "").slice(0, 6)
                          )
                        }
                        inputMode="numeric"
                        placeholder="57"
                      />
                    </Field>
                    <Field label="Classement catégorie (#AG)">
                      <input
                        className="field-input"
                        value={config.rankingAge}
                        onChange={(e) =>
                          update(
                            "rankingAge",
                            e.target.value.replace(/\D/g, "").slice(0, 6)
                          )
                        }
                        inputMode="numeric"
                        placeholder="128"
                      />
                    </Field>
                  </div>
                )}
              </div>

              {/* fixed country */}
              <Field label="Pays">
                <div className="field-input flex items-center gap-2 opacity-80 cursor-not-allowed">
                  <span className="text-lg">{flagEmoji("FR")}</span>
                  <span>{COUNTRY_LABEL} — France</span>
                </div>
                <p className="text-[11px] text-mist mt-1.5">
                  Disponible en France uniquement pour le moment.
                </p>
              </Field>

              {/* fixed dimensions */}
              <Field label="Dimensions du cadre">
                <div className="field-input flex items-center gap-2 opacity-80 cursor-not-allowed">
                  <span className="text-lg">📐</span>
                  <span>{FRAME_DIMENSIONS}</span>
                </div>
              </Field>

              {/* patch note (no upload) */}
              <div className="rounded-xl border border-white/[0.08] bg-smoke/40 px-4 py-3 flex gap-3">
                <span className="text-lg">🩹</span>
                <p className="text-xs text-mist leading-relaxed">
                  Le cadre comporte{" "}
                  {config.type === "duo"
                    ? "deux bandes velcro"
                    : "une bande velcro"}{" "}
                  <span className="text-pearl">au centre</span>. Vous y collez
                  vous-même le patch reçu lors de votre compétition, à réception
                  du cadre.
                </p>
              </div>

              {/* delivery choice */}
              <div>
                <div className="text-[11px] tracking-wider text-mist uppercase mb-2">
                  Livraison
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => update("shipping", "relay")}
                    className={`rounded-xl border px-4 py-3 text-left transition-all ${
                      config.shipping === "relay"
                        ? "border-accent/60 bg-accent/10"
                        : "border-white/[0.08] bg-smoke/40 hover:border-white/20"
                    }`}
                  >
                    <div className="text-sm font-medium">Point relais</div>
                    <div className="text-xs text-accent mt-0.5">Offerte</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => update("shipping", "home")}
                    className={`rounded-xl border px-4 py-3 text-left transition-all ${
                      config.shipping === "home"
                        ? "border-accent/60 bg-accent/10"
                        : "border-white/[0.08] bg-smoke/40 hover:border-white/20"
                    }`}
                  >
                    <div className="text-sm font-medium">À domicile</div>
                    <div className="text-xs text-mist mt-0.5">
                      +{SHIPPING_HOME_SURCHARGE.toFixed(2).replace(".", ",")} €
                    </div>
                  </button>
                </div>

                {config.shipping === "relay" && (
                  <p className="text-[11px] text-mist leading-relaxed mt-2">
                    Vous recevrez un email après votre commande pour choisir
                    votre point relais.
                  </p>
                )}

                <p className="text-[11px] text-mist/70 leading-relaxed mt-2">
                  Nous livrons uniquement en France pour le moment.
                </p>
              </div>
            </div>

            {/* order box */}
            <div className="glass rounded-2xl p-6 mt-6">
              <div className="flex items-baseline justify-between text-sm text-mist">
                <span>Cadre {labelFor(config.type)}</span>
                <span>
                  {priceFor(config.type).toLocaleString("fr-FR", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </span>
              </div>
              <div className="flex items-baseline justify-between text-sm text-mist mt-1">
                <span>{shippingLabel(config.shipping)}</span>
                <span>
                  {config.shipping === "home"
                    ? shippingCost(config.shipping).toLocaleString("fr-FR", {
                        style: "currency",
                        currency: "EUR",
                      })
                    : "Offerte"}
                </span>
              </div>
              <div className="flex items-baseline justify-between mt-3 pt-3 border-t border-white/[0.08]">
                <span className="text-sm text-pearl">Total</span>
                <span className="text-2xl font-semibold">
                  {totalFor(config.type, config.shipping).toLocaleString(
                    "fr-FR",
                    { style: "currency", currency: "EUR" }
                  )}
                </span>
              </div>
              <div className="text-xs text-mist mb-5 mt-1">
                Fabriqué à la demande
              </div>

              {error && (
                <div className="text-xs text-red-400 mb-3 bg-red-400/10 rounded-lg px-3 py-2">
                  {error}
                </div>
              )}

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={checkout}
                disabled={loading}
                className="w-full py-4 rounded-full bg-pearl text-ink font-medium hover:bg-white transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-ink/30 border-t-ink rounded-full animate-spin" />
                    Redirection…
                  </>
                ) : (
                  "Commander mon cadre"
                )}
              </motion.button>
              <p className="text-center text-[11px] text-mist mt-3">
                Paiement sécurisé via Stripe
              </p>
            </div>
          </motion.div>

          {/* RIGHT — sticky preview */}
          <div className="order-1 lg:order-2">
            <div className="lg:sticky lg:top-24">
              <FramePreview config={config} />
              <p className="text-center text-xs text-mist mt-2">
                Déplacez la souris sur le cadre · survolez pour zoomer
              </p>
              <p className="text-center text-[11px] text-mist/70 mt-2 leading-relaxed max-w-sm mx-auto">
                Aperçu indicatif destiné à visualiser votre personnalisation. Le
                rendu final du cadre peut différer légèrement de cette
                simulation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="field-label">{label}</label>
      {children}
    </div>
  );
}
