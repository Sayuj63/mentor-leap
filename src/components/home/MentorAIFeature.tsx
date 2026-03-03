"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Mic, Volume2, Loader2 } from "lucide-react";

// ─────────────────────────────────────────────────────────────
// Branded Voice Widget — navy bg, gold accents, cream waveform
// Self-contained, demo-loops automatically
// ─────────────────────────────────────────────────────────────

type VoiceState = "idle" | "listening" | "processing" | "speaking";

function MentorVoiceWidget() {
  const [state, setState] = useState<VoiceState>("idle");
  const [waveform, setWaveform] = useState<number[]>(Array(28).fill(0));
  const [duration, setDuration] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Waveform ticker
  useEffect(() => {
    if (state === "listening" || state === "speaking") {
      timerRef.current = setInterval(() => {
        setDuration((d) => d + 1);
        setWaveform(
          Array(28)
            .fill(0)
            .map(() =>
              state === "listening"
                ? 15 + Math.random() * 70
                : 8 + Math.random() * 45
            )
        );
      }, 90);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      if (state !== "processing") setWaveform(Array(28).fill(0));
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [state]);

  // Demo loop
  useEffect(() => {
    let cancelled = false;
    const loop = async () => {
      if (cancelled) return;
      setState("idle");
      setDuration(0);
      await delay(1200);
      if (cancelled) return;
      setState("listening");
      await delay(3200);
      if (cancelled) return;
      setState("processing");
      setWaveform(Array(28).fill(0));
      await delay(1800);
      if (cancelled) return;
      setState("speaking");
      await delay(3500);
      if (cancelled) return;
      loop();
    };
    loop();
    return () => { cancelled = true; };
  }, []);

  const stateColor: Record<VoiceState, string> = {
    idle:       "rgba(250,250,247,0.3)",
    listening:  "var(--color-gold)",
    processing: "#E0C068",
    speaking:   "rgba(201,168,76,0.8)",
  };

  const stateLabel: Record<VoiceState, string> = {
    idle:       "Tap to speak",
    listening:  "Listening...",
    processing: "Processing...",
    speaking:   "Responding...",
  };

  const ringActive = state === "listening" || state === "speaking";

  return (
    <div style={{
      backgroundColor: "var(--color-navy)",
      borderRadius: 24,
      border: "1px solid rgba(201,168,76,0.18)",
      padding: "48px 40px 40px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 32,
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Ambient glow */}
      <motion.div
        animate={{
          opacity: state === "listening" ? [0.15, 0.35, 0.15] : [0.06, 0.12, 0.06],
          scale:   state === "listening" ? [1, 1.15, 1]        : [1, 1.05, 1],
        }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 320, height: 320,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,168,76,0.4) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Floating particles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            width: 2, height: 2,
            borderRadius: "50%",
            backgroundColor: "var(--color-gold)",
            left: `${10 + i * 8}%`,
            top: `${20 + (i % 4) * 18}%`,
          }}
          animate={{ opacity: [0.1, 0.4, 0.1], y: [0, -8, 0] }}
          transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
        />
      ))}

      {/* Header label */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, position: "relative", zIndex: 1 }}>
        <div style={{
          width: 28, height: 28, borderRadius: "50%",
          background: "linear-gradient(135deg, var(--color-navy-light), rgba(201,168,76,0.3))",
          border: "1px solid rgba(201,168,76,0.4)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Sparkles size={12} style={{ color: "var(--color-gold)" }} />
        </div>
        <span style={{ fontFamily: "var(--font-dm)", fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(201,168,76,0.8)" }}>
          Mentor AI · Voice
        </span>
        <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#4ade80", marginLeft: 4 }} />
      </div>

      {/* Mic button */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Pulse rings */}
        <AnimatePresence>
          {ringActive && (
            <>
              {[0, 1].map((j) => (
                <motion.div
                  key={j}
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    border: `1px solid ${stateColor[state]}`,
                    pointerEvents: "none",
                  }}
                  initial={{ scale: 1, opacity: 0.6 }}
                  animate={{ scale: 1.8 + j * 0.5, opacity: 0 }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut", delay: j * 0.55 }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Main circle */}
        <motion.div
          animate={{
            boxShadow: ringActive
              ? [`0 0 0 0 ${stateColor[state]}40`, `0 0 32px 8px ${stateColor[state]}20`]
              : "0 0 0 0 transparent",
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            width: 100, height: 100,
            borderRadius: "50%",
            background: "linear-gradient(145deg, rgba(201,168,76,0.12) 0%, rgba(13,27,62,0.8) 100%)",
            border: `2px solid ${stateColor[state]}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "border-color 0.4s ease",
            cursor: "default",
          }}
        >
          <AnimatePresence mode="wait">
            {state === "processing" ? (
              <motion.div key="proc" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                <Loader2 size={36} style={{ color: "#E0C068", animation: "spin 1s linear infinite" }} />
              </motion.div>
            ) : state === "speaking" ? (
              <motion.div key="spk" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                <Volume2 size={36} style={{ color: "var(--color-gold)" }} />
              </motion.div>
            ) : (
              <motion.div key="mic" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                <Mic size={36} style={{ color: state === "listening" ? "var(--color-gold)" : "rgba(250,250,247,0.35)" }} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Waveform */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        gap: 3, height: 52, position: "relative", zIndex: 1,
      }}>
        {waveform.map((h, i) => (
          <motion.div
            key={i}
            animate={{ height: Math.max(3, h * 0.52) }}
            transition={{ duration: 0.09, ease: "easeOut" }}
            style={{
              width: 3,
              borderRadius: 2,
              backgroundColor: state === "listening"
                ? "var(--color-gold)"
                : state === "speaking"
                  ? "rgba(201,168,76,0.65)"
                  : "rgba(250,250,247,0.12)",
              transition: "background-color 0.3s ease",
            }}
          />
        ))}
      </div>

      {/* Status text + timer */}
      <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        <motion.p
          animate={{ opacity: ringActive ? [1, 0.6, 1] : 1 }}
          transition={{ duration: 1.8, repeat: ringActive ? Infinity : 0 }}
          style={{
            fontFamily: "var(--font-dm)",
            fontSize: "0.85rem",
            fontWeight: 400,
            color: stateColor[state],
            marginBottom: 6,
            letterSpacing: "0.04em",
          }}
        >
          {stateLabel[state]}
        </motion.p>
        <p style={{
          fontFamily: "var(--font-dm)",
          fontSize: "0.7rem",
          color: "rgba(250,250,247,0.25)",
          fontVariantNumeric: "tabular-nums",
          letterSpacing: "0.06em",
        }}>
          {String(Math.floor(duration / 10)).padStart(2, "0")}:{String(duration % 10)}0
        </p>
      </div>

      {/* Powered by label */}
      <motion.div
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ display: "flex", alignItems: "center", gap: 6, position: "relative", zIndex: 1 }}
      >
        <Sparkles size={11} style={{ color: "rgba(201,168,76,0.6)" }} />
        <span style={{ fontFamily: "var(--font-dm)", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(201,168,76,0.5)" }}>
          Trained on Mridu's frameworks
        </span>
      </motion.div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Features list
// ─────────────────────────────────────────────────────────────
const features = [
  "Practice communication scenarios",
  "Refine speeches & presentations",
  "Prepare for interviews",
  "Improve email tone & clarity",
  "Build structured responses",
  "Strengthen presentation clarity",
  "Get instant frameworks",
  "24×7 always available",
];

const ease = [0.16, 1, 0.3, 1] as const;

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

// ─────────────────────────────────────────────────────────────
// Main section
// ─────────────────────────────────────────────────────────────
export default function MentorAIFeature() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      style={{ backgroundColor: "var(--color-cream)", padding: "96px 0 112px", position: "relative", overflow: "hidden" }}
    >
      {/* Subtle background accents */}
      <div style={{
        position: "absolute", top: 0, right: 0, width: "55%", height: "100%",
        background: "linear-gradient(to left, rgba(27,79,216,0.03) 0%, transparent 100%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: 0, left: 0, width: 360, height: 360,
        borderRadius: "50%",
        background: "rgba(201,168,76,0.05)",
        filter: "blur(80px)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 80px" }} className="mentor-wrap">
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 80,
          alignItems: "center",
        }} className="mentor-grid">

          {/* ── LEFT: Content ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.05, ease }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "8px 16px", borderRadius: 999,
                border: "1px solid rgba(27,79,216,0.2)",
                backgroundColor: "rgba(27,79,216,0.05)",
                marginBottom: 28,
              }}
            >
              <Sparkles size={12} style={{ color: "var(--color-blue)" }} />
              <span style={{ fontFamily: "var(--font-dm)", fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-blue)" }}>
                Mentor AI
              </span>
            </motion.div>

            {/* Headline */}
            <h2
              style={{
                fontFamily: "var(--font-cormorant)", fontWeight: 300,
                fontSize: "clamp(2.4rem, 3.8vw, 4rem)",
                lineHeight: 1.05, letterSpacing: "-0.02em",
                color: "var(--color-navy)", margin: "0 0 24px",
              }}
            >
              Your 24×7
              <br />
              <em style={{ fontStyle: "italic", fontWeight: 500, color: "var(--color-gold)" }}>
                growth partner.
              </em>
            </h2>

            <p style={{ fontFamily: "var(--font-dm)", fontWeight: 300, fontSize: "1rem", lineHeight: 1.8, color: "var(--color-text-muted)", marginBottom: 20 }}>
              Mentor AI is not a generic chatbot. It is trained on Mridu Bhandari's
              coaching frameworks, years of communication research, and executive
              training methodologies.
            </p>

            {/* Pull quote */}
            <p style={{
              fontFamily: "var(--font-cormorant)", fontWeight: 400, fontStyle: "italic",
              fontSize: "1.15rem", lineHeight: 1.6, color: "var(--color-navy)",
              borderLeft: "2px solid var(--color-gold)",
              paddingLeft: 20, marginBottom: 36,
            }}>
              "Mentorship is human. Mentor AI is reinforcement."
            </p>

            {/* Features 2-col grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 16px", marginBottom: 40 }}>
              {features.map((feat, i) => (
                <motion.div
                  key={feat}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.055, ease }}
                  style={{ display: "flex", alignItems: "center", gap: 8 }}
                >
                  <span style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: "var(--color-blue)", flexShrink: 0 }} />
                  <span style={{ fontFamily: "var(--font-dm)", fontSize: "0.78rem", color: "var(--color-text-muted)" }}>
                    {feat}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <Link
              href="/mentor-ai"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "13px 28px", borderRadius: 999,
                border: "1px solid var(--color-navy)",
                color: "var(--color-navy)",
                fontFamily: "var(--font-dm)", fontSize: "0.85rem",
                textDecoration: "none", transition: "background-color 0.3s, color 0.3s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.backgroundColor = "var(--color-navy)";
                el.style.color = "var(--color-cream)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.backgroundColor = "transparent";
                el.style.color = "var(--color-navy)";
              }}
            >
              Try Mentor AI
              <ArrowRight size={15} />
            </Link>
          </motion.div>

          {/* ── RIGHT: Voice Widget ── */}
          <motion.div
            initial={{ opacity: 0, x: 36 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease }}
          >
            <MentorVoiceWidget />
          </motion.div>

        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 1024px) {
          .mentor-wrap  { padding: 0 48px !important; }
          .mentor-grid  { grid-template-columns: 1fr !important; gap: 56px !important; }
        }
        @media (max-width: 640px) {
          .mentor-wrap  { padding: 0 24px !important; }
        }
      `}</style>
    </section>
  );
}
