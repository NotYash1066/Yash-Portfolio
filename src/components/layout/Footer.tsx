import Link from "next/link";
import { profile } from "@/config/profile";

export function Footer() {
  return (
    <footer className="site-footer">
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Masthead row */}
        <div className="footer-masthead">
          <div>
            <p style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              color: "var(--fg)",
              marginBottom: "0.5rem",
              lineHeight: 1,
            }}>
              {profile.name.split(" ")[0].toLowerCase()}_archive
            </p>
            <p style={{ fontSize: "0.825rem", color: "var(--fg-muted)", maxWidth: "360px", lineHeight: 1.6 }}>
              {profile.footerLine}
            </p>
          </div>

          <div style={{ display: "flex", gap: "3rem", flexWrap: "wrap" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--fg-muted)", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "0.25rem" }}>
                Navigate
              </span>
              {[
                { href: "/work", label: "Work" },
                { href: "/field-notes", label: "Writing" },
                { href: "/crash-reports", label: "Lessons" },
                { href: "/now", label: "Now" },
                { href: "/about", label: "About" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="underline-draw" style={{ fontSize: "0.825rem", color: "var(--fg-secondary)", textDecoration: "none", fontFamily: "var(--font-mono)", fontWeight: 600 }}>
                  {link.label}
                </Link>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--fg-muted)", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "0.25rem" }}>
                Connect
              </span>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="underline-draw" style={{ fontSize: "0.825rem", color: "var(--fg-secondary)", textDecoration: "none", fontFamily: "var(--font-mono)", fontWeight: 600 }}>GitHub ↗</a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="underline-draw" style={{ fontSize: "0.825rem", color: "var(--fg-secondary)", textDecoration: "none", fontFamily: "var(--font-mono)", fontWeight: 600 }}>LinkedIn ↗</a>
              <a href={`mailto:${profile.email}`} className="underline-draw" style={{ fontSize: "0.825rem", color: "var(--fg-secondary)", textDecoration: "none", fontFamily: "var(--font-mono)", fontWeight: 600 }}>Email</a>
              <Link href="/resume" className="underline-draw" style={{ fontSize: "0.825rem", color: "var(--fg-secondary)", textDecoration: "none", fontFamily: "var(--font-mono)", fontWeight: 600 }}>Resume</Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid var(--border)",
          padding: "1.25rem 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--fg-muted)", fontWeight: 700 }}>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--fg-muted)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Built with Next.js · TypeScript · Deployed on Vercel
          </p>
        </div>
      </div>
    </footer>
  );
}
