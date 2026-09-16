"use client";

import { useState } from "react";

export default function PrayerPage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const prayerRequest = formData.get("prayerRequest")?.toString().trim() ?? "";
    const name = formData.get("prayerName")?.toString().trim() ?? "";
    const anonymous = formData.get("anonymous") === "on";

    const newErrors: Record<string, string> = {};
    if (!prayerRequest) newErrors.prayerRequest = "Please share your prayer request.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSending(true);

    try {
      const res = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "prayer", name: anonymous ? "" : name, prayerRequest, anonymous }),
      });
      if (res.ok) setSubmitted(true);
      else alert("Failed to submit. Please try again later.");
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* Service Times Banner */}
      <section style={{ backgroundColor: "var(--color-surface)", borderBottom: "1px solid var(--color-border)", padding: "1rem 0" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem", display: "flex", justifyContent: "center", gap: "3rem", flexWrap: "wrap", textAlign: "center" }}>
          <div>
            <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Sunday Worship</p>
            <p style={{ fontWeight: 700, fontSize: "1.25rem", color: "var(--color-primary)" }}>11:00 AM</p>
          </div>
          <div>
            <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Bible Study</p>
            <p style={{ fontWeight: 700, fontSize: "1.25rem", color: "var(--color-primary)" }}>Wed 7:00 PM</p>
          </div>
        </div>
      </section>

      <header className="page-header text-center" style={{ backgroundColor: "var(--color-primary)", color: "white", padding: "4rem 0", marginBottom: "2rem" }}>
        <div className="container">
          <h1 className="text-center" style={{ color: "white", marginBottom: "0.5rem", fontSize: "3rem", fontWeight: 800, letterSpacing: "-0.03em" }}>Prayer Requests</h1>
          <p style={{ fontSize: "1.5rem", fontFamily: "var(--font-inter)", fontStyle: "italic", opacity: 0.9 }}>
            "Let us come boldly before the throne of grace." — Hebrews 4:16
          </p>
        </div>
      </header>

      <main className="container section">
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <div style={{ background: "var(--color-surface)", borderRadius: "12px", padding: "3rem", boxShadow: "var(--shadow-card)" }}>
            <h2>How can we pray for you?</h2>
            <p style={{ color: "var(--color-text-muted)", marginBottom: "1.5rem" }}>
              We take prayer seriously. Please share your request with us and we will pray for you daily.
            </p>

            {submitted ? (
              <div role="alert" style={{ background: "#fdf5e6", padding: "2rem", borderRadius: "12px", border: "2px solid var(--color-accent)", textAlign: "center" }}>
                <p style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--color-primary)", marginBottom: "0.5rem" }}>Thank you!</p>
                <p style={{ color: "var(--color-text-muted)" }}>We have received your prayer request and will be praying for you.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div style={{ marginBottom: "1.5rem" }}>
                  <label htmlFor="prayerName" style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Name (optional)</label>
                  <input type="text" id="prayerName" name="prayerName" style={{ width: "100%", padding: "0.8rem", border: "1px solid #ccc", borderRadius: "4px", fontFamily: "inherit", fontSize: "1rem" }} />
                </div>
                <div style={{ marginBottom: "1.5rem" }}>
                  <label htmlFor="prayerRequest" style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Prayer Request</label>
                  <textarea
                    id="prayerRequest"
                    name="prayerRequest"
                    rows={6}
                    required
                    placeholder="Please share your prayer request..."
                    aria-describedby={errors.prayerRequest ? "prayer-error" : undefined}
                    style={{ width: "100%", padding: "0.8rem", border: errors.prayerRequest ? "2px solid #ef4444" : "1px solid #ccc", borderRadius: "4px", fontFamily: "inherit", fontSize: "1rem", resize: "vertical" }}
                  />
                  {errors.prayerRequest && <p id="prayer-error" role="alert" style={{ color: "#ef4444", fontSize: "0.85rem", marginTop: "0.25rem" }}>{errors.prayerRequest}</p>}
                </div>
                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                    <input type="checkbox" id="anonymous" name="anonymous" style={{ width: "auto" }} />
                    <span style={{ color: "var(--color-text-muted)", fontSize: "0.9rem" }}>Keep this prayer request anonymous</span>
                  </label>
                </div>
                <button type="submit" className="btn btn-primary" disabled={sending} style={{ padding: "0.85rem 2rem", backgroundColor: "var(--color-primary)", color: "white", border: "none", borderRadius: "12px", fontWeight: 600, cursor: "pointer", fontSize: "1rem", opacity: sending ? 0.7 : 1 }}>
                  {sending ? "Submitting..." : "Submit Prayer Request"}
                </button>
              </form>
            )}
          </div>

          <div style={{ marginTop: "2rem", background: "var(--color-surface)", borderRadius: "12px", padding: "2rem", boxShadow: "var(--shadow-card)" }}>
            <h3 style={{ marginBottom: "1rem" }}>Our Promise</h3>
            <p style={{ color: "var(--color-text-muted)", lineHeight: 1.8 }}>
              Every prayer request is received with care and confidentiality. Our prayer team
              gathers weekly to pray over all submitted requests. We believe in the power of
              prayer and that God hears every cry of His people.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}