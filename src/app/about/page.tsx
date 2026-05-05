import type { Metadata } from "next";
import Link from "next/link";
import { profile } from "@/config/profile";

export const metadata: Metadata = {
  title: "About",
  description: "Who I am, how I work, what I care about, and what I'm learning the hard way.",
};

export default function AboutPage() {
  return (
    <div
      style={{
        maxWidth: "750px",
        margin: "0 auto",
        padding: "4rem 1.5rem",
        minHeight: "80vh",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "3rem" }}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            color: "var(--accent)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            fontWeight: 600,
            display: "block",
            marginBottom: "0.75rem",
          }}
        >
          About
        </span>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 400,
            color: "var(--fg)",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: "1.5rem",
          }}
        >
          {profile.name}
        </h1>
        <p
          style={{
            fontSize: "1.1rem",
            color: "var(--fg-secondary)",
            lineHeight: 1.7,
            marginBottom: "0.5rem",
          }}
        >
          {profile.role} at {profile.university}, {profile.location}.
        </p>
        <p
          style={{
            fontSize: "0.95rem",
            color: "var(--fg-secondary)",
            lineHeight: 1.7,
          }}
        >
          CGPA: {profile.cgpa} · Graduating {profile.graduationYear}
        </p>
      </div>

      {/* Intro */}
      <section style={{ marginBottom: "3rem" }}>
        <p
          style={{
            fontSize: "1rem",
            color: "var(--fg-secondary)",
            lineHeight: 1.8,
            marginBottom: "1rem",
          }}
        >
          I like building things that expose what I don&apos;t understand yet. Most of my projects start with a question I can&apos;t answer, and end with a system that forces me to learn the answer by building it.
        </p>
        <p
          style={{
            fontSize: "1rem",
            color: "var(--fg-secondary)",
            lineHeight: 1.8,
          }}
        >
          I write field notes to document the messy middle of learning — the bugs, the failed assumptions, the things that clicked on the third try. This portfolio is that documentation system.
        </p>
      </section>

      {/* What I care about */}
      <section style={{ marginBottom: "3rem" }}>
        <SectionLabel>What I care about</SectionLabel>
        <p
          style={{
            fontSize: "0.95rem",
            color: "var(--fg-secondary)",
            lineHeight: 1.8,
          }}
        >
          Building systems that work, not just demos that impress. Writing code that the next person can read. Shipping things before they&apos;re perfect. Documenting the process while the confusion is still fresh. Finishing what I start.
        </p>
      </section>

      {/* Beliefs */}
      <section style={{ marginBottom: "3rem" }}>
        <SectionLabel>Beliefs</SectionLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {profile.beliefs.map((belief) => (
            <p
              key={belief}
              style={{
                fontSize: "0.95rem",
                color: "var(--fg-secondary)",
                lineHeight: 1.6,
                paddingLeft: "1rem",
                borderLeft: "2px solid var(--border)",
              }}
            >
              {belief}
            </p>
          ))}
        </div>
      </section>

      {/* Operating Principles */}
      <section style={{ marginBottom: "3rem" }}>
        <SectionLabel>Operating Principles</SectionLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {profile.operatingPrinciples.map((principle, i) => (
            <div
              key={principle}
              style={{
                display: "flex",
                gap: "0.75rem",
                alignItems: "baseline",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  color: "var(--fg-muted)",
                  minWidth: "1.5rem",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "var(--fg-secondary)",
                  lineHeight: 1.6,
                }}
              >
                {principle}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Tools */}
      <section style={{ marginBottom: "3rem" }}>
        <SectionLabel>Tools I reach for when the problem gets real</SectionLabel>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          {profile.favoriteTools.map((tool) => (
            <span
              key={tool}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                padding: "0.375rem 0.75rem",
                borderRadius: "4px",
                border: "1px solid var(--border)",
                color: "var(--fg-secondary)",
                background: "var(--surface)",
              }}
            >
              {tool}
            </span>
          ))}
        </div>
      </section>

      {/* Languages */}
      <section style={{ marginBottom: "3rem" }}>
        <SectionLabel>Languages</SectionLabel>
        <p
          style={{
            fontSize: "0.9rem",
            color: "var(--fg-secondary)",
            fontFamily: "var(--font-mono)",
          }}
        >
          {profile.languages.join(" · ")}
        </p>
      </section>

      {/* CTAs */}
      <section
        style={{
          borderTop: "1px solid var(--border)",
          paddingTop: "2rem",
          display: "flex",
          gap: "1.5rem",
          flexWrap: "wrap",
        }}
      >
        <Link
          href="/resume"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.75rem 1.5rem",
            background: "var(--fg)",
            color: "var(--bg)",
            borderRadius: "6px",
            fontSize: "0.875rem",
            fontWeight: 500,
            textDecoration: "none",
          }}
        >
          View Resume
        </Link>
        <Link
          href="/contact"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.75rem 1.5rem",
            border: "1px solid var(--border)",
            color: "var(--fg-secondary)",
            borderRadius: "6px",
            fontSize: "0.875rem",
            fontWeight: 500,
            textDecoration: "none",
          }}
        >
          Get in touch
        </Link>
      </section>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.7rem",
        color: "var(--accent)",
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        fontWeight: 600,
        marginBottom: "1rem",
        paddingBottom: "0.5rem",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {children}
    </h2>
  );
}
