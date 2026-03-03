"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const pillars = [
  {
    number: "01",
    title: "Real-World Mentorship",
    description:
      "Human-led coaching with Mridu Bhandari — 20+ years of broadcast journalism and executive communication experience distilled into your growth.",
  },
  {
    number: "02",
    title: "AI Reinforcement",
    description:
      "Mentor AI is trained on Mridu's frameworks — available 24×7 to practice scenarios, refine speeches, prep interviews, and build your communication muscle.",
  },
  {
    number: "03",
    title: "Structured Growth",
    description:
      "A clear roadmap from where you are to where you need to be — job-ready, promotion-ready, leadership-ready, on your timeline.",
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function WhatIsMentorLeap() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      style={{ backgroundColor: "var(--color-cream)", padding: "96px 0 0" }}
    >
      {/* ── Max-width container — same 1280px as Hero ── */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 80px" }}>

        {/* ── Header row ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
            marginBottom: 80,
            alignItems: "flex-end",
          }}
          className="what-grid"
        >
          {/* Left: label + headline */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease }}
          >
            <span
              style={{
                fontFamily: "var(--font-dm)",
                fontSize: "0.65rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--color-gold)",
                display: "block",
                marginBottom: 20,
              }}
            >
              What is MentorLeap?
            </span>
            <h2
              style={{
                fontFamily: "var(--font-cormorant)",
                fontWeight: 300,
                fontSize: "clamp(2.4rem, 3.8vw, 4rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: "var(--color-navy)",
                margin: 0,
              }}
            >
              Not just a coaching
              <br />
              <em style={{ fontWeight: 400, fontStyle: "italic" }}>platform.</em>
            </h2>
          </motion.div>

          {/* Right: body copy */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease }}
          >
            <p
              style={{
                fontFamily: "var(--font-dm)",
                fontWeight: 300,
                fontSize: "1rem",
                lineHeight: 1.8,
                color: "var(--color-text-muted)",
                margin: 0,
              }}
            >
              MentorLeap is an AI-powered skill acceleration ecosystem designed to
              make professionals job-ready, promotion-ready, and leadership-ready.
              We combine the irreplaceable power of human mentorship with the
              always-on support of AI.
            </p>
          </motion.div>
        </div>

        {/* ── Pillars ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 1,
            backgroundColor: "var(--color-cream-border)",
          }}
          className="pillars-grid"
        >
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.number}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 * i + 0.35, ease }}
              className="pillar-card"
              style={{
                backgroundColor: "var(--color-cream)",
                padding: "48px 40px 52px",
                cursor: "default",
                transition: "background-color 0.45s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-navy)";
                const num = e.currentTarget.querySelector(".pillar-num") as HTMLElement;
                const title = e.currentTarget.querySelector(".pillar-title") as HTMLElement;
                const desc = e.currentTarget.querySelector(".pillar-desc") as HTMLElement;
                if (num) num.style.color = "rgba(201,168,76,0.5)";
                if (title) title.style.color = "var(--color-cream)";
                if (desc) desc.style.color = "rgba(250,250,247,0.65)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-cream)";
                const num = e.currentTarget.querySelector(".pillar-num") as HTMLElement;
                const title = e.currentTarget.querySelector(".pillar-title") as HTMLElement;
                const desc = e.currentTarget.querySelector(".pillar-desc") as HTMLElement;
                if (num) num.style.color = "rgba(201,168,76,0.3)";
                if (title) title.style.color = "var(--color-navy)";
                if (desc) desc.style.color = "var(--color-text-muted)";
              }}
            >
              {/* Number */}
              <div
                className="pillar-num"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontWeight: 300,
                  fontSize: "4rem",
                  lineHeight: 1,
                  color: "rgba(201,168,76,0.3)",
                  marginBottom: 28,
                  transition: "color 0.45s ease",
                }}
              >
                {pillar.number}
              </div>

              {/* Title */}
              <h3
                className="pillar-title"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontWeight: 500,
                  fontSize: "1.5rem",
                  lineHeight: 1.2,
                  color: "var(--color-navy)",
                  marginBottom: 16,
                  transition: "color 0.45s ease",
                }}
              >
                {pillar.title}
              </h3>

              {/* Description */}
              <p
                className="pillar-desc"
                style={{
                  fontFamily: "var(--font-dm)",
                  fontWeight: 300,
                  fontSize: "0.875rem",
                  lineHeight: 1.75,
                  color: "var(--color-text-muted)",
                  margin: 0,
                  transition: "color 0.45s ease",
                }}
              >
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Responsive overrides */}
      <style>{`
        @media (max-width: 1024px) {
          .what-grid  { grid-template-columns: 1fr !important; gap: 32px !important; }
          .pillars-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .what-grid  { padding: 0 24px; }
        }
      `}</style>
    </section>
  );
}
