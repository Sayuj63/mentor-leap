"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// ─────────────────────────────────────────────
// Scroll-Morph mini-panel (self-contained)
// Uses its own virtual scroll so it never
// hijacks the page scroll.
// ─────────────────────────────────────────────

type AnimationPhase = "scatter" | "line" | "circle" | "arc";

const IMG_W = 52;
const IMG_H = 72;
const TOTAL = 16;
const MAX_VSCROLL = 2400;

// Professional / people-focused Unsplash images for a coaching brand
const IMAGES = [
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=75",
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=75",
  "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=200&q=75",
  "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=200&q=75",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=75",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=75",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=75",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=75",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=75",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=75",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=75",
  "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&q=75",
  "https://images.unsplash.com/photo-1546961342-ea5f62d951f4?w=200&q=75",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=75",
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&q=75",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&q=75",
];

const lerp = (a: number, b: number, t: number) => a * (1 - t) + b * t;

function MorphPanel() {
  const panelRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<AnimationPhase>("scatter");
  const [size, setSize] = useState({ w: 0, h: 0 });

  // Virtual scroll — isolated to this panel
  const vScroll = useMotionValue(0);
  const scrollRef = useRef(0);

  // Subscribe to size
  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const r = entries[0].contentRect;
      setSize({ w: r.width, h: r.height });
    });
    ro.observe(el);
    setSize({ w: el.offsetWidth, h: el.offsetHeight });
    return () => ro.disconnect();
  }, []);

  // Wheel handler scoped to panel only
  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const next = Math.min(Math.max(scrollRef.current + e.deltaY, 0), MAX_VSCROLL);
      scrollRef.current = next;
      vScroll.set(next);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [vScroll]);

  // Morph: 0→1 over first 600 scroll units
  const morphProgress = useTransform(vScroll, [0, 600], [0, 1]);
  const smoothMorph = useSpring(morphProgress, { stiffness: 40, damping: 20 });

  // Rotation for arc shuffle
  const rotateProgress = useTransform(vScroll, [600, MAX_VSCROLL], [0, 360]);
  const smoothRotate = useSpring(rotateProgress, { stiffness: 40, damping: 20 });

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const norm = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseX.set(norm * 60);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [mouseX]);

  // Intro sequence
  useEffect(() => {
    const t1 = setTimeout(() => setPhase("line"), 600);
    const t2 = setTimeout(() => setPhase("circle"), 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Live values for render
  const [mv, setMv] = useState(0);
  const [rv, setRv] = useState(0);
  const [px, setPx] = useState(0);
  useEffect(() => {
    const u1 = smoothMorph.on("change", setMv);
    const u2 = smoothRotate.on("change", setRv);
    const u3 = smoothMouseX.on("change", setPx);
    return () => { u1(); u2(); u3(); };
  }, [smoothMorph, smoothRotate, smoothMouseX]);

  const scatterPos = useMemo(() =>
    IMAGES.slice(0, TOTAL).map(() => ({
      x: (Math.random() - 0.5) * 800,
      y: (Math.random() - 0.5) * 600,
      rotation: (Math.random() - 0.5) * 160,
      scale: 0.5,
      opacity: 0,
    })), []);

  // Content fade driven by morph
  const contentOpacity = useTransform(smoothMorph, [0.75, 1], [0, 1]);
  const [contentOp, setContentOp] = useState(0);
  useEffect(() => contentOpacity.on("change", setContentOp), [contentOpacity]);

  return (
    <div
      ref={panelRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor: "var(--color-cream)",
        overflow: "hidden",
        borderRadius: 20,
        border: "1px solid rgba(201,168,76,0.15)",
        cursor: "ns-resize",
      }}
    >
      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === "circle" && mv < 0.4 ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        style={{
          position: "absolute",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          pointerEvents: "none",
        }}
      >
        <span style={{
          fontFamily: "var(--font-dm)",
          fontSize: "0.55rem",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--color-text-muted)",
        }}>
          Scroll inside to explore
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.4, repeat: Infinity }}
          style={{ width: 1, height: 20, backgroundColor: "var(--color-gold)", opacity: 0.5 }}
        />
      </motion.div>

      {/* Post-morph label */}
      <motion.div
        style={{
          opacity: contentOp,
          position: "absolute",
          top: 24,
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        <p style={{
          fontFamily: "var(--font-dm)",
          fontSize: "0.6rem",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "var(--color-gold)",
        }}>
          500+ professionals transformed
        </p>
      </motion.div>

      {/* Cards */}
      <div style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        {IMAGES.slice(0, TOTAL).map((src, i) => {
          let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

          if (phase === "scatter") {
            target = scatterPos[i];
          } else if (phase === "line") {
            const spacing = 62;
            const totalW = TOTAL * spacing;
            target = { x: i * spacing - totalW / 2, y: 0, rotation: 0, scale: 0.85, opacity: 1 };
          } else {
            const { w, h } = size;
            const radius = Math.min(w, h) * 0.3;

            // Circle position
            const cAngle = (i / TOTAL) * 360;
            const cRad = (cAngle * Math.PI) / 180;
            const circlePos = {
              x: Math.cos(cRad) * radius,
              y: Math.sin(cRad) * radius,
              rotation: cAngle + 90,
            };

            // Arc position
            const arcR = Math.min(w, h * 1.4) * 1.0;
            const apexY = h * 0.22;
            const arcCY = apexY + arcR;
            const spread = 120;
            const startA = -90 - spread / 2;
            const step = spread / (TOTAL - 1);
            const scrollProg = Math.min(Math.max(rv / 360, 0), 1);
            const bounded = -scrollProg * spread * 0.75;
            const currentA = startA + i * step + bounded;
            const aRad = (currentA * Math.PI) / 180;
            const arcPos = {
              x: Math.cos(aRad) * arcR + px,
              y: Math.sin(aRad) * arcR + arcCY,
              rotation: currentA + 90,
              scale: 1.6,
            };

            target = {
              x: lerp(circlePos.x, arcPos.x, mv),
              y: lerp(circlePos.y, arcPos.y, mv),
              rotation: lerp(circlePos.rotation, arcPos.rotation, mv),
              scale: lerp(0.9, arcPos.scale, mv),
              opacity: 1,
            };
          }

          return (
            <motion.div
              key={i}
              animate={{
                x: target.x,
                y: target.y,
                rotate: target.rotation,
                scale: target.scale,
                opacity: target.opacity,
              }}
              transition={{ type: "spring", stiffness: 38, damping: 14 }}
              style={{
                position: "absolute",
                width: IMG_W,
                height: IMG_H,
                borderRadius: 10,
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(13,27,62,0.15)",
                border: "1px solid rgba(201,168,76,0.2)",
              }}
            >
              <img
                src={src}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to bottom, transparent 60%, rgba(13,27,62,0.3))",
              }} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Credentials list
// ─────────────────────────────────────────────
const credentials = [
  "Award-Winning Broadcast Journalist",
  "Executive Communication Coach",
  "20+ Years Media & Leadership Experience",
  "Boardroom & Corporate Trainer",
  "Founder, MentorLeap",
];

// ─────────────────────────────────────────────
// Main AboutMridu section
// ─────────────────────────────────────────────
const ease = [0.16, 1, 0.3, 1] as const;

export default function AboutMridu() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      style={{ backgroundColor: "var(--color-cream)", padding: "96px 0 112px", overflow: "hidden" }}
    >
      <div
        style={{ maxWidth: 1280, margin: "0 auto", padding: "0 80px" }}
        className="about-container"
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 72,
            alignItems: "center",
          }}
          className="about-grid"
        >

          {/* ── LEFT: Morph panel ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease }}
            style={{ position: "relative" }}
          >
            {/* Gold accent corner */}
            <div style={{
              position: "absolute",
              top: -16,
              left: -16,
              width: 80,
              height: 80,
              border: "2px solid rgba(201,168,76,0.3)",
              borderRadius: 12,
              zIndex: 0,
              pointerEvents: "none",
            }} />

            {/* The morph panel — fixed height, isolated scroll */}
            <div style={{ position: "relative", zIndex: 1, height: 520 }}>
              <MorphPanel />
            </div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.6, ease }}
              style={{
                position: "absolute",
                bottom: -24,
                right: -24,
                backgroundColor: "#fff",
                padding: "18px 24px",
                borderRadius: 14,
                boxShadow: "0 8px 32px rgba(13,27,62,0.12)",
                border: "1px solid rgba(232,232,226,1)",
                zIndex: 2,
              }}
            >
              <div style={{
                fontFamily: "var(--font-cormorant)",
                fontWeight: 500,
                fontSize: "2rem",
                color: "var(--color-navy)",
                lineHeight: 1,
              }}>
                20+
              </div>
              <div style={{
                fontFamily: "var(--font-dm)",
                fontSize: "0.6rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--color-text-muted)",
                marginTop: 4,
              }}>
                Years of Excellence
              </div>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Content ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease }}
          >
            <span style={{
              fontFamily: "var(--font-dm)",
              fontSize: "0.65rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--color-gold)",
              display: "block",
              marginBottom: 20,
            }}>
              Meet the Founder
            </span>

            <h2 style={{
              fontFamily: "var(--font-cormorant)",
              fontWeight: 300,
              fontSize: "clamp(2.4rem, 3.8vw, 4rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "var(--color-navy)",
              margin: "0 0 24px",
            }}>
              Mridu{" "}
              <em style={{ fontWeight: 400, fontStyle: "italic", color: "var(--color-gold)" }}>
                Bhandari
              </em>
            </h2>

            <p style={{
              fontFamily: "var(--font-dm)",
              fontWeight: 300,
              fontSize: "1rem",
              lineHeight: 1.8,
              color: "var(--color-text-muted)",
              marginBottom: 16,
            }}>
              With over two decades of experience in broadcast journalism, anchoring,
              corporate communication, and leadership coaching, Mridu has mentored
              professionals across industries to become confident communicators and
              strategic leaders.
            </p>

            <p style={{
              fontFamily: "var(--font-dm)",
              fontWeight: 300,
              fontSize: "0.9rem",
              lineHeight: 1.8,
              color: "var(--color-text-muted)",
              marginBottom: 36,
            }}>
              MentorLeap is built on her years of research, practical frameworks, and
              real-world training. Mentor AI is trained on her methodologies — but
              mentorship remains human-led.
            </p>

            {/* Credentials */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 40 }}>
              {credentials.map((cred, i) => (
                <motion.div
                  key={cred}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.08, ease }}
                  style={{ display: "flex", alignItems: "center", gap: 12 }}
                >
                  <span style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    backgroundColor: "var(--color-gold)",
                    flexShrink: 0,
                  }} />
                  <span style={{
                    fontFamily: "var(--font-dm)",
                    fontSize: "0.875rem",
                    color: "var(--color-text-muted)",
                  }}>
                    {cred}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <Link
              href="/executive-coaching"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 32px",
                borderRadius: 999,
                backgroundColor: "var(--color-navy)",
                color: "var(--color-cream)",
                fontFamily: "var(--font-dm)",
                fontSize: "0.875rem",
                textDecoration: "none",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-navy-light)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-navy)";
              }}
            >
              Book Discovery Call
              <ArrowRight size={16} />
            </Link>
          </motion.div>

        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 1024px) {
          .about-container { padding: 0 48px !important; }
          .about-grid { grid-template-columns: 1fr !important; gap: 80px !important; }
        }
        @media (max-width: 640px) {
          .about-container { padding: 0 24px !important; }
        }
      `}</style>
    </section>
  );
}
