"use client";

import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);

  const validate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name")?.toString().trim() ?? "";
    const email = formData.get("email")?.toString().trim() ?? "";
    const subject = formData.get("subject")?.toString().trim() ?? "";
    const message = formData.get("message")?.toString().trim() ?? "";

    const newErrors: Record<string, string> = {};
    if (!name) newErrors.name = "Please enter your name.";
    if (!email) newErrors.email = "Please enter your email.";
    else if (!email.includes("@")) newErrors.email = "Please enter a valid email address.";
    if (!message) newErrors.message = "Please enter your message.";

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
        body: JSON.stringify({ type: "contact", name, email, subject, message }),
      });
      if (res.ok) setSubmitted(true);
      else alert("Failed to send. Please try again later.");
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* Service Times Banner (visible on all sub-pages) */}
      <section style={{ backgroundColor: "var(--color-surface)", borderBottom: "1px solid var(--color-border)", padding: "1rem 0" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem", display: "flex", justifyContent: "center", gap: "3rem", flexWrap: "wrap", textAlign: "center" }}>
          <div>
            <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Sunday Worship</p>
            <p style={{ fontWeight: 700, fontSize: "1.25rem", color: "var(--color-primary)" }}>11:00 AM</p>
          </div>
          <div>
            <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Sunday School</p>
            <p style={{ fontWeight: 700, fontSize: "1.25rem", color: "var(--color-primary)" }}>9:30 AM</p>
          </div>
          <div>
            <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Bible Study</p>
            <p style={{ fontWeight: 700, fontSize: "1.25rem", color: "var(--color-primary)" }}>Wed 7:00 PM</p>
          </div>
        </div>
      </section>

      <header className="page-header text-center" style={{ backgroundColor: "var(--color-primary)", color: "white", padding: "4rem 0", marginBottom: "2rem" }}>
        <div className="container">
          <h1 className="text-center" style={{ color: "white", marginBottom: "0.5rem", fontSize: "3rem", fontWeight: 800, letterSpacing: "-0.03em" }}>Contact Us</h1>
          <p style={{ fontSize: "1.5rem", fontFamily: "var(--font-inter)", fontStyle: "italic", opacity: 0.9 }}>
            "We'd love to hear from you."
          </p>
        </div>
      </header>

      <main className="container section">
        <div className="grid-2" style={{ gap: "1.5rem", marginTop: "3rem" }}>
          <section>
            <h2>Get in Touch</h2>
            <p style={{ marginBottom: "2rem", color: "var(--color-text-muted)" }}>Have questions or need prayer? Reach out to us or visit us this Sunday.</p>
            <div style={{ fontSize: "1.1rem", marginBottom: "2rem" }}>
              <p style={{ marginBottom: "1.5rem" }}><strong>Address:</strong><br />Mt. Zion Missionary Baptist Church<br />12741 E Rd<br />Burt, MI 48417</p>
              <p style={{ marginBottom: "1.5rem" }}><strong>Phone:</strong><br />(989) 770-4630</p>
              <p><strong>Email:</strong><br />info@mtzionburt.org</p>
            </div>
            <div style={{ width: "100%", height: "300px", backgroundColor: "var(--color-background)", borderRadius: "8px", border: "1px solid var(--color-border)", overflow: "hidden" }}>
              <iframe
                src="https://maps.google.com/maps?q=12741+E+Rd,+Burt,+MI+48417&z=14&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mt. Zion Missionary Baptist Church - 12741 E Rd, Burt, MI 48417"
              />
            </div>
          </section>

          <section>
            <h2>Send a Message</h2>
            {submitted ? (
              <div role="alert" style={{ background: "#f0fdf4", border: "2px solid #86efac", padding: "2rem", borderRadius: "12px" }}>
                <h3 style={{ color: "#166534", marginBottom: "0.5rem" }}>Thank you!</h3>
                <p>We have received your message and will respond shortly.</p>
              </div>
            ) : (
              <form onSubmit={validate} noValidate>
                <div style={{ marginBottom: "1.5rem" }}>
                  <label htmlFor="name" style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Name</label>
                  <input type="text" id="name" name="name" required aria-describedby={errors.name ? "name-error" : undefined} style={{ width: "100%", padding: "0.8rem", border: errors.name ? "2px solid #ef4444" : "1px solid #ccc", borderRadius: "4px", fontFamily: "inherit" }} />
                  {errors.name && <p id="name-error" role="alert" style={{ color: "#ef4444", fontSize: "0.85rem", marginTop: "0.25rem" }}>{errors.name}</p>}
                </div>
                <div style={{ marginBottom: "1.5rem" }}>
                  <label htmlFor="email" style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Email</label>
                  <input type="email" id="email" name="email" required aria-describedby={errors.email ? "email-error" : undefined} style={{ width: "100%", padding: "0.8rem", border: errors.email ? "2px solid #ef4444" : "1px solid #ccc", borderRadius: "4px", fontFamily: "inherit" }} />
                  {errors.email && <p id="email-error" role="alert" style={{ color: "#ef4444", fontSize: "0.85rem", marginTop: "0.25rem" }}>{errors.email}</p>}
                </div>
                <div style={{ marginBottom: "1.5rem" }}>
                  <label htmlFor="subject" style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Subject</label>
                  <select id="subject" name="subject" style={{ width: "100%", padding: "0.8rem", border: "1px solid #ccc", borderRadius: "4px", fontFamily: "inherit" }}>
                    <option>General Inquiry</option>
                    <option>Prayer Request</option>
                    <option>Pastoral Care</option>
                    <option>Other</option>
                  </select>
                </div>
                <div style={{ marginBottom: "1.5rem" }}>
                  <label htmlFor="message" style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>Message</label>
                  <textarea id="message" name="message" rows={5} required aria-describedby={errors.message ? "message-error" : undefined} style={{ width: "100%", padding: "0.8rem", border: errors.message ? "2px solid #ef4444" : "1px solid #ccc", borderRadius: "4px", fontFamily: "inherit" }} />
                  {errors.message && <p id="message-error" role="alert" style={{ color: "#ef4444", fontSize: "0.85rem", marginTop: "0.25rem" }}>{errors.message}</p>}
                </div>
                <button type="submit" className="btn btn-primary" disabled={sending} style={{ opacity: sending ? 0.7 : 1 }}>
                {sending ? "Sending..." : "Send Message"}</button>
              </form>
            )}
          </section>
        </div>
      </main>
    </>
  );
}