"use client";
import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import { client } from "@/sanity/lib/client";

export default function EmergencyBanner() {
  const [banner, setBanner] = useState<{ text?: string; linkUrl?: string; linkLabel?: string; dismissible?: boolean; bgColor?: string; active?: boolean } | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    client.fetch(`*[_type == "siteSettings"][0] {
      emergencyBanner { text, linkUrl, linkLabel, dismissible, bgColor, active }
    }`)
      .then((data: any) => data?.emergencyBanner ?? null)
      .then(setBanner)
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!banner?.active || !banner?.text) return;
    const el = scrollRef.current;
    if (!el) return;

    const frame = () => {
      offsetRef.current -= 0.6;
      const limit = el.scrollWidth;
      if (offsetRef.current < -limit) offsetRef.current = window.innerWidth + 100;
      el.style.transform = `translateX(${offsetRef.current}px)`;
      rafRef.current = requestAnimationFrame(frame);
    };

    offsetRef.current = window.innerWidth + 100;
    rafRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafRef.current);
  }, [banner?.active, banner?.text]);

  if (!banner?.active || !banner?.text || dismissed) return null;

  return (
    <div style={{ backgroundColor: banner.bgColor || "#DC2626", color: "white", overflow: "hidden", position: "sticky", top: 0, zIndex: 50, height: "2.5rem" }}>
      <div ref={scrollRef} style={{ whiteSpace: "nowrap", lineHeight: "2.5rem", fontSize: "0.9rem", paddingRight: "2rem", willChange: "transform" }}>
        <span style={{ margin: "0 2rem" }}>{banner.text}</span>
        {banner.linkUrl && banner.linkLabel && (
          <Link href={banner.linkUrl} style={{ color: "white", fontWeight: 700, textDecoration: "underline" }}>
            {banner.linkLabel}
          </Link>
        )}
      </div>
      {banner.dismissible !== false && (
        <button onClick={() => setDismissed(true)} style={{ background: "none", border: "none", color: "white", cursor: "pointer", position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", padding: 4, zIndex: 2 }} aria-label="Dismiss banner">
          <X size={18} />
        </button>
      )}
    </div>
  );
}