import type { Metadata } from "next";
import Link from "next/link";
import { profile } from "@/config/profile";

export const metadata: Metadata = {
  title: "Resume",
  description: "Download or view my resume.",
};

export default function ResumePage() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "4rem 1.5rem", minHeight: "80vh" }}>
      <div style={{ marginBottom: "3rem" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, display: "block", marginBottom: "0.75rem" }}>Resume</span>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400, color: "var(--fg)", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "1rem" }}>Pick the version that fits your context</h1>
        <p style={{ fontSize: "0.95rem", color: "var(--fg-secondary)", lineHeight: 1.7, marginBottom: "0.5rem" }}>I maintain different resume variants depending on the role. Each highlights different aspects of the same work.</p>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--fg-muted)" }}>Last updated: {profile.resumeLastUpdated}</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))", gap: "1.25rem", marginBottom: "3rem" }}>
        {profile.resumeVariants.map((v) => (
          <div key={v.filename} style={{ padding: "1.5rem", border: "1px solid var(--border)", borderRadius: "6px", background: "var(--surface)", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--fg)", marginBottom: "0.375rem" }}>{v.label}</h3>
              <p style={{ fontSize: "0.825rem", color: "var(--fg-secondary)", lineHeight: 1.5 }}>{v.description}</p>
            </div>
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "auto" }}>
              <a href={`/resumes/${v.filename}`} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--accent)", textDecoration: "none" }}>View ↗</a>
              <a href={`/resumes/${v.filename}`} download style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--fg-secondary)", textDecoration: "none" }}>Download ↓</a>
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: "1.5rem", border: "1px solid var(--border)", borderRadius: "6px", background: "var(--surface)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1.25rem" }}>
          <div>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--fg-muted)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "0.25rem" }}>Open To</span>
            <p style={{ fontSize: "0.85rem", color: "var(--fg-secondary)" }}>{profile.openTo.join(", ")}</p>
          </div>
          <div>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--fg-muted)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "0.25rem" }}>Contact</span>
            <div style={{ display: "flex", gap: "1rem" }}>
              <a href={`mailto:${profile.email}`} style={{ fontSize: "0.85rem", color: "var(--accent)", textDecoration: "none" }}>Email</a>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.85rem", color: "var(--accent)", textDecoration: "none" }}>GitHub ↗</a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.85rem", color: "var(--accent)", textDecoration: "none" }}>LinkedIn ↗</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
