import Link from "next/link";
import { profile } from "@/config/profile";

export function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "3rem 1.5rem",
        marginTop: "6rem",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        {/* Top row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "2rem",
          }}
        >
          {/* Left */}
          <div style={{ maxWidth: "400px" }}>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.8rem",
                color: "var(--fg)",
                marginBottom: "0.5rem",
                fontWeight: 500,
              }}
            >
              {profile.name}
            </p>
            <p
              style={{
                fontSize: "0.825rem",
                color: "var(--fg-secondary)",
                lineHeight: 1.6,
              }}
            >
              {profile.footerLine}
            </p>
          </div>

          {/* Right - Links */}
          <div
            style={{
              display: "flex",
              gap: "3rem",
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  color: "var(--fg-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  fontWeight: 600,
                }}
              >
                Navigate
              </span>
              {[
                { href: "/work", label: "Work" },
                { href: "/field-notes", label: "Field Notes" },
                { href: "/crash-reports", label: "Crash Reports" },
                { href: "/now", label: "Now" },
                { href: "/about", label: "About" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontSize: "0.825rem",
                    color: "var(--fg-secondary)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  color: "var(--fg-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  fontWeight: 600,
                }}
              >
                Connect
              </span>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: "0.825rem", color: "var(--fg-secondary)", textDecoration: "none" }}
              >
                GitHub ↗
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: "0.825rem", color: "var(--fg-secondary)", textDecoration: "none" }}
              >
                LinkedIn ↗
              </a>
              <a
                href={`mailto:${profile.email}`}
                style={{ fontSize: "0.825rem", color: "var(--fg-secondary)", textDecoration: "none" }}
              >
                Email
              </a>
              <Link
                href="/resume"
                style={{ fontSize: "0.825rem", color: "var(--fg-secondary)", textDecoration: "none" }}
              >
                Resume
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          style={{
            borderTop: "1px solid var(--border)",
            paddingTop: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              color: "var(--fg-muted)",
            }}
          >
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              color: "var(--fg-muted)",
            }}
          >
            Living Engineering Archive
          </p>
        </div>
      </div>
    </footer>
  );
}
