import { sanityFetch } from "@/sanity/lib/live";
import { CalendarDays, Headphones, Play, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type Sermon = {
  _id: string;
  title: string;
  speaker?: string;
  passage?: string;
  date?: string;
  description?: string;
  audioFile?: { asset?: { url?: string } };
  videoUrl?: string;
  series?: { title: string; _id: string };
};

type Series = {
  _id: string;
  title: string;
  description?: string;
};

async function getSermons() {
  const { data } = await sanityFetch({
    query: `*[_type == "sermon"] | order(coalesce(date, _createdAt) desc) {
      _id, title, speaker, passage, date, description,
      "audioFile": audioFile.asset->{url},
      videoUrl,
      "series": series->{title, _id}
    }`,
  });
  return (data as Sermon[]) ?? [];
}

async function getSeries() {
  const { data } = await sanityFetch({
    query: `*[_type == "sermonSeries"] | order(title asc) {
      _id, title, description
    }`,
  });
  return (data as Series[]) ?? [];
}

async function getSiteSettings() {
  const { data } = await sanityFetch({
    query: `*[_type == "siteSettings"][0] {
      livestreamUrl
    }`,
  });
  return data as { livestreamUrl?: string } | null;
}

import InteractiveCard from "@/components/InteractiveCard";

function SermonCard({ sermon }: { sermon: Sermon }) {
  return (
    <InteractiveCard
      style={{
        background: "#fff",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <div style={{ backgroundColor: "var(--color-primary)", height: "180px", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "2.5rem", position: "relative" }}>
        {sermon.series?.title ?? "Sermon"}
        {sermon.videoUrl && <span style={{ position: "absolute", bottom: 12, right: 12, background: "rgba(0,0,0,0.5)", borderRadius: 8, padding: "4px 10px", fontSize: "0.75rem", display: "flex", alignItems: "center", gap: 4 }}><Play size={12} /> Video</span>}
      </div>
      <div style={{ padding: "1.5rem" }}>
        <h3 style={{ fontSize: "1.15rem", fontWeight: 700 }}>{sermon.title}</h3>
        {sermon.date && <p style={{ color: "var(--color-secondary)", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.3rem" }}><CalendarDays size={14} /> {sermon.date}</p>}
        {sermon.speaker && <p style={{ fontSize: "0.9rem", marginBottom: "0.25rem" }}><strong>Speaker:</strong> {sermon.speaker}</p>}
        {sermon.passage && <p style={{ fontSize: "0.9rem", marginBottom: "0.5rem", fontStyle: "italic" }}>{sermon.passage}</p>}
        {sermon.description && <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem", marginBottom: "0.75rem" }}>{sermon.description}</p>}
        <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.75rem" }}>
          {sermon.audioFile?.asset?.url && (
            <a href={sermon.audioFile.asset.url} className="btn btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.6rem 1.2rem", fontSize: "0.85rem", backgroundColor: "var(--color-primary)", color: "white", borderRadius: "8px", fontWeight: 600, textDecoration: "none" }} target="_blank" rel="noopener noreferrer">
              <Headphones size={16} /> Listen
            </a>
          )}
          {sermon.videoUrl && (
            <a href={sermon.videoUrl} className="btn btn-outline" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.6rem 1.2rem", fontSize: "0.85rem", border: "2px solid var(--color-primary)", color: "var(--color-primary)", borderRadius: "8px", fontWeight: 600, textDecoration: "none" }} target="_blank" rel="noopener noreferrer">
              <Play size={16} /> Watch
            </a>
          )}
        </div>
      </div>
    </InteractiveCard>
  );
}

export default async function SermonsPage() {

  const [sermons, series, settings] = await Promise.all([
    getSermons(),
    getSeries(),
    getSiteSettings(),
  ]);

  return (
    <>
      <header className="page-header text-center" style={{ backgroundColor: "var(--color-primary)", color: "white", padding: "4rem 0", marginBottom: "2rem" }}>
        <div className="container">
          <h1 className="text-center" style={{ color: "white", marginBottom: "0.5rem" }}>Sermons</h1>
          <p style={{ fontSize: "1.5rem", fontFamily: "var(--font-merriweather)", fontStyle: "italic", opacity: 0.9 }}>
            &ldquo;Feed my sheep.&rdquo; — John 21:17
          </p>
        </div>
      </header>

      <main className="container section">

        {/* ---------- Live Stream ---------- */}
        <section style={{ marginBottom: "4rem" }}>
          <h2>Watch / Listen Online</h2>
          <p>Join us live every Sunday at 11:00 AM.</p>
          {settings?.livestreamUrl ? (
            <div style={{ marginTop: "1.5rem" }}>
              <a href={settings.livestreamUrl} target="_blank" rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", backgroundColor: "var(--color-primary)", color: "white", padding: "0.85rem 1.75rem", borderRadius: "12px", fontWeight: 600, textDecoration: "none" }}>
                <ExternalLink size={18} /> Watch Live Now
              </a>
              <div style={{ marginTop: "1.5rem", aspectRatio: "16 / 9", maxWidth: "800px", borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.1)" }}>
                <iframe
                  src={settings.livestreamUrl.replace("watch?v=", "embed/")}
                  style={{ width: "100%", height: "100%", border: 0 }}
                  allowFullScreen
                  allow="autoplay; fullscreen"
                  title="Live Stream"
                />
              </div>
            </div>
          ) : (
            <div style={{ backgroundColor: "#333", height: "300px", borderRadius: "12px", marginTop: "1.5rem", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "1rem", flexDirection: "column", gap: "1rem", maxWidth: "800px" }}>
              <Play size={48} style={{ opacity: 0.3 }} />
              <span style={{ opacity: 0.5 }}>Live stream URL not configured — add it in Site Settings</span>
            </div>
          )}
        </section>

        {/* ---------- Podcast ---------- */}
        <section style={{ marginBottom: "4rem" }}>
          <h2>Podcast</h2>
          <p>Subscribe to our podcast to listen on the go.</p>
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", marginTop: "1.5rem" }}>
            <a href="#" className="btn btn-primary" style={{ display: "flex", alignItems: "center", gap: "0.4rem", backgroundColor: "var(--color-primary)", color: "white", padding: "0.85rem 1.75rem", borderRadius: "12px", fontWeight: 600, textDecoration: "none" }}>
              <Headphones size={18} /> Apple Podcasts
            </a>
            <a href="#" className="btn btn-primary" style={{ display: "flex", alignItems: "center", gap: "0.4rem", backgroundColor: "var(--color-secondary)", color: "white", padding: "0.85rem 1.75rem", borderRadius: "12px", fontWeight: 600, textDecoration: "none" }}>
              Spotify
            </a>
          </div>
        </section>

        {/* ---------- Sermon Archive ---------- */}
        <section style={{ marginBottom: "4rem" }}>
          <h2>Sermon Archive</h2>
          {sermons.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", marginTop: "2rem" }}>
              {sermons.map((sermon) => (
                <SermonCard key={sermon._id} sermon={sermon} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--color-text-muted)" }}>
              <Headphones size={48} style={{ marginBottom: "1rem", opacity: 0.4 }} />
              <h3>No Sermons Yet</h3>
              <p>Check back soon for recorded messages.</p>
            </div>
          )}
        </section>

        {/* ---------- Series ---------- */}
        {series.length > 0 && (
          <section>
            <h2>Series</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", marginTop: "2rem" }}>
              {series.map((s) => (
                <article key={s._id} style={{ background: "#fff", borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 16px rgba(139, 69, 19, 0.04)" }}>
                  <div style={{ backgroundColor: "var(--color-accent)", height: "120px", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "1.5rem", fontWeight: 700 }}>
                    {s.title}
                  </div>
                  <div style={{ padding: "1.5rem" }}>
                    <h3>{s.title}</h3>
                    {s.description && <p style={{ color: "var(--color-text-muted)" }}>{s.description}</p>}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
  