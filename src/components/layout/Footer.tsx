import Link from "next/link";
import { profile } from "@/config/profile";

export function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border-subtle)",
        background: "var(--bg)",
        padding: "4rem 0",
        marginTop: "auto",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "4rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "2rem",
          }}
        >
          {/* Brand */}
          <div>
            <Link
              href="/"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "2rem",
                color: "var(--fg)",
                textDecoration: "none",
                fontWeight: 400,
                display: "block",
                marginBottom: "1rem",
              }}
            >
              {profile.name}
            </Link>
            <p
              style={{
                color: "var(--fg-secondary)",
                fontSize: "0.9rem",
                maxWidth: "300px",
                lineHeight: 1.6,
              }}
            >
              {profile.heroSubtext}
            </p>
          </div>

          {/* Links */}
          <div style={{ display: "flex", gap: "4rem", flexWrap: "wrap" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  color: "var(--fg-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Navigation
              </span>
              <Link href="/work" style={linkStyle}>Work</Link>
              <Link href="/writing" style={linkStyle}>Writing</Link>
              <Link href="/lessons" style={linkStyle}>Lessons</Link>
              <Link href="/now" style={linkStyle}>Now</Link>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  color: "var(--fg-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Connect
              </span>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" style={linkStyle}>GitHub</a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" style={linkStyle}>LinkedIn</a>
              <a href={`mailto:${profile.email}`} style={linkStyle}>Email</a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "2rem",
            borderTop: "1px solid var(--border-subtle)",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: "var(--fg-muted)",
            }}
          >
            &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: "var(--fg-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Built with Next.js & Framer Motion
          </span>
        </div>
      </div>
    </footer>
  );
}

const linkStyle = {
  color: "var(--fg)",
  textDecoration: "none",
  fontSize: "0.9rem",
  transition: "color 0.2s",
};
