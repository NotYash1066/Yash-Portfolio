import type { Metadata } from "next";
import { profile } from "@/config/profile";
import { ScrollReveal, TextReveal } from "@/components/layout/ScrollReveal";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch for internships, roles, or collaboration.",
};

export default function ContactPage() {
  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "8rem 1.5rem 6rem",
        minHeight: "100vh",
      }}
    >
      <div style={{ marginBottom: "5rem" }}>
        <ScrollReveal duration={1}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: "var(--fg-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              display: "block",
              marginBottom: "1.5rem",
            }}
          >
            06 &mdash; Contact
          </span>
        </ScrollReveal>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3rem, 8vw, 6rem)",
            fontWeight: 400,
            color: "var(--fg)",
            letterSpacing: "-0.02em",
            lineHeight: 1,
            marginBottom: "2rem",
          }}
        >
          <TextReveal text="Start a Conversation" delay={100} />
        </h1>

        <ScrollReveal delay={300} duration={1}>
          <p
            style={{
              fontSize: "1.2rem",
              color: "var(--fg-secondary)",
              lineHeight: 1.6,
              maxWidth: "600px",
              fontWeight: 300,
            }}
          >
            I&apos;m currently open to internships, full-time roles, and startup opportunities. 
            If you want to talk about systems, software, or potential collaboration, let&apos;s connect.
          </p>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={400}>
        <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "4rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "4rem" }}>
          <div>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--fg-muted)", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: "1.5rem" }}>Email</span>
            <a href={`mailto:${profile.email}`} className="hover-underline-link" style={{ fontSize: "1.5rem", color: "var(--fg)", textDecoration: "none", fontWeight: 300, display: "inline-block" }}>
              {profile.email}
            </a>
          </div>

          <div>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--fg-muted)", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: "1.5rem" }}>Social</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover-underline-link" style={{ fontSize: "1.25rem", color: "var(--fg)", textDecoration: "none", fontWeight: 300, width: "fit-content" }}>
                LinkedIn
              </a>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover-underline-link" style={{ fontSize: "1.25rem", color: "var(--fg)", textDecoration: "none", fontWeight: 300, width: "fit-content" }}>
                GitHub
              </a>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
