import { sanityFetch } from "@/sanity/lib/live";
import { HandCoins } from "lucide-react";

type GivingMethod = {
  _id: string;
  title: string;
  type?: string;
  details?: string;
  benefit?: string;
};

async function getGiving() {
  const { data } = await sanityFetch({
    query: `*[_type == "giving"] | order(_createdAt asc) {
      _id, title, type, details, benefit
    }`,
  });
  return (data as GivingMethod[]) ?? [];
}

export default async function GivingPage() {
  const methods = await getGiving();

  return (
    <>
      <header className="page-header text-center" style={{ backgroundColor: "var(--color-primary)", color: "white", padding: "4rem 0", marginBottom: "2rem" }}>
        <div className="container">
          <h1 className="text-center" style={{ color: "white", marginBottom: "0.5rem" }}>Giving</h1>
          <p style={{ fontSize: "1.5rem", fontFamily: "var(--font-merriweather)", fontStyle: "italic", opacity: 0.9 }}>
            &ldquo;Give, and it will be given to you.&rdquo; — Luke 6:38
          </p>
        </div>
      </header>

      <main className="container section">
        {methods.length > 0 ? (
          <div style={{ background: "#fff", borderRadius: "12px", padding: "3rem", boxShadow: "0 4px 16px rgba(139, 69, 19, 0.04)", marginBottom: "2rem" }}>
            <h2>Ways to Give</h2>
            <p style={{ color: "var(--color-text-muted)", marginBottom: "1.5rem" }}>Support the mission of Mt. Zion Missionary Baptist Church.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem", marginTop: "2rem" }}>
              {methods.map((m) => (
                <div key={m._id} style={{ background: "var(--color-background)", padding: "2rem", borderRadius: "8px", textAlign: "center" }}>
                  <HandCoins size={32} style={{ color: "var(--color-secondary)", marginBottom: "0.75rem" }} />
                  <h3 style={{ marginBottom: "0.5rem" }}>{m.title}</h3>
                  {m.details && <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem", marginBottom: "0.5rem" }}>{m.details}</p>}
                  {m.benefit && <p style={{ fontSize: "0.85rem", fontStyle: "italic", color: "var(--color-secondary)" }}>{m.benefit}</p>}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ background: "#fff", borderRadius: "12px", padding: "3rem", boxShadow: "0 4px 16px rgba(139, 69, 19, 0.04)", marginBottom: "2rem", textAlign: "center" }}>
            <HandCoins size={48} style={{ color: "var(--color-secondary)", marginBottom: "1rem" }} />
            <h2>Ways to Give</h2>
            <p style={{ color: "var(--color-text-muted)" }}>Giving information is being prepared.</p>
          </div>
        )}

        <div style={{ background: "var(--color-background)", borderRadius: "12px", padding: "3rem", textAlign: "center" }}>
          <h2>Why We Give</h2>
          <p style={{ color: "var(--color-text-muted)", maxWidth: "600px", margin: "1rem auto 0", lineHeight: 1.8 }}>
            &ldquo;Bring the whole tithe into the storehouse, that there may be food in my house.&rdquo; — Malachi 3:10
          </p>
          <p style={{ color: "var(--color-text-muted)", maxWidth: "600px", margin: "1rem auto 0", lineHeight: 1.8 }}>
            Your generous giving supports our community outreach, youth programs, worship ministry, and the maintenance of our church facility. Every dollar is used to further the Kingdom.
          </p>
        </div>
      </main>
    </>
  );
}