import type { Metadata } from "next";
import Link from "next/link";
import { profile } from "@/config/profile";
import { ScrollReveal } from "@/components/layout/ScrollReveal";

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
        padding: "4rem 1rem",
        minHeight: "80vh",
      }}
    >
      {/* Header */}
      <ScrollReveal>
      <div style={{ marginBottom: "3rem" }}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            color: "var(--accent)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            fontWeight: 700,
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
            fontWeight: 800,
            color: "var(--fg)",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: "1.5rem",
          }}
        >
          {profile.name}
        </h1>
        <p style={{ fontSize: "1.1rem", color: "var(--fg-secondary)", lineHeight: 1.7, marginBottom: "0.5rem" }}>
          {profile.role} at {profile.university}, {profile.location}.
        </p>
        <p style={{ fontSize: "0.95rem", color: "var(--fg-secondary)", lineHeight: 1.7, fontFamily: "var(--font-mono)" }}>
          CGPA: {profile.cgpa} · Graduating {profile.graduationYear}
        </p>
      </div>
      </ScrollReveal>

      {/* Intro */}
      <ScrollReveal delay={50}>
      <section style={{ marginBottom: "3rem" }}>
        <p style={{ fontSize: "1rem", color: "var(--fg-secondary)", lineHeight: 1.8, marginBottom: "1rem" }}>
          I like building things that expose what I don&apos;t understand yet. Most of my projects start with a question I can&apos;t answer, and end with a system that forces me to learn the answer by building it.
        </p>
        <p style={{ fontSize: "1rem", color: "var(--fg-secondary)", lineHeight: 1.8 }}>
          I write to document the messy middle of learning — the bugs, the failed assumptions, the things that clicked on the third try. This portfolio is that documentation system.
        </p>
      </section>
      </ScrollReveal>

      {/* What I care about */}
      <ScrollReveal delay={50}>
      <section style={{ marginBottom: "3rem" }}>
        <SectionLabel>What I care about</SectionLabel>
        <p style={{ fontSize: "0.95rem", color: "var(--fg-secondary)", lineHeight: 1.8 }}>
          Building systems that work, not just demos that impress. Writing code that the next person can read. Shipping things before they&apos;re perfect. Documenting the process while the confusion is still fresh. Finishing what I start.
        </p>
      </section>
      </ScrollReveal>

      {/* Beliefs */}
      <ScrollReveal delay={50}>
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
                borderLeft: "2px solid var(--accent)",
              }}
            >
              {belief}
            </p>
          ))}
        </div>
      </section>
      </ScrollReveal>

      {/* Operating Principles */}
      <ScrollReveal delay={50}>
      <section style={{ marginBottom: "3rem" }}>
        <SectionLabel>Operating Principles</SectionLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {profile.operatingPrinciples.map((principle, i) => (
            <div key={principle} style={{ display: "flex", gap: "0.75rem", alignItems: "baseline" }}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  color: "var(--accent)",
                  minWidth: "1.5rem",
                  fontWeight: 700,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p style={{ fontSize: "0.9rem", color: "var(--fg-secondary)", lineHeight: 1.6 }}>
                {principle}
              </p>
            </div>
          ))}
        </div>
      </section>
      </ScrollReveal>

      {/* Tools */}
      <ScrollReveal delay={50}>
      <section style={{ marginBottom: "3rem" }}>
        <SectionLabel>Tools I reach for when the problem gets real</SectionLabel>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {profile.favoriteTools.map((tool) => (
            <span
              key={tool}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                padding: "0.375rem 0.75rem",
                border: "2px solid var(--border)",
                color: "var(--fg-secondary)",
                background: "var(--surface)",
                fontWeight: 600,
              }}
            >
              {tool}
            </span>
          ))}
        </div>
      </section>
      </ScrollReveal>

      {/* Languages */}
      <ScrollReveal delay={50}>
      <section style={{ marginBottom: "3rem" }}>
        <SectionLabel>Languages</SectionLabel>
        <p style={{ fontSize: "0.9rem", color: "var(--fg-secondary)", fontFamily: "var(--font-mono)", fontWeight: 600 }}>
          {profile.languages.join(" · ")}
        </p>
      </section>
      </ScrollReveal>

      {/* CTAs */}
      <ScrollReveal delay={50}>
      <section
        style={{
          borderTop: "2px solid var(--border)",
          paddingTop: "2rem",
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <Link href="/resume" className="btn-primary">View Resume</Link>
        <Link href="/contact" className="btn-secondary">Get in touch</Link>
      </section>
      </ScrollReveal>
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
        fontWeight: 700,
        marginBottom: "1rem",
        paddingBottom: "0.5rem",
        borderBottom: "2px solid var(--border)",
      }}
    >
      {children}
    </h2>
  );
}
