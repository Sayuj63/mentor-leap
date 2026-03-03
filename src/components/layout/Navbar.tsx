"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { label: "Executive Coaching", href: "/executive-coaching" },
  { label: "Live Events", href: "/live-events" },
  { label: "Resource Library", href: "/resource-library" },
  { label: "Mentor AI", href: "/mentor-ai" },
  { label: "Studio", href: "/studio" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-3 bg-cream/80 backdrop-blur-xl border-b border-cream-border shadow-sm"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10">
            <Image
              src="/logo.png"
              alt="MentorLeap"
              fill
              className="object-contain"
            />
          </div>
          <span className="font-cormorant font-600 text-xl tracking-wide">
            <span className="text-navy">MENTOR</span>
            <span className="text-gold">LEAP</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative font-dm text-sm text-text-muted hover:text-navy transition-colors duration-300 group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/auth/login"
            className="font-dm text-sm text-navy hover:text-gold transition-colors duration-300"
          >
            Login
          </Link>
          <MagneticButton href="/executive-coaching">
            Book Discovery Call
          </MagneticButton>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="block w-6 h-px bg-navy origin-center transition-all"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-6 h-px bg-navy"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="block w-6 h-px bg-navy origin-center transition-all"
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden overflow-hidden bg-cream/95 backdrop-blur-xl border-t border-cream-border"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-dm text-base text-navy py-2 border-b border-cream-border"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/executive-coaching"
                className="mt-2 text-center py-3 px-6 bg-navy text-cream font-dm text-sm rounded-full"
              >
                Book Discovery Call
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function MagneticButton({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <Link
      href={href}
      className="relative px-5 py-2.5 bg-navy text-cream font-dm text-sm rounded-full overflow-hidden group hover:bg-navy-light transition-colors duration-300"
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 bg-gold scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 rounded-full" />
      <span className="relative z-10 group-hover:text-navy transition-colors duration-300 hidden">
        {children}
      </span>
    </Link>
  );
}