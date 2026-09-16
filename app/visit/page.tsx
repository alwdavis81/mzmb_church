import { sanityFetch } from "@/sanity/lib/live";
import { MapPin, Baby, Shirt, HelpCircle } from "lucide-react";
import Link from "next/link";

type VisitorPageData = {
  pageTitle?: string;
  introText?: string;
  whatToExpect?: string;
  sundaySchedule?: { time: string; label: string }[];
  parkingInfo?: string;
  kidsInfo?: string;
  dressStyle?: string;
  faqItems?: { question: string; answer: string }[];
};

async function getVisitorPage() {
  const { data } = await sanityFetch({
    query: `*[_type == "visitorPage"][0] {
      pageTitle, introText, whatToExpect,
      "sundaySchedule": sundaySchedule[]{time, label},
      parkingInfo, kidsInfo, dressStyle,
      "faqItems": faqItems[]{question, answer}
    }`,
  });
  return data as VisitorPageData | null;
}

function FAQ({ faq }: { faq: { question: string; answer: string } }) {
  return (
    <details style={{ marginBottom: "1rem", background: "#fff", borderRadius: "12px", padding: "1.5rem", boxShadow: "0 4px 16px rgba(139, 69, 19, 0.04)" }}>
      <summary style={{ cursor: "pointer", fontWeight: 600, fontSize: "1.05rem" }}>{faq.question}</summary>
      <p style={{ marginTop: "0.75rem", color: "var(--color-text-muted)", lineHeight: 1.7 }}>{faq.answer}</p>
    </details>
  );
}

export default async function VisitPage() {
  const visitor = await getVisitorPage();

  return (
    <>
      <header className="page-header text-center" style={{ backgroundColor: "var(--color-primary)", color: "white", padding: "4rem 0", marginBottom: "2rem" }}>
        <div className="container">
          <h1 className="text-center" style={{ color: "white", marginBottom: "0.5rem" }}>Plan a Visit</h1>
          <p style={{ fontSize: "1.5rem", fontFamily: "var(--font-merriweather)", fontStyle: "italic", opacity: 0.9 }}>
            &ldquo;We can&rsquo;t wait to welcome you.&rdquo;
          </p>
        </div>
      </header>

      <main className="container section">
        <div className="text-center" style={{ maxWidth: "800px", margin: "0 auto 3rem" }}>
          <p className="lead-text">{visitor?.introText ?? ""}</p>
        </div>

        {/* What to Expect */}
        <section style={{ marginBottom: "4rem" }}>
          <h2>What to Expect</h2>
          <p>{visitor?.whatToExpect ?? ""}</p>
          <div style={{ background: "#fff", borderRadius: "12px", padding: "2rem", boxShadow: "0 4px 16px rgba(139, 69, 19, 0.04)", marginTop: "1.5rem" }}>
            <h3>Sunday Schedule</h3>
            <ul style={{ listStyle: "disc", paddingLeft: "1.5rem", lineHeight: 2 }}>
              {visitor?.sundaySchedule?.map((item, i) => (
                <li key={i}><strong>{item.time}</strong> — {item.label}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Parking */}
        <section style={{ marginBottom: "4rem" }}>
          <h2><MapPin size={24} style={{ verticalAlign: "middle", marginRight: "0.5rem" }} /> Parking &amp; Accessibility</h2>
          <p>{visitor?.parkingInfo ?? ""}</p>
        </section>

        {/* Kids */}
        <section style={{ marginBottom: "4rem" }}>
          <h2><Baby size={24} style={{ verticalAlign: "middle", marginRight: "0.5rem" }} /> Kids Check-In</h2>
          <p>{visitor?.kidsInfo ?? ""}</p>
          <Link href="/contact" className="link-arrow" style={{ marginTop: "0.75rem", display: "inline-flex" }}>Contact Children's Ministry</Link>
        </section>

        {/* Dress */}
        <section style={{ marginBottom: "4rem" }}>
          <h2><Shirt size={24} style={{ verticalAlign: "middle", marginRight: "0.5rem" }} /> Dress Style</h2>
          <p>{visitor?.dressStyle ?? ""}</p>
        </section>

        {/* FAQ */}
        {visitor?.faqItems && visitor.faqItems.length > 0 && (
          <section>
            <h2><HelpCircle size={24} style={{ verticalAlign: "middle", marginRight: "0.5rem" }} /> FAQ for New Visitors</h2>
            <div style={{ marginTop: "1.5rem" }}>
              {visitor.faqItems.map((faq, i) => (
                <FAQ key={i} faq={faq} />
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}

          