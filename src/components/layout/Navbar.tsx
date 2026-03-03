"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { label: "Executive Coaching", href: "/executive-coaching" },
  { label: "Live Events",        href: "/live-events" },
  { label: "Resource Library",   href: "/resource-library" },
  { label: "Mentor AI",          href: "/mentor-ai" },
  { label: "Studio",             href: "/studio" },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        transition: "padding 0.4s ease, background-color 0.4s ease, box-shadow 0.4s ease",
        padding: scrolled ? "10px 0" : "18px 0",
        backgroundColor: scrolled ? "rgba(250,250,247,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid var(--color-cream-border)" : "1px solid transparent",
        boxShadow: scrolled ? "0 1px 24px rgba(13,27,62,0.06)" : "none",
      }}
    >
      <div style={{
        maxWidth: 1280, margin: "0 auto", padding: "0 80px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }} className="nav-wrap">

        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
          <div style={{ position: "relative", width: 38, height: 38, flexShrink: 0 }}>
            <Image src="/logo.png" alt="MentorLeap" fill style={{ objectFit: "contain" }} />
          </div>
          <span style={{ fontFamily: "var(--font-cormorant)", fontWeight: 600, fontSize: "1.15rem", letterSpacing: "0.06em" }}>
            <span style={{ color: "var(--color-navy)" }}>MENTOR</span>
            <span style={{ color: "var(--color-gold)" }}>LEAP</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: 36 }} className="nav-desktop">
          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href}>{link.label}</NavLink>
          ))}
        </nav>

        {/* CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }} className="nav-desktop">
          <Link
            href="/auth/login"
            style={{
              fontFamily: "var(--font-dm)", fontSize: "0.82rem",
              color: "var(--color-navy)", textDecoration: "none",
              transition: "color 0.25s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--color-gold)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--color-navy)"; }}
          >
            Login
          </Link>
          <BookCTA href="/executive-coaching">Book Discovery Call</BookCTA>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{
            display: "none", flexDirection: "column", gap: 5, padding: 8,
            background: "none", border: "none", cursor: "pointer",
          }}
          className="nav-mobile-btn"
        >
          <motion.span animate={menuOpen ? { rotate: 45, y: 7 }  : { rotate: 0, y: 0 }}
            style={{ display: "block", width: 22, height: 1.5, backgroundColor: "var(--color-navy)", transformOrigin: "center", borderRadius: 1 }} />
          <motion.span animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            style={{ display: "block", width: 22, height: 1.5, backgroundColor: "var(--color-navy)", borderRadius: 1 }} />
          <motion.span animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            style={{ display: "block", width: 22, height: 1.5, backgroundColor: "var(--color-navy)", transformOrigin: "center", borderRadius: 1 }} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease }}
            style={{
              overflow: "hidden",
              backgroundColor: "rgba(250,250,247,0.97)",
              backdropFilter: "blur(20px)",
              borderTop: "1px solid var(--color-cream-border)",
            }}
          >
            <div style={{ padding: "24px 24px 32px", display: "flex", flexDirection: "column", gap: 0 }}>
              {navLinks.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily: "var(--font-dm)", fontSize: "0.95rem",
                    color: "var(--color-navy)", textDecoration: "none",
                    padding: "14px 0",
                    borderBottom: i < navLinks.length - 1 ? "1px solid var(--color-cream-border)" : "none",
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/executive-coaching"
                style={{
                  marginTop: 20, textAlign: "center",
                  padding: "13px 24px", borderRadius: 999,
                  backgroundColor: "var(--color-navy)", color: "var(--color-cream)",
                  fontFamily: "var(--font-dm)", fontSize: "0.85rem",
                  textDecoration: "none",
                }}
              >
                Book Discovery Call
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 1024px) {
          .nav-wrap    { padding: 0 48px !important; }
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: flex !important; }
        }
        @media (max-width: 640px) {
          .nav-wrap { padding: 0 24px !important; }
        }
      `}</style>
    </motion.header>
  );
}

// ── Underline nav link ──
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
      style={{ position: "relative", textDecoration: "none" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span style={{
        fontFamily: "var(--font-dm)", fontSize: "0.82rem",
        color: hovered ? "var(--color-navy)" : "var(--color-text-muted)",
        transition: "color 0.25s",
      }}>
        {children}
      </span>
      <motion.span
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        style={{
          position: "absolute", bottom: -3, left: 0, right: 0,
          height: 1, backgroundColor: "var(--color-gold)",
          transformOrigin: "left", display: "block",
        }}
      />
    </Link>
  );
}

// ── Book CTA button ──
function BookCTA({ href, children }: { href: string; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
      style={{
        position: "relative", overflow: "hidden",
        padding: "10px 22px", borderRadius: 999,
        backgroundColor: hovered ? "var(--color-navy-light)" : "var(--color-navy)",
        color: "var(--color-cream)",
        fontFamily: "var(--font-dm)", fontSize: "0.82rem",
        textDecoration: "none",
        transition: "background-color 0.3s ease",
        display: "inline-block",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </Link>
  );
}
