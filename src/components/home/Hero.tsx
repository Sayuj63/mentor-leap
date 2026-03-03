"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";

const words = ["Job-Ready.", "Leadership-Ready.", "Future-Ready."];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<HTMLSpanElement[]>([]);
  const currentWord = useRef(0);

  useEffect(() => {
    // Set initial state — only first word visible
    wordRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 30 });
    });

    // Staggered entrance
    const ctx = gsap.context(() => {
      gsap.from(".hero-line", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out",
        delay: 0.3,
      });
      gsap.from(".hero-sub", {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.9,
        ease: "power3.out",
      });
      gsap.from(".hero-cta", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        delay: 1.1,
        ease: "power3.out",
      });
      gsap.from(".hero-stats", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        delay: 1.4,
        ease: "power3.out",
      });
    }, containerRef);

    // Word cycle
    const interval = setInterval(() => {
      const prev = wordRefs.current[currentWord.current];
      if (!prev) return;
      currentWord.current = (currentWord.current + 1) % words.length;
      const next = wordRefs.current[currentWord.current];
      if (!next) return;

      gsap.to(prev, { y: -40, opacity: 0, duration: 0.5, ease: "power2.in" });
      gsap.fromTo(
        next,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.35 }
      );
    }, 2500);

    return () => {
      ctx.revert();
      clearInterval(interval);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center items-start overflow-hidden bg-cream"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-navy/3 rounded-full blur-3xl" />
      </div>

      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#0D1B3E 1px, transparent 1px), linear-gradient(90deg, #0D1B3E 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full text-left py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* CONTENT COLUMN */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-gold/30 bg-gold/5 mb-10"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span className="font-dm text-xs text-gold tracking-widest uppercase">
                AI-Powered Professional Growth
              </span>
            </motion.div>

            {/* Headline block */}
            <div className="overflow-hidden mb-2">
              <h1 className="hero-line font-cormorant font-300 text-6xl md:text-8xl text-navy leading-[0.95] tracking-tight">
                Become
              </h1>
            </div>

            {/* Cycling word */}
            <div
              className="relative overflow-hidden mb-2"
              style={{ height: "1.05em", lineHeight: "1.05" }}
            >
              {words.map((word, i) => (
                <span
                  key={word}
                  ref={(el) => {
                    if (el) wordRefs.current[i] = el;
                  }}
                  className="absolute left-0 font-cormorant font-600 text-6xl md:text-8xl text-gold tracking-tight"
                  style={{
                    opacity: i === 0 ? 1 : 0,
                    transform: i === 0 ? "translateY(0)" : "translateY(30px)",
                    lineHeight: "1.05",
                    willChange: "transform, opacity",
                  }}
                >
                  {word}
                </span>
              ))}
            </div>

            <div className="overflow-hidden mb-8">
              <p className="hero-line font-cormorant font-300 text-6xl md:text-8xl text-navy leading-[0.95] tracking-tight">
                Powered by AI.
              </p>
            </div>

            {/* Subheading */}
            <p className="hero-sub font-dm font-300 text-lg text-text-muted max-w-xl mb-12 leading-relaxed">
              MentorLeap is an AI-powered skill acceleration ecosystem combining
              real-world mentorship, executive coaching, and 24×7 AI learning support.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start justify-start gap-4 mb-20">
              <Link
                href="/executive-coaching"
                className="hero-cta group flex items-center justify-center gap-2 px-8 py-4 bg-navy text-cream font-dm text-sm rounded-full hover:bg-navy-light transition-all duration-300 hover:gap-3 w-full sm:w-auto"
              >
                Start Your Growth Journey
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                href="/executive-coaching"
                className="hero-cta flex items-center justify-center gap-2 px-8 py-4 border border-navy/20 text-navy font-dm text-sm rounded-full hover:border-gold hover:text-gold transition-all duration-300 w-full sm:w-auto"
              >
                Explore Executive Coaching
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-start gap-12">
              {[
                { value: "500+", label: "Professionals Coached" },
                { value: "20+", label: "Years Experience" },
                { value: "4.9★", label: "Average Rating" },
              ].map((stat) => (
                <div key={stat.label} className="hero-stats text-left">
                  <div className="font-cormorant font-500 text-4xl text-navy">{stat.value}</div>
                  <div className="font-dm text-xs text-text-muted tracking-wider uppercase mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* IMAGE COLUMN */}
          <div className="relative hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
              className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-gold/20 shadow-2xl"
            >
              <img
                src="/hero-profile.jpg"
                alt="Mridu Bhandari"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/20 to-transparent" />
            </motion.div>

            {/* Decorative elements around image */}
            <div className="absolute -top-6 -right-6 w-32 h-32 border-2 border-gold/10 rounded-full" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-gold/5 rounded-full blur-2xl" />
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="font-dm text-xs text-text-muted tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4 text-text-muted" />
      </motion.div>
    </section>
  );
}
