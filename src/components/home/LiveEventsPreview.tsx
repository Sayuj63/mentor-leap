"use client";

import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Calendar, Clock, Users } from "lucide-react";

// ─────────────────────────────────────────────────────────────
// Event data
// ─────────────────────────────────────────────────────────────
const events = [
  {
    title: "Speak With Impact Bootcamp",
    type: "Bootcamp",
    date: "March 15–16, 2026",
    duration: "2 Days",
    seats: "Limited — 30 Seats",
    description:
      "Master the art of confident public speaking in high-stakes environments.",
    accentColor: "var(--color-navy)",
    tagColor: "rgba(13,27,62,0.12)",
    tagText: "var(--color-navy)",
  },
  {
    title: "Leadership Presence Masterclass",
    type: "Masterclass",
    date: "March 22, 2026",
    duration: "4 Hours",
    seats: "50 Seats",
    description:
      "Command any room. Build the executive presence that drives respect and influence.",
    accentColor: "var(--color-blue)",
    tagColor: "rgba(27,79,216,0.1)",
    tagText: "var(--color-blue)",
  },
  {
    title: "Strategic Storytelling Workshop",
    type: "Workshop",
    date: "April 5, 2026",
    duration: "3 Hours",
    seats: "40 Seats",
    description:
      "Craft narratives that persuade, inspire, and move people to action.",
    accentColor: "var(--color-navy-light)",
    tagColor: "rgba(27,47,94,0.1)",
    tagText: "var(--color-navy-light)",
  },
  {
    title: "Media Confidence Lab",
    type: "Lab",
    date: "April 12, 2026",
    duration: "Full Day",
    seats: "20 Seats",
    description:
      "Camera-ready. Media-ready. Presentation-ready. An intensive immersion.",
    accentColor: "var(--color-gold)",
    tagColor: "rgba(201,168,76,0.12)",
    tagText: "var(--color-gold)",
  },
];

// ─────────────────────────────────────────────────────────────
// Stack Carousel (adapted from CircularTestimonials)
// Shows 3 cards: left (behind), center (active), right (behind)
// ─────────────────────────────────────────────────────────────

function calculateGap(width: number) {
  const minWidth = 400;
  const maxWidth = 900;
  const minGap = 48;
  const maxGap = 80;
  if (width <= minWidth) return minGap;
  if (width >= maxWidth) return maxGap;
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

function EventStackCarousel() {
  const [active, setActive] = useState(0);
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const [containerWidth, setContainerWidth] = useState(600);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = events.length;

  useEffect(() => {
    const ro = new ResizeObserver((entries) => {
      setContainerWidth(entries[0].contentRect.width);
    });
    if (containerRef.current) {
      ro.observe(containerRef.current);
      setContainerWidth(containerRef.current.offsetWidth);
    }
    return () => ro.disconnect();
  }, []);

  // Autoplay
  useEffect(() => {
    autoRef.current = setInterval(() => setActive((p) => (p + 1) % total), 4000);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [total]);

  const go = useCallback((dir: 1 | -1) => {
    if (autoRef.current) clearInterval(autoRef.current);
    setActive((p) => (p + dir + total) % total);
  }, [total]);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  function getCardStyle(i: number): React.CSSProperties {
    const gap = calculateGap(containerWidth);
    const stickUp = gap * 0.7;
    const isActive = i === active;
    const isLeft  = (active - 1 + total) % total === i;
    const isRight = (active + 1) % total === i;

    if (isActive) return {
      zIndex: 3, opacity: 1, pointerEvents: "auto",
      transform: "translateX(0) translateY(0) scale(1) rotateY(0deg)",
      transition: "all 0.75s cubic-bezier(.4,2,.3,1)",
    };
    if (isLeft) return {
      zIndex: 2, opacity: 0.7, pointerEvents: "auto",
      transform: `translateX(-${gap}px) translateY(-${stickUp}px) scale(0.88) rotateY(14deg)`,
      transition: "all 0.75s cubic-bezier(.4,2,.3,1)",
    };
    if (isRight) return {
      zIndex: 2, opacity: 0.7, pointerEvents: "auto",
      transform: `translateX(${gap}px) translateY(-${stickUp}px) scale(0.88) rotateY(-14deg)`,
      transition: "all 0.75s cubic-bezier(.4,2,.3,1)",
    };
    return { zIndex: 1, opacity: 0, pointerEvents: "none", transition: "all 0.75s cubic-bezier(.4,2,.3,1)" };
  }

  const ev = events[active];

  return (
    <div style={{ width: "100%" }}>
      {/* Card stack */}
      <div
        ref={containerRef}
        style={{
          position: "relative",
          width: "100%",
          height: 300,
          perspective: "1200px",
          marginBottom: 48,
        }}
      >
        {events.map((event, i) => (
          <div
            key={event.title}
            style={{
              position: "absolute",
              inset: 0,
              ...getCardStyle(i),
            }}
            onClick={() => i !== active && setActive(i)}
          >
            <div style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#fff",
              borderRadius: 20,
              border: "1px solid var(--color-cream-border)",
              overflow: "hidden",
              boxShadow: i === active
                ? "0 20px 60px rgba(13,27,62,0.12)"
                : "0 8px 24px rgba(13,27,62,0.06)",
              padding: "32px 36px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              position: "relative",
            }}>
              {/* Top accent bar */}
              <div style={{
                position: "absolute",
                top: 0, left: 0, right: 0,
                height: 3,
                backgroundColor: event.accentColor,
                borderRadius: "20px 20px 0 0",
              }} />

              <div>
                {/* Tag + arrow */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <span style={{
                    fontFamily: "var(--font-dm)",
                    fontSize: "0.58rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: event.tagText,
                    backgroundColor: event.tagColor,
                    padding: "4px 12px",
                    borderRadius: 999,
                  }}>
                    {event.type}
                  </span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(107,107,107,0.35)" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>

                {/* Title + description */}
                <h3 style={{
                  fontFamily: "var(--font-cormorant)",
                  fontWeight: 500,
                  fontSize: "1.5rem",
                  lineHeight: 1.15,
                  color: "var(--color-navy)",
                  marginBottom: 10,
                }}>
                  {event.title}
                </h3>
                <p style={{
                  fontFamily: "var(--font-dm)",
                  fontWeight: 300,
                  fontSize: "0.82rem",
                  lineHeight: 1.65,
                  color: "var(--color-text-muted)",
                }}>
                  {event.description}
                </p>
              </div>

              {/* Meta row */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 20px", marginTop: 20 }}>
                {[
                  { Icon: Calendar, label: event.date },
                  { Icon: Clock, label: event.duration },
                  { Icon: Users, label: event.seats },
                ].map(({ Icon, label }) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Icon size={12} style={{ color: "var(--color-text-muted)", opacity: 0.55 }} />
                    <span style={{ fontFamily: "var(--font-dm)", fontSize: "0.72rem", color: "var(--color-text-muted)" }}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls: dots + arrows */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Dot indicators */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {events.map((_, i) => (
            <button
              key={i}
              onClick={() => { if (autoRef.current) clearInterval(autoRef.current); setActive(i); }}
              style={{
                width: i === active ? 24 : 6,
                height: 6,
                borderRadius: 3,
                backgroundColor: i === active ? "var(--color-navy)" : "rgba(13,27,62,0.15)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>

        {/* Arrow buttons */}
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={() => go(-1)}
            onMouseEnter={() => setHoverPrev(true)}
            onMouseLeave={() => setHoverPrev(false)}
            style={{
              width: 40, height: 40,
              borderRadius: "50%",
              border: "none",
              cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              backgroundColor: hoverPrev ? "var(--color-gold)" : "var(--color-navy)",
              transition: "background-color 0.25s ease",
            }}
          >
            <ArrowLeft size={16} style={{ color: "var(--color-cream)" }} />
          </button>
          <button
            onClick={() => go(1)}
            onMouseEnter={() => setHoverNext(true)}
            onMouseLeave={() => setHoverNext(false)}
            style={{
              width: 40, height: 40,
              borderRadius: "50%",
              border: "none",
              cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              backgroundColor: hoverNext ? "var(--color-gold)" : "var(--color-navy)",
              transition: "background-color 0.25s ease",
            }}
          >
            <ArrowRight size={16} style={{ color: "var(--color-cream)" }} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Main section
// ─────────────────────────────────────────────────────────────
const ease = [0.16, 1, 0.3, 1] as const;

export default function LiveEventsPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      style={{ backgroundColor: "var(--color-cream)", padding: "96px 0 112px" }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 80px" }} className="events-wrap">
        {/* ── Header ── */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: 64,
          gap: 32,
          flexWrap: "wrap",
        }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease }}
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
              Live Events
            </span>
            <h2 style={{
              fontFamily: "var(--font-cormorant)",
              fontWeight: 300,
              fontSize: "clamp(2.4rem, 3.8vw, 4rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "var(--color-navy)",
              margin: 0,
            }}>
              Immersive learning.
              <br />
              <em style={{ fontStyle: "italic", fontWeight: 500, color: "var(--color-gold)" }}>
                Real results.
              </em>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease }}
          >
            <Link
              href="/live-events"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontFamily: "var(--font-dm)",
                fontSize: "0.82rem",
                color: "var(--color-navy)",
                textDecoration: "none",
                borderBottom: "1px solid rgba(13,27,62,0.25)",
                paddingBottom: 2,
                transition: "color 0.2s, border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = "var(--color-gold)";
                el.style.borderColor = "var(--color-gold)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = "var(--color-navy)";
                el.style.borderColor = "rgba(13,27,62,0.25)";
              }}
            >
              View All Events
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>

        {/* ── Two-column: stack carousel left, event detail right ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease }}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "center",
          }}
          className="events-grid"
        >
          {/* LEFT: Stack Carousel */}
          <EventStackCarousel />

          {/* RIGHT: Active event full detail */}
          <ActiveEventDetail inView={inView} />
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .events-wrap { padding: 0 48px !important; }
          .events-grid { grid-template-columns: 1fr !important; gap: 56px !important; }
        }
        @media (max-width: 640px) {
          .events-wrap { padding: 0 24px !important; }
        }
      `}</style>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Right panel — all 4 events listed vertically
// ─────────────────────────────────────────────────────────────
function ActiveEventDetail({ inView }: { inView: boolean }) {
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {events.map((ev, i) => (
        <motion.div
          key={ev.title}
          initial={{ opacity: 0, x: 24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 + i * 0.08, ease }}
        >
          <Link
            href="/live-events"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "20px 24px",
              borderRadius: 12,
              backgroundColor: "transparent",
              textDecoration: "none",
              transition: "background-color 0.25s ease",
              gap: 16,
              borderLeft: `2px solid transparent`,
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.backgroundColor = "rgba(13,27,62,0.04)";
              el.style.borderLeftColor = ev.accentColor;
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.backgroundColor = "transparent";
              el.style.borderLeftColor = "transparent";
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                <span style={{
                  fontFamily: "var(--font-dm)",
                  fontSize: "0.55rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: ev.tagText,
                  backgroundColor: ev.tagColor,
                  padding: "3px 10px",
                  borderRadius: 999,
                  flexShrink: 0,
                }}>
                  {ev.type}
                </span>
                <span style={{ fontFamily: "var(--font-dm)", fontSize: "0.7rem", color: "var(--color-text-muted)" }}>
                  {ev.date}
                </span>
              </div>
              <h3 style={{
                fontFamily: "var(--font-cormorant)",
                fontWeight: 500,
                fontSize: "1.15rem",
                color: "var(--color-navy)",
                margin: 0,
              }}>
                {ev.title}
              </h3>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
              <span style={{ fontFamily: "var(--font-dm)", fontSize: "0.68rem", color: "var(--color-text-muted)" }}>
                {ev.seats}
              </span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(107,107,107,0.4)" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7v10"/>
              </svg>
            </div>
          </Link>
          {/* Hairline divider */}
          {i < events.length - 1 && (
            <div style={{ height: 1, backgroundColor: "var(--color-cream-border)", margin: "0 24px" }} />
          )}
        </motion.div>
      ))}

      {/* Register CTA */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.7, ease }}
        style={{ marginTop: 24 }}
      >
        <Link
          href="/live-events"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "13px 28px",
            borderRadius: 999,
            backgroundColor: "var(--color-navy)",
            color: "var(--color-cream)",
            fontFamily: "var(--font-dm)",
            fontSize: "0.82rem",
            textDecoration: "none",
            transition: "background-color 0.3s",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-navy-light)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-navy)"; }}
        >
          Register for an Event
          <ArrowRight size={14} />
        </Link>
      </motion.div>
    </div>
  );
}
