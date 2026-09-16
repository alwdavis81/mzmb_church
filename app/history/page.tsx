import { sanityFetch } from "@/sanity/lib/live";
import { History } from "lucide-react";

type HistoryEntry = {
  _id: string;
  title: string;
  year?: string;
  description?: string;
  significance?: string;
};

async function getHistory() {
  const { data } = await sanityFetch({
    query: `*[_type == "history"] | order(year asc) {
      _id, title, year, description, significance
    }`,
  });
  return (data as HistoryEntry[]) ?? [];
}

export default async function HistoryPage() {
  const entries = await getHistory();

  return (
    <>
      <header className="page-header text-center" style={{ backgroundColor: "var(--color-primary)", color: "white", padding: "4rem 0", marginBottom: "2rem" }}>
        <div className="container">
          <h1 className="text-center" style={{ color: "white", marginBottom: "0.5rem" }}>Our History</h1>
          <p style={{ fontSize: "1.5rem", fontFamily: "var(--font-merriweather)", fontStyle: "italic", opacity: 0.9 }}>
            &ldquo;A legacy of faith since 1925.&rdquo;
          </p>
        </div>
      </header>

      <main className="container section">
        {entries.length > 0 ? (
          <div style={{ maxWidth: "700px", margin: "0 auto", position: "relative" }}>
            <div style={{ position: "absolute", left: 20, top: 0, bottom: 0, width: 2, background: "var(--color-border)" }} />
            {entries.map((entry) => (
              <div key={entry._id} style={{ position: "relative", paddingLeft: 60, marginBottom: "3rem" }}>
                <div style={{ position: "absolute", left: 10, top: 4, width: 22, height: 22, borderRadius: "50%", background: "var(--color-secondary)", border: "3px solid white", boxShadow: "0 0 0 2px var(--color-secondary)", zIndex: 1 }} />
                <div style={{ background: "#fff", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 4px 16px rgba(139, 69, 19, 0.04)" }}>
                  {entry.year && <span style={{ display: "inline-block", background: "var(--color-secondary)", color: "white", padding: "0.2rem 0.7rem", borderRadius: "999px", fontSize: "0.8rem", fontWeight: 700, marginBottom: "0.75rem" }}>{entry.year}</span>}
                  <h3>{entry.title}</h3>
                  {entry.description && <p style={{ color: "var(--color-text-muted)", lineHeight: 1.7 }}>{entry.description}</p>}
                  {entry.significance && <p style={{ marginTop: "0.75rem", fontStyle: "italic", color: "var(--color-secondary)" }}>{entry.significance}</p>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--color-text-muted)" }}>
            <History size={48} style={{ marginBottom: "1rem", opacity: 0.4 }} />
            <h3>History Coming Soon</h3>
            <p>Our church history timeline is being compiled.</p>
          </div>
        )}
      </main>
    </>
  );
}