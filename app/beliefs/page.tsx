import { sanityFetch } from "@/sanity/lib/live";
import { BookOpen, Cross } from "lucide-react";

type Belief = {
  _id: string;
  title: string;
  background?: string;
  theTrinity?: string;
  theBible?: string;
  salvation?: string;
  theChurch?: string;
  futureHope?: string;
  prayerWorship?: string;
};

async function getBeliefs() {
  const { data } = await sanityFetch({
    query: `*[_type == "belief"] | order(_createdAt asc) {
      _id, title, background, theTrinity, theBible, salvation, theChurch, futureHope, prayerWorship
    }`,
  });
  return (data as Belief[]) ?? [];
}

export default async function BeliefsPage() {
  const beliefs = await getBeliefs();
  const belief = beliefs[0];

  if (!belief) {
    return (
      <>
        <header className="page-header text-center" style={{ backgroundColor: "var(--color-primary)", color: "white", padding: "4rem 0", marginBottom: "2rem" }}>
          <div className="container">
            <h1 className="text-center" style={{ color: "white", marginBottom: "0.5rem" }}>What We Believe</h1>
          </div>
        </header>
        <main className="container section" style={{ textAlign: "center", padding: "4rem 0", color: "var(--color-text-muted)" }}>
          <BookOpen size={48} style={{ marginBottom: "1rem", opacity: 0.4 }} />
          <h3>Beliefs Coming Soon</h3>
          <p>Our statement of faith is being prepared.</p>
        </main>
      </>
    );
  }

  const sections = [
    { title: "The Trinity", content: belief.theTrinity, icon: "1" },
    { title: "The Bible", content: belief.theBible, icon: "2" },
    { title: "Salvation", content: belief.salvation, icon: "3" },
    { title: "The Church", content: belief.theChurch, icon: "4" },
    { title: "Future Hope", content: belief.futureHope, icon: "5" },
    { title: "Prayer & Worship", content: belief.prayerWorship, icon: "6" },
  ].filter((s) => s.content);

  return (
    <>
      <header className="page-header text-center" style={{ backgroundColor: "var(--color-primary)", color: "white", padding: "4rem 0", marginBottom: "2rem" }}>
        <div className="container">
          <h1 className="text-center" style={{ color: "white", marginBottom: "0.5rem" }}>What We Believe</h1>
          <p style={{ fontSize: "1.5rem", fontFamily: "var(--font-merriweather)", fontStyle: "italic", opacity: 0.9 }}>
            &ldquo;Our faith is rooted in Scripture.&rdquo;
          </p>
        </div>
      </header>

      <main className="container section">
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <article style={{ background: "#fff", padding: "3rem", borderRadius: "12px", boxShadow: "0 4px 16px rgba(139, 69, 19, 0.04)", marginBottom: "2rem" }}>
            <h2>{belief.title}</h2>
            {belief.background && <p style={{ color: "var(--color-text-muted)", lineHeight: 1.8, marginBottom: "2rem" }}>{belief.background}</p>}
          </article>

          {sections.map((section) => (
            <article key={section.title} style={{ background: "#fff", padding: "2rem", borderRadius: "12px", boxShadow: "0 4px 16px rgba(139, 69, 19, 0.04)", marginBottom: "1.5rem", display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: "var(--color-secondary)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, flexShrink: 0 }}>
                <Cross size={20} />
              </div>
              <div>
                <h3 style={{ marginBottom: "0.5rem" }}>{section.title}</h3>
                <p style={{ color: "var(--color-text-muted)", lineHeight: 1.8 }}>{section.content}</p>
              </div>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}