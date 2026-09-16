import { sanityFetch } from "@/sanity/lib/live";
import InteractiveCard from "@/components/InteractiveCard";
import { HeartHandshake } from "lucide-react";

type Ministry = {
  _id: string;
  title: string;
  description?: string;
  meetingTime?: string;
  howToJoin?: string;
};

async function getMinistries() {
  const { data } = await sanityFetch({
    query: `*[_type == "ministry"] | order(order asc) {
      _id, title, description, meetingTime, howToJoin
    }`,
  });
  return (data as Ministry[]) ?? [];
}

export default async function MinistriesPage() {
  const ministries = await getMinistries();

  return (
    <>
      <header className="page-header text-center" style={{ backgroundColor: "var(--color-primary)", color: "white", padding: "4rem 0", marginBottom: "2rem" }}>
        <div className="container">
          <h1 className="text-center" style={{ color: "white", marginBottom: "0.5rem" }}>Our Ministries</h1>
          <p style={{ fontSize: "1.5rem", fontFamily: "var(--font-merriweather)", fontStyle: "italic", opacity: 0.9 }}>
            &ldquo;We are called to serve in many capacities.&rdquo;
          </p>
        </div>
      </header>

      <main className="container section">
        {ministries.length > 0 ? (
          <>
            <div className="text-center" style={{ maxWidth: "800px", margin: "0 auto 3rem" }}>
              <p className="lead-text">At Mt. Zion, we believe every member is gifted for a purpose. Our ministries are designed to connect you with your community, grow your faith, and serve others.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
              {ministries.map((m) => (
                <InteractiveCard
                key={m._id}
                style={{ background: "#fff", borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 16px rgba(139, 69, 19, 0.04)" }}
              >
                  <div style={{ backgroundColor: "var(--color-primary)", height: "120px", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "2.5rem" }}>
                    <HeartHandshake size={48} />
                  </div>
                  <div style={{ padding: "1.5rem" }}>
                    <h3>{m.title}</h3>
                    {m.description && <p style={{ color: "var(--color-text-muted)" }}><strong>Purpose:</strong> {m.description}</p>}
                    {m.meetingTime && <p style={{ marginTop: "0.5rem" }}><strong>Meeting Times:</strong> {m.meetingTime}</p>}
                    {m.howToJoin && <p style={{ marginTop: "0.5rem" }}><strong>How to Join:</strong> {m.howToJoin}</p>}
                  </div>
                </InteractiveCard>
              ))}
            </div>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--color-text-muted)" }}>
            <HeartHandshake size={48} style={{ marginBottom: "1rem", opacity: 0.4 }} />
            <h3>Ministries Coming Soon</h3>
            <p>Check back soon for information about our ministries.</p>
          </div>
        )}
      </main>
    </>
  );
}