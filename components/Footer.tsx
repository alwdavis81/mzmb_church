"use client";
import Link from "next/link";
import { Heart, MapPin, Clock, ChevronRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: "var(--color-primary)", color: "white", paddingTop: "4rem", paddingBottom: "2rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "3rem", marginBottom: "3rem" }} className="footer-grid">
          {/* Church Info */}
          <div>
            <h4 style={{ color: "var(--color-secondary)", marginBottom: "1.25rem", fontSize: "1.15rem", fontWeight: 700 }}>
              Mt. Zion MBC
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.95rem", lineHeight: 1.7, color: "rgba(255,255,255,0.75)" }}>
              <div style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start" }}>
                <MapPin size={16} style={{ marginTop: "3px", flexShrink: 0, color: "var(--color-secondary)" }} />
                <span>12741 E Rd<br />Burt, MI 48417</span>
              </div>
              <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
                <Clock size={16} style={{ flexShrink: 0, color: "var(--color-secondary)" }} />
                <span>(989) 770-4630</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: "var(--color-secondary)", marginBottom: "1.25rem", fontSize: "1.15rem", fontWeight: 700 }}>Quick Links</h4>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[
                { href: "/visit", label: "Plan a Visit" },
                { href: "/leadership", label: "Leadership" },
                { href: "/prayer", label: "Prayer" },
                { href: "/editorial", label: "Pastor's Editorial" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      color: "rgba(255,255,255,0.75)", textDecoration: "none",
                      display: "inline-flex", alignItems: "center", gap: "0.3rem",
                      transition: "color 0.3s ease, gap 0.3s ease", fontSize: "0.95rem",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "var(--color-secondary)"; e.currentTarget.style.gap = "0.6rem"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.75)"; e.currentTarget.style.gap = "0.3rem"; }}
                  >
                    <ChevronRight size={14} style={{ flexShrink: 0 }} />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Worship Times */}
          <div>
            <h4 style={{ color: "var(--color-secondary)", marginBottom: "1.25rem", fontSize: "1.15rem", fontWeight: 700 }}>Worship With Us</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                { time: "9:30 AM", label: "Sunday School" },
                { time: "11:00 AM", label: "Main Worship Service" },
                { time: "7:00 PM", label: "Bible Study (Wed)" },
              ].map((s) => (
                <div key={s.time} style={{ borderLeft: "2px solid var(--color-secondary)", paddingLeft: "0.75rem" }}>
                  <div style={{ fontWeight: 700, fontSize: "1rem", color: "white" }}>{s.time}</div>
                  <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.6)" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Give CTA */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h4 style={{ color: "var(--color-secondary)", marginBottom: "1.25rem", fontSize: "1.15rem", fontWeight: 700 }}>Support Our Ministry</h4>
            <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "rgba(255,255,255,0.6)", marginBottom: "1.25rem" }}>
              Your generosity helps us continue our mission of faith, fellowship, and community outreach.
            </p>
            <Link
              href="/giving"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                background: "white", color: "var(--color-primary)",
                padding: "0.85rem 1.75rem", borderRadius: "var(--radius-md)",
                fontWeight: 700, textDecoration: "none", alignSelf: "flex-start",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.25)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(0,0,0,0.15)"; }}
            >
              <Heart size={18} fill="currentColor" />
              Give Online
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.1)",
          paddingTop: "2rem",
          textAlign: "center",
          color: "rgba(255,255,255,0.4)",
          fontSize: "0.85rem",
        }}>
          <p>Made with ❤️ in Michigan &nbsp;|&nbsp; &copy; {currentYear} Mt. Zion Missionary Baptist Church. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
