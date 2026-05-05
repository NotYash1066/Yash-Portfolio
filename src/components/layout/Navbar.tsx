"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "@/components/navigation/ThemeToggle";
import { profile } from "@/config/profile";

const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/field-notes", label: "Writing" },
  { href: "/crash-reports", label: "Lessons" },
  { href: "/now", label: "Now" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  return (
    <header className="masthead">
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Meta bar */}
        <div className="masthead-meta">
          <span>{today}</span>
          <span className="desktop-only">{profile.university} · {profile.location}</span>
          <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <span className="live-dot" />
            Open to Internships
          </span>
        </div>

        {/* Main masthead row */}
        <div className="masthead-main">
          <Link href="/" className="masthead-title glitch">
            {profile.name.split(" ")[0].toLowerCase()}_archive
          </Link>

          {/* Desktop nav */}
          <nav className="masthead-nav" aria-label="Main navigation">
            {navLinks.map((link) => {
              const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`masthead-nav-link${isActive ? " active" : ""}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <button
              onClick={() => document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }))}
              className="desktop-only"
              style={{
                display: "flex", alignItems: "center", gap: "0.4rem",
                padding: "0.375rem 0.75rem",
                border: "1px solid var(--border)", background: "transparent",
                color: "var(--fg-muted)", fontSize: "0.7rem", cursor: "pointer",
                fontFamily: "var(--font-mono)", fontWeight: 700,
              }}
              aria-label="Open command palette"
            >
              ⌘K
            </button>

            <ThemeToggle />

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="mobile-menu-btn"
              aria-label="Toggle menu"
              style={{
                display: "none", alignItems: "center", justifyContent: "center",
                width: "36px", height: "36px",
                border: "2px solid var(--border)", background: "transparent",
                color: "var(--fg)", cursor: "pointer",
              }}
            >
              {mobileOpen ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4l8 8M12 4l-8 8" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 4h12M2 8h12M2 12h12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav
          className="masthead-nav open"
          aria-label="Mobile navigation"
          style={{ padding: "0 1.5rem" }}
        >
          {navLinks.map((link) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`masthead-nav-link${isActive ? " active" : ""}`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/resume"
            className="masthead-nav-link"
            onClick={() => setMobileOpen(false)}
            style={{ color: "var(--accent)" }}
          >
            Resume ↗
          </Link>
        </nav>
      )}
    </header>
  );
}
