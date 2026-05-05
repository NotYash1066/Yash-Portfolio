import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "8rem 1.5rem", minHeight: "60vh", textAlign: "center" }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, display: "block", marginBottom: "1.5rem" }}>404</span>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400, color: "var(--fg)", letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: "1rem" }}>Signal lost</h1>
      <p style={{ fontSize: "1rem", color: "var(--fg-secondary)", lineHeight: 1.7, marginBottom: "2.5rem" }}>
        This page either moved, broke, or never shipped.
      </p>
      <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.5rem", background: "var(--fg)", color: "var(--bg)", borderRadius: "6px", fontSize: "0.875rem", fontWeight: 500, textDecoration: "none" }}>
        Return to Index
      </Link>
    </div>
  );
}
