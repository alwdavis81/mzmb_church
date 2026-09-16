import { sanityFetch } from "@/sanity/lib/live";
import InteractiveCard from "@/components/InteractiveCard";
import { CalendarDays, PenLine } from "lucide-react";

type Editorial = {
  _id: string;
  title: string;
  author?: string;
  publishedDate?: string;
  excerpt?: string;
};

async function getEditorials() {
  const { data } = await sanityFetch({
    query: `*[_type == "editorial"] | order(publishedDate desc) {
      _id, title, author, publishedDate, excerpt
    }`,
  });
  return (data as Editorial[]) ?? [];
}

export default async function EditorialPage() {
  const editorials = await getEditorials();

  return (
    <>
      <header className="page-header text-center" style={{ backgroundColor: "var(--color-primary)", color: "white", padding: "4rem 0", marginBottom: "2rem" }}>
        <div className="container">
          <h1 className="text-center" style={{ color: "white", marginBottom: "0.5rem" }}>From the Pastor&rsquo;s Desk</h1>
          <p style={{ fontSize: "1.5rem", fontFamily: "var(--font-merriweather)", fontStyle: "italic", opacity: 0.9 }}>
            &ldquo;Monthly Words of Encouragement &amp; Vision&rdquo;
          </p>
        </div>
      </header>

      <main className="container section">
        {editorials.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem", maxWidth: "800px", margin: "0 auto" }}>
            {editorials.map((article) => (
              <InteractiveCard
                key={article._id}
                style={{ background: "#fff", padding: "2.5rem", borderRadius: "12px", boxShadow: "0 4px 16px rgba(139, 69, 19, 0.04)" }}
              >
                <h2 style={{ marginBottom: "0.5rem" }}>{article.title}</h2>
                {article.author && (
                  <p style={{ color: "var(--color-text-muted)", marginBottom: "0.25rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <PenLine size={14} /> By {article.author}
                  </p>
                )}
                {article.publishedDate && (
                  <p style={{ color: "var(--color-secondary)", fontSize: "0.9rem", fontWeight: 600, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                    <CalendarDays size={14} /> {article.publishedDate}
                  </p>
                )}
                {article.excerpt && <p style={{ color: "var(--color-text-muted)", lineHeight: 1.7 }}>{article.excerpt}</p>}
              </InteractiveCard>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--color-text-muted)" }}>
            <PenLine size={48} style={{ marginBottom: "1rem", opacity: 0.4 }} />
            <h3>No Editorials Yet</h3>
            <p>Check back soon for messages from the Pastor.</p>
          </div>
        )}
      </main>
    </>
  );
}