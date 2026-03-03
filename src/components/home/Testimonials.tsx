"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const testimonials = [
  { name: "Priya Sharma",  role: "Senior Manager, Deloitte",       quote: "Mridu's coaching completely transformed how I present myself in boardrooms. I got promoted within 3 months." },
  { name: "Rahul Kapoor",  role: "Founder, TechStart India",        quote: "Mentor AI helped me prep for investor pitches at 2am. I closed my Series A. This platform is extraordinary." },
  { name: "Aditi Verma",   role: "VP Marketing, HDFC Bank",         quote: "The Leadership Presence Masterclass was unlike anything I've experienced. Practical, powerful, and permanent." },
  { name: "Kiran Mehta",   role: "Executive Director, PwC",         quote: "Every communication challenge I've faced — MentorLeap has given me the framework to overcome it." },
  { name: "Sanya Gupta",   role: "Head of Strategy, Reliance",      quote: "I was skeptical about AI coaching. Mentor AI proved me completely wrong. It knows Mridu's frameworks cold." },
  { name: "Arjun Nair",    role: "Country Manager, Microsoft",      quote: "MentorLeap gave me the confidence to speak at global summits. My career trajectory has never been stronger." },
];

const row2 = testimonials.slice().reverse();
const ease = [0.16, 1, 0.3, 1] as const;

function Card({ t }: { t: typeof testimonials[0] }) {
  return (
    <div
      style={{
        flexShrink: 0,
        width: 320,
        margin: "0 10px",
        padding: "24px 28px",
        backgroundColor: "#fff",
        border: "1px solid var(--color-cream-border)",
        borderRadius: 20,
        transition: "border-color 0.3s",
        cursor: "default",
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.35)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--color-cream-border)"; }}
    >
      {/* Stars */}
      <div style={{ display: "flex", gap: 2, marginBottom: 14 }}>
        {[...Array(5)].map((_, i) => (
          <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="var(--color-gold)">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        ))}
      </div>

      {/* Quote */}
      <p style={{
        fontFamily: "var(--font-dm)", fontWeight: 300,
        fontSize: "0.85rem", lineHeight: 1.75,
        color: "var(--color-text-muted)",
        fontStyle: "italic",
        marginBottom: 20,
      }}>
        "{t.quote}"
      </p>

      {/* Author */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
          background: "linear-gradient(135deg, rgba(13,27,62,0.15), rgba(27,79,216,0.15))",
        }} />
        <div>
          <div style={{ fontFamily: "var(--font-dm)", fontWeight: 500, fontSize: "0.82rem", color: "var(--color-navy)" }}>
            {t.name}
          </div>
          <div style={{ fontFamily: "var(--font-dm)", fontSize: "0.72rem", color: "var(--color-text-muted)" }}>
            {t.role}
          </div>
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({ items, direction }: { items: typeof testimonials; direction: "left" | "right" }) {
  const track = [...items, ...items];
  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      {/* Left fade */}
      <div aria-hidden style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: 120, zIndex: 10,
        background: "linear-gradient(to right, var(--color-cream), transparent)",
        pointerEvents: "none",
      }} />
      {/* Right fade */}
      <div aria-hidden style={{
        position: "absolute", right: 0, top: 0, bottom: 0, width: 120, zIndex: 10,
        background: "linear-gradient(to left, var(--color-cream), transparent)",
        pointerEvents: "none",
      }} />

      <motion.div
        style={{ display: "flex" }}
        animate={direction === "left"
          ? { x: ["0%", "-50%"] }
          : { x: ["-50%", "0%"] }
        }
        transition={{ duration: 38, ease: "linear", repeat: Infinity }}
      >
        {track.map((t, i) => <Card key={i} t={t} />)}
      </motion.div>
    </div>
  );
}

export default function Testimonials() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      style={{ backgroundColor: "var(--color-cream)", padding: "96px 0 112px", overflow: "hidden" }}
    >
      {/* Header */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 80px 64px", textAlign: "center" }} className="t-pad">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
        >
          <span style={{
            fontFamily: "var(--font-dm)", fontSize: "0.65rem",
            letterSpacing: "0.14em", textTransform: "uppercase",
            color: "var(--color-gold)", display: "block", marginBottom: 20,
          }}>
            Testimonials
          </span>
          <h2 style={{
            fontFamily: "var(--font-cormorant)", fontWeight: 300,
            fontSize: "clamp(2.4rem, 3.8vw, 4rem)",
            lineHeight: 1.05, letterSpacing: "-0.02em",
            color: "var(--color-navy)", margin: 0,
          }}>
            Professionals who
            <br />
            <em style={{ fontStyle: "italic", fontWeight: 500, color: "var(--color-gold)" }}>
              took the leap.
            </em>
          </h2>
        </motion.div>
      </div>

      {/* Row 1 — left */}
      <div style={{ marginBottom: 16 }}>
        <MarqueeRow items={testimonials} direction="left" />
      </div>

      {/* Row 2 — right */}
      <MarqueeRow items={row2} direction="right" />

      <style>{`
        @media (max-width: 1024px) { .t-pad { padding: 0 48px 56px !important; } }
        @media (max-width: 640px)  { .t-pad { padding: 0 24px 48px !important; } }
      `}</style>
    </section>
  );
}
