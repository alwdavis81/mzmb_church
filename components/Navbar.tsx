"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Heart } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/ministries", label: "Ministries" },
  { href: "/sermons", label: "Sermons" },
  { href: "/events", label: "Events" },
  { href: "/prayer", label: "Prayer" },
  { href: "/contact", label: "Contact" },
];

const aboutLinks = [
  { href: "/visit", label: "Plan a Visit" },
  { href: "/beliefs", label: "What We Believe" },
  { href: "/leadership", label: "Leadership" },
  { href: "/history", label: "History" },
  { href: "/editorial", label: "Pastor's Editorial" },
];

const overlayVariants = {
  hidden: { opacity: 0, x: "100%" },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
  exit: { opacity: 0, x: "100%", transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen((v) => !v);
  const closeMobileMenu = () => { setIsMobileMenuOpen(false); setIsAboutOpen(false); };

  const isActive = (href: string) => pathname === href;

  if (!mounted) {
    return (
      <nav className="navbar" aria-label="Main navigation">
        <div className="nav-container">
          <Link href="/" className="logo">
            <Image src="/assets/logo.svg" alt="Mt. Zion MBC Logo" width={32} height={32} style={{ height: "32px", width: "auto" }} />
            <span>Mt. Zion</span>
          </Link>
        </div>
      </nav>
    );
  }

  return (
    <nav className={"navbar" + (isScrolled ? " navbar--scrolled" : "")} aria-label="Main navigation"
      style={{ position: "sticky", top: 0, zIndex: 51 }}>
      <div className="nav-container">
        <Link href="/" className="logo">
          <Image src="/assets/logo.svg" alt="Mt. Zion MBC Logo" width={32} height={32} style={{ height: "32px", width: "auto" }} />
          <span>Mt. Zion</span>
        </Link>

        <ul className="nav-links" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="nav-link"
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li
            className="nav-link"
            style={{ position: "relative", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.25rem", padding: 0 }}
            onMouseEnter={() => setIsAboutOpen(true)}
            onMouseLeave={() => setIsAboutOpen(false)}
          >
            <span style={{ color: "inherit", fontWeight: 500, fontSize: "0.95rem" }}>About</span>
            <motion.span animate={{ rotate: isAboutOpen ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ display: "inline-flex" }}>
              <ChevronDown size={14} />
            </motion.span>
            <AnimatePresence>
              {isAboutOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
                  style={{
                    position: "absolute", top: "100%", left: 0, marginTop: "0.5rem",
                    background: "var(--color-surface)", borderRadius: "var(--radius-md)",
                    boxShadow: "var(--shadow-card-hover)", minWidth: "200px",
                    zIndex: 100, border: "1px solid var(--color-border)", overflow: "hidden",
                  }}
                >
                  {aboutLinks.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.2 }}
                    >
                      <Link
                        href={link.href}
                        onClick={closeMobileMenu}
                        style={{
                          display: "flex", alignItems: "center", gap: "0.5rem",
                          padding: "0.6rem 1rem",
                          color: isActive(link.href) ? "var(--color-secondary)" : "var(--color-text-main)",
                          fontWeight: isActive(link.href) ? 600 : 400,
                          fontSize: "0.9rem", textDecoration: "none",
                          borderLeft: isActive(link.href) ? "3px solid var(--color-secondary)" : "3px solid transparent",
                          background: isActive(link.href) ? "rgba(200, 159, 94, 0.06)" : "transparent",
                          transition: "background 0.15s ease, color 0.15s ease, border-left-color 0.15s ease",
                        }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget;
                          el.style.background = "rgba(200, 159, 94, 0.1)";
                          el.style.borderLeftColor = "var(--color-secondary)";
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget;
                          el.style.background = isActive(link.href) ? "rgba(200, 159, 94, 0.06)" : "transparent";
                          el.style.borderLeftColor = isActive(link.href) ? "var(--color-secondary)" : "transparent";
                        }}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        </ul>

        <div className="nav-actions">

          <Link href="/giving" className="btn btn-gold">
            <Heart size={16} fill="currentColor" /> Give
          </Link>
        </div>

        <button
          className="nav-toggle mobile-only"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 + 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
              >
                <Link
                  href={link.href}
                  className="nav-link"
                  aria-current={isActive(link.href) ? "page" : undefined}
                  onClick={closeMobileMenu}
                  style={{ fontSize: "1.5rem", fontWeight: 700, padding: "0.75rem 1.5rem", minHeight: "48px" }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            {aboutLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (navLinks.length + i) * 0.06 + 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
              >
                <Link
                  href={link.href}
                  className="nav-link"
                  aria-current={isActive(link.href) ? "page" : undefined}
                  onClick={closeMobileMenu}
                  style={{ fontSize: "1.25rem", fontWeight: 500, padding: "0.5rem 1.5rem", minHeight: "48px", opacity: 0.7 }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (navLinks.length + aboutLinks.length) * 0.06 + 0.15, duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
            >
              <Link href="/giving" className="btn btn-gold" style={{ padding: "0.85rem 2.5rem", fontSize: "1.1rem" }} onClick={closeMobileMenu}>
                <Heart size={18} fill="currentColor" /> Give
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
