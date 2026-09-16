import { sanityFetch } from "@/sanity/lib/live";
import InteractiveCard from "@/components/InteractiveCard";
import { Users } from "lucide-react";
import Link from "next/link";

type Leader = {
  _id: string;
  name: string;
  role?: string;
  title?: string;
  bio?: string;
};

async function getLeaders() {
  const { data } = await sanityFetch({
    query: `*[_type == "leader"] | order(order asc) {
      _id, name, role, title, bio
    }`,
  });
  return (data as Leader[]) ?? [];
}

export default async function LeadershipPage() {
  const leaders = await getLeaders();

  return (
    <>
      <header className="page-header text-center" style={{ backgroundColor: "var(--color-primary)", color: "white", padding: "4rem 0", marginBottom: "2rem" }}>
        <div className="container">
          <h1 className="text-center" style={{ color: "white", marginBottom: "0.5rem" }}>Leadership</h1>
          <p style={{ fontSize: "1.5rem", fontFamily: "var(--font-merriweather)", fontStyle: "italic", opacity: 0.9 }}>
            &ldquo;Servant leaders for the church.&rdquo;
          </p>
        </div>
      </header>

      <main className="container section">
        {leaders.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
            {leaders.map((leader) => (
              <InteractiveCard
                key={leader._id}
                style={{ background: "#fff", borderRadius: "12px", padding: "2rem", boxShadow: "0 4px 16px rgba(139, 69, 19, 0.04)" }}
              >
                <div style={{ width: 80, height: 80, borderRadius: "50%", background: "var(--color-primary)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "2rem", fontWeight: 700, marginBottom: "1rem" }}>
                  {leader.name.charAt(0)}
                </div>
                <h3>{leader.title ? `${leader.title} ${leader.name}` : leader.name}</h3>
                {leader.role && <p style={{ color: "var(--color-secondary)", fontWeight: 600, fontSize: "0.9rem", marginBottom: "0.75rem" }}>{leader.role}</p>}
                {leader.bio && <p style={{ color: "var(--color-text-muted)", lineHeight: 1.7 }}>{leader.bio}</p>}
              </InteractiveCard>
))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--color-text-muted)" }}>
            <Users size={48} style={{ marginBottom: "1rem", opacity: 0.4 }} />
            <h3>Leadership Coming Soon</h3>
            <p style={{ marginBottom: "1.5rem" }}>Leader profiles will be added here.</p>
            <Link href="/contact" className="btn btn-outline" style={{ borderColor: "var(--color-primary)", color: "var(--color-primary)", padding: "0.85rem 1.75rem", borderRadius: "12px", fontWeight: 600, textDecoration: "none", display: "inline-block" }}>Contact Leadership</Link>
          </div>
        )}
      </main>
    </>
  );
}