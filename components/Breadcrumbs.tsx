"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

const routeLabels: Record<string, string> = {
  "/": "Home",
  "/visit": "Plan a Visit",
  "/beliefs": "What We Believe",
  "/leadership": "Leadership",
  "/history": "History",
  "/editorial": "Pastor's Editorial",
  "/ministries": "Ministries",
  "/sermons": "Sermons",
  "/events": "Events",
  "/prayer": "Prayer",
  "/contact": "Contact",
  "/giving": "Giving",
};

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" style={{ padding: "0.75rem 0", background: "var(--color-background)" }}>
      <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
        <ol style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.85rem", flexWrap: "wrap" }}>
          <li>
            <Link
              href="/"
              style={{ color: "var(--color-text-muted)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.25rem", transition: "color 0.2s" }}
              onMouseEnter={(e) => e.currentTarget.style.color = "var(--color-secondary)"}
              onMouseLeave={(e) => e.currentTarget.style.color = "var(--color-text-muted)"}
            >
              <Home size={14} />
              Home
            </Link>
          </li>
          {segments.map((segment, index) => {
            const href = "/" + segments.slice(0, index + 1).join("/");
            const label = routeLabels[href] || segment.charAt(0).toUpperCase() + segment.slice(1);
            const isLast = index === segments.length - 1;
            return (
              <li key={href} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <ChevronRight size={12} style={{ color: "var(--color-text-muted)" }} />
                {isLast ? (
                  <span aria-current="page" style={{ color: "var(--color-text-main)", fontWeight: 600, fontSize: "0.85rem" }}>
                    {label}
                  </span>
                ) : (
                  <Link
                    href={href}
                    style={{ color: "var(--color-text-muted)", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={(e) => e.currentTarget.style.color = "var(--color-secondary)"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "var(--color-text-muted)"}
                  >
                    {label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
