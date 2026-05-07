import type { Metadata } from "next";
import { profile } from "@/config/profile";
import { ScrollReveal, TextReveal } from "@/components/layout/ScrollReveal";

export const metadata: Metadata = {
  title: "Resume",
  description: "Download or view my resume.",
};

export default function ResumePage() {
  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "8rem 1.5rem 6rem", minHeight: "100vh" }}>
      <div style={{ marginBottom: "5rem" }}>
        <ScrollReveal duration={1}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--fg-muted)", textTransform: "uppercase", letterSpacing: "0.15em", display: "block", marginBottom: "1.5rem" }}>
            05 &mdash; Resume
          </span>
        </ScrollReveal>

        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 8vw, 6rem)", fontWeight: 400, color: "var(--fg)", letterSpacing: "-0.02em", lineHeight: 1, marginBottom: "2rem" }}>
          <TextReveal text="Context matters." delay={100} />
        </h1>

        <ScrollReveal delay={300} duration={1}>
          <p style={{ fontSize: "1.2rem", color: "var(--fg-secondary)", lineHeight: 1.6, marginBottom: "0.5rem", maxWidth: "600px", fontWeight: 300 }}>
            I maintain different variants depending on the role. Pick the version that best fits your context.
          </p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--fg-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Last updated &mdash; {profile.resumeLastUpdated}
          </p>
        </ScrollReveal>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "5rem" }}>
        {profile.resumeVariants.map((v, i) => (
          <ScrollReveal key={v.filename} delay={i * 100}>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "baseline", paddingBottom: "2rem", borderBottom: "1px solid var(--border-subtle)", gap: "2rem" }}>
              <div style={{ maxWidth: "500px" }}>
                <h3 style={{ fontSize: "1.5rem", fontWeight: 400, color: "var(--fg)", fontFamily: "var(--font-display)", marginBottom: "0.5rem" }}>{v.label}</h3>
                <p style={{ fontSize: "1rem", color: "var(--fg-secondary)", lineHeight: 1.6, fontWeight: 300 }}>{v.description}</p>
              </div>
              <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
                <a href={`/resumes/${v.filename}`} target="_blank" rel="noopener noreferrer" className="hover-underline-link" style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--fg)", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.05em" }}>View</a>
                <a href={`/resumes/${v.filename}`} download className="hover-underline-link" style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--fg-muted)", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.05em" }}>Download</a>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={300}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", paddingTop: "2rem", borderTop: "1px solid var(--border-subtle)", gap: "3rem" }}>
          <div>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--fg-muted)", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: "1rem" }}>Open To</span>
            <p style={{ fontSize: "1rem", color: "var(--fg-secondary)", fontWeight: 300 }}>{profile.openTo.join("  \u2014  ")}</p>
          </div>
          <div>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--fg-muted)", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: "1rem" }}>Contact</span>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              <a href={`mailto:${profile.email}`} style={{ fontSize: "1rem", color: "var(--fg)", textDecoration: "none", fontWeight: 300 }}>Email</a>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" style={{ fontSize: "1rem", color: "var(--fg)", textDecoration: "none", fontWeight: 300 }}>GitHub</a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" style={{ fontSize: "1rem", color: "var(--fg)", textDecoration: "none", fontWeight: 300 }}>LinkedIn</a>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
