"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "@/components/navigation/ThemeToggle";
import { profile } from "@/config/profile";

const navLinks = [
  { href: "/", label: "Index" },
  { href: "/work", label: "Work" },
  { href: "/field-notes", label: "Field Notes" },
  { href: "/crash-reports", label: "Crash Reports" },
  { href: "/now", label: "Now" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          borderBottom: "1px solid var(--border)",
          background: "var(--bg)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "60px",
          }}
        >
          {/* Logo / Name */}
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
              color: "var(--fg)",
              textDecoration: "none",
              fontWeight: 500,
              letterSpacing: "0.02em",
            }}
          >
            {profile.name.split(" ")[0].toLowerCase()}_
          </Link>

          {/* Desktop Nav */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2rem",
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontSize: "0.825rem",
                    color: isActive ? "var(--fg)" : "var(--fg-secondary)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                    fontWeight: isActive ? 500 : 400,
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right section */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            {/* Cmd+K hint */}
            <button
              onClick={() =>
                document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }))
              }
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.375rem 0.75rem",
                borderRadius: "6px",
                border: "1px solid var(--border)",
                background: "transparent",
                color: "var(--fg-muted)",
                fontSize: "0.75rem",
                cursor: "pointer",
                fontFamily: "var(--font-mono)",
              }}
              className="cmd-k-hint"
              aria-label="Open command palette"
            >
              <span>⌘K</span>
            </button>

            <ThemeToggle />

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="mobile-menu-btn"
              aria-label="Toggle navigation menu"
              style={{
                display: "none",
                alignItems: "center",
                justifyContent: "center",
                width: "36px",
                height: "36px",
                borderRadius: "6px",
                border: "1px solid var(--border)",
                background: "transparent",
                color: "var(--fg-secondary)",
                cursor: "pointer",
              }}
            >
              {mobileOpen ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 4l8 8M12 4l-8 8" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 4h12M2 8h12M2 12h12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            top: "60px",
            zIndex: 40,
            background: "var(--bg)",
            padding: "2rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  fontSize: "1.25rem",
                  color: isActive ? "var(--fg)" : "var(--fg-secondary)",
                  textDecoration: "none",
                  fontWeight: isActive ? 500 : 400,
                  paddingBottom: "1rem",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/resume"
            onClick={() => setMobileOpen(false)}
            style={{
              fontSize: "1.25rem",
              color: "var(--accent)",
              textDecoration: "none",
            }}
          >
            Resume ↗
          </Link>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
          .cmd-k-hint {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
