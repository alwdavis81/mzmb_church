"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Heart, Church, BookOpen, Music } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease, delay },
});

function SectionReveal({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease }}
      className={className}
      style={style}
    >
      {children}
    </motion.section>
  );
}

export default function HomePage() {
  const [events, setEvents] = useState<{ _id: string; title: string; date: string; description?: string; image?: any }[]>([]);
  const [serviceTimes, setServiceTimes] = useState<{ label: string; time: string; day: string }[]>([]);

  useEffect(() => {
    client.fetch(`*[_type == "event"] | order(date asc) [0...2] { _id, title, date, description, image }`).then(setEvents).catch(() => {});
    client.fetch(`*[_type == "siteSettings"][0] { "times": serviceTimes[]{label, time, day} }`).then((r: any) => setServiceTimes(r?.times ?? [])).catch(() => {});
  }, []);
  return (
    <>
      {/* HERO -- Full-bleed asymmetric split */}
      <header
        style={{
          background: "var(--gradient-navy)",
          color: "white",
          padding: "clamp(4rem, 10vw, 8rem) 0 clamp(3rem, 6vw, 6rem)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute", inset: 0, opacity: 0.04,
            backgroundImage: "radial-gradient(circle at 30% 50%, white 5%, transparent 5%)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="container">
          <div style={{ display: "grid", gap: "3rem", alignItems: "center", position: "relative", zIndex: 1 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "3rem", alignItems: "center" }}>
              <motion.div
                {...fadeUp(0)}
                style={{ maxWidth: "580px", textAlign: "center", margin: "0 auto" }}
              >
                <span
                  style={{
                    display: "inline-block",
                    background: "rgba(200, 159, 94, 0.15)",
                    color: "var(--color-secondary)",
                    padding: "0.3rem 0.85rem",
                    borderRadius: "999px",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    marginBottom: "1.25rem",
                    border: "1px solid rgba(200, 159, 94, 0.25)",
                  }}
                >
                  Warmly Welcoming You
                </span>
                <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.04em", marginBottom: "1.5rem", color: "white" }}>
                  Welcome to<br />
                  <span className="text-gradient" style={{ WebkitTextFillColor: "transparent", WebkitBackgroundClip: "text" }}>
                    Mt. Zion
                  </span>
                </h1>
                <p style={{ fontSize: "clamp(1.1rem, 2vw, 1.35rem)", color: "rgba(255,255,255,0.8)", maxWidth: "480px", margin: "0 auto 2rem", fontWeight: 400, lineHeight: 1.6 }}>
                  &ldquo;Exalting the Savior, Equipping the Saint, Evangelizing the Sinner.&rdquo;
                </p>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
                  <Link href="/visit" className="btn btn-gold" style={{ padding: "0.85rem 2rem", fontSize: "1rem" }}>
                    Join Us This Sunday <ArrowRight size={18} />
                  </Link>
                  <Link href="/history" className="btn btn-outline-light">
                    Our History
                  </Link>
                </div>
              </motion.div>

              <motion.div
                {...fadeUp(0.15)}
                className="desktop-only"
                style={{ borderRadius: "var(--radius-xl)", overflow: "hidden", boxShadow: "var(--shadow-deep)", aspectRatio: "4/3" }}
              >
                <Image
                  src="/assets/hero.jpg"
                  alt="Mt. Zion Missionary Baptist Church"
                  width={800}
                  height={600}
                  className="object-cover"
                  priority
                  style={{ width: "100%", height: "100%" }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </header>

      {/* SERVICE TIMES */}
      <SectionReveal className="section-cream">
        <div className="container">
          <div className="text-center" style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700 }}>Sunday Worship Times</h2>
            <p style={{ color: "var(--color-text-muted)", maxWidth: "500px", margin: "0.5rem auto 0" }}>Join us in fellowship and worship.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem", alignItems: "stretch", maxWidth: "800px", margin: "0 auto" }}>
            {(serviceTimes.length > 0 ? serviceTimes.map(s => ({ time: s.time.split(" ")[0], period: s.time.split(" ")[1] || "", label: s.label, desc: s.day, highlight: s.day === "Sunday" && s.time === "11:00 AM" })) : [
              { time: "9:30", period: "AM", label: "Sunday School", desc: "Classes for all ages", highlight: false },
              { time: "11:00", period: "AM", label: "Main Worship Service", desc: "In the Sanctuary", highlight: true },
              { time: "7:00", period: "PM", label: "Bible Study", desc: "Wednesday Evenings", highlight: false },
            ]).map((s: any) => (
              <div key={s.time} className={s.highlight ? "time-card-highlight" : "time-card"}>
                <div className="number-display" style={{ color: s.highlight ? "white" : undefined }}>
                  {s.time}<span style={{ fontSize: "1.25rem", fontWeight: 400, opacity: 0.6 }}> {s.period}</span>
                </div>
                <div className="number-label" style={{ color: s.highlight ? "rgba(255,255,255,0.7)" : undefined, fontWeight: 600, fontSize: "1rem" }}>{s.label}</div>
                <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", marginTop: "0.35rem" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionReveal>

      {/* WELCOME -- Pull-quote */}
      <SectionReveal>
        <div className="container text-center" style={{ maxWidth: "720px", margin: "0 auto" }}>
          <div style={{ width: "60px", height: "3px", background: "var(--gradient-gold)", margin: "0 auto 2rem", borderRadius: "2px" }} />
          <blockquote style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)", fontWeight: 400, lineHeight: 1.5, color: "var(--color-text-main)", fontStyle: "italic" }}>
            &ldquo;A place of worship, a place of family, a place where faith comes alive.&rdquo;
          </blockquote>
          <p style={{ color: "var(--color-text-muted)", marginTop: "1rem", fontSize: "1rem" }}>-- Mt. Zion Missionary Baptist Church</p>
        </div>
      </SectionReveal>

      {/* COMMUNITY -- Asymmetric grid */}
      <SectionReveal className="section-dark">
        <div className="container">
          <div className="text-center" style={{ marginBottom: "3rem" }}>
            <span style={{ display: "inline-block", background: "rgba(200,159,94,0.15)", color: "var(--color-secondary)", padding: "0.3rem 0.85rem", borderRadius: "999px", fontSize: "0.85rem", fontWeight: 600, marginBottom: "1rem" }}>
              Our Community
            </span>
            <h2 style={{ fontSize: "clamp(2rem,4vw,3rem)", color: "white" }}>Gather, Grow, Go</h2>
          </div>

          <div className="grid-asymmetric">
            <div className="card" style={{ background: "var(--color-primary-light)", padding: "2.5rem", borderRadius: "var(--radius-lg)", border: "1px solid rgba(200,159,94,0.15)" }}>
              <Church size={32} style={{ color: "var(--color-secondary)", marginBottom: "1rem" }} />
              <h3 style={{ color: "white", fontSize: "1.75rem", marginBottom: "0.75rem" }}>Sunday Worship</h3>
              <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>Our main worship service is a time of powerful praise and preaching of God&rsquo;s Word.</p>
              <p style={{ color: "var(--color-secondary)", fontWeight: 700, marginTop: "1rem" }}>Every Sunday @ 11:00 AM</p>
            </div>

            <div className="card" style={{ padding: "1.5rem", borderRadius: "var(--radius-lg)" }}>
              <BookOpen size={24} style={{ color: "var(--color-secondary)", marginBottom: "0.75rem" }} />
              <h3>Sunday School</h3>
              <p style={{ color: "var(--color-text-muted)" }}>Deepen your understanding of Scripture.</p>
              <p style={{ color: "var(--color-secondary)", fontWeight: 700, marginTop: "0.75rem" }}>9:30 AM</p>
            </div>

            <div className="card" style={{ padding: "1.5rem", borderRadius: "var(--radius-lg)" }}>
              <Music size={24} style={{ color: "var(--color-secondary)", marginBottom: "0.75rem" }} />
              <h3>Bible Study</h3>
              <p style={{ color: "var(--color-text-muted)" }}>Mid-week spiritual refreshing.</p>
              <p style={{ color: "var(--color-secondary)", fontWeight: 700, marginTop: "0.75rem" }}>Wed @ 7:00 PM</p>
            </div>
          </div>
        </div>
      </SectionReveal>

      {/* EVENTS */}
      <SectionReveal className="section-cream">
        <div className="container">
          <div className="section-header">
            <div>
              <span style={{ display: "inline-block", background: "rgba(200,159,94,0.15)", color: "var(--color-secondary)", padding: "0.3rem 0.85rem", borderRadius: "999px", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.75rem" }}>
                Stay Connected
              </span>
              <h2 style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>Upcoming Events</h2>
            </div>
            <Link href="/events" className="link-arrow">
              View Full Calendar <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid-2">
            {(events.length > 0 ? events.map((e) => (
              <div key={e._id} className="event-card">
                <div className="event-card-image">
                  {e.image ? (
                    <Image src={urlFor(e.image).width(600).url()} alt={e.title} width={600} height={400} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                  ) : (
                    <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Music size={40} style={{ color: "var(--color-secondary)" }} />
                    </div>
                  )}
                </div>
                <div className="card-body">
                  <span className="event-card-badge">{e.date}</span>
                  <h3>{e.title}</h3>
                  <p style={{ color: "var(--color-text-muted)" }}>{e.description}</p>
                  <Link href="/events" className="link-arrow" style={{ marginTop: "0.75rem", display: "inline-flex" }}>
                    Learn More <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            )) : null)}
          </div>
        </div>
      </SectionReveal>

      {/* CTA */}
      <SectionReveal className="section-dark" style={{ background: "var(--gradient-navy)", textAlign: "center" }}>
        <div className="container" style={{ maxWidth: "600px" }}>
          <Heart size={40} style={{ color: "var(--color-secondary)", marginBottom: "1.25rem" }} />
          <h2 style={{ color: "white", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", marginBottom: "1rem" }}>
            Start Your Journey Here
          </h2>
          <p style={{ color: "rgba(255,255,255,0.7)", maxWidth: "500px", margin: "0 auto 2rem", fontSize: "1.1rem" }}>
            Whether you&rsquo;re new to faith or looking for a new church home, you&rsquo;re always welcome at Mt. Zion.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
            <Link href="/visit" className="btn btn-gold" style={{ padding: "0.85rem 2rem", fontSize: "1rem" }}>
              Plan Your Visit <ArrowRight size={18} />
            </Link>
            <Link href="/prayer" className="btn btn-outline-light">
              Request Prayer
            </Link>
          </div>
        </div>
      </SectionReveal>
    </>
  );
}
