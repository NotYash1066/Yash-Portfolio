import type { Metadata } from "next";
import Link from "next/link";
import { profile } from "@/config/profile";
import { ScrollReveal, TextReveal } from "@/components/layout/ScrollReveal";

export const metadata: Metadata = {
  title: "About",
  description: "Who I am, how I work, what I care about, and what I'm learning the hard way.",
};

export default function AboutPage() {
  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "8rem 1.5rem 6rem",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "5rem" }}>
        <ScrollReveal duration={1}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: "var(--fg-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              display: "block",
              marginBottom: "1.5rem",
            }}
          >
            01 &mdash; About
          </span>
        </ScrollReveal>
        
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3rem, 8vw, 6rem)",
            fontWeight: 400,
            color: "var(--fg)",
            letterSpacing: "-0.02em",
            lineHeight: 1,
            marginBottom: "2rem",
          }}
        >
          <TextReveal text={profile.name} delay={100} />
        </h1>
        
        <ScrollReveal delay={300} duration={1}>
          <p style={{ fontSize: "1.2rem", color: "var(--fg-secondary)", lineHeight: 1.6, marginBottom: "0.5rem", maxWidth: "600px", fontWeight: 300 }}>
            {profile.role} at {profile.university}, {profile.location}.
          </p>
          <p style={{ fontSize: "0.85rem", color: "var(--fg-muted)", lineHeight: 1.6, fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            CGPA: {profile.cgpa} &mdash; Graduating {profile.graduationYear}
          </p>
        </ScrollReveal>
      </div>

      {/* Intro */}
      <ScrollReveal delay={400} duration={1.2}>
        <section style={{ marginBottom: "6rem", maxWidth: "700px" }}>
          <p style={{ fontSize: "1.25rem", color: "var(--fg)", lineHeight: 1.8, marginBottom: "1.5rem", fontWeight: 300 }}>
            I like building things that expose what I don&apos;t understand yet. Most of my projects start with a question I can&apos;t answer, and end with a system that forces me to learn the answer by building it.
          </p>
          <p style={{ fontSize: "1.1rem", color: "var(--fg-secondary)", lineHeight: 1.8, fontWeight: 300 }}>
            I write to document the messy middle of learning &mdash; the bugs, the failed assumptions, the things that clicked on the third try. This portfolio is that documentation system.
          </p>
        </section>
      </ScrollReveal>

      {/* What I care about */}
      <ScrollReveal delay={100}>
        <section style={{ marginBottom: "5rem" }}>
          <SectionLabel>Focus</SectionLabel>
          <p style={{ fontSize: "1.1rem", color: "var(--fg-secondary)", lineHeight: 1.8, maxWidth: "700px", fontWeight: 300 }}>
            Building systems that work, not just demos that impress. Writing code that the next person can read. Shipping things before they&apos;re perfect. Documenting the process while the confusion is still fresh. Finishing what I start.
          </p>
        </section>
      </ScrollReveal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "4rem", marginBottom: "5rem" }}>
        {/* Beliefs */}
        <ScrollReveal delay={200}>
          <section>
            <SectionLabel>Beliefs</SectionLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {profile.beliefs.map((belief) => (
                <p
                  key={belief}
                  style={{
                    fontSize: "1.05rem",
                    color: "var(--fg)",
                    lineHeight: 1.5,
                    fontFamily: "var(--font-display)",
                    fontStyle: "italic",
                    fontWeight: 400,
                  }}
                >
                  &ldquo;{belief}&rdquo;
                </p>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* Operating Principles */}
        <ScrollReveal delay={300}>
          <section>
            <SectionLabel>Operating Principles</SectionLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {profile.operatingPrinciples.map((principle, i) => (
                <div key={principle} style={{ display: "flex", gap: "1.5rem", alignItems: "baseline", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "1rem" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.75rem",
                      color: "var(--fg-muted)",
                      minWidth: "1.5rem",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p style={{ fontSize: "1rem", color: "var(--fg-secondary)", lineHeight: 1.6, fontWeight: 300 }}>
                    {principle}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>
      </div>

      {/* Tools */}
      <ScrollReveal delay={200}>
        <section style={{ marginBottom: "6rem" }}>
          <SectionLabel>Arsenal</SectionLabel>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            {profile.favoriteTools.map((tool) => (
              <span
                key={tool}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  padding: "0.5rem 1rem",
                  border: "1px solid var(--border-subtle)",
                  color: "var(--fg)",
                  borderRadius: "100px",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {tool}
              </span>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Languages */}
      <ScrollReveal delay={300}>
        <section style={{ marginBottom: "6rem" }}>
          <SectionLabel>Languages</SectionLabel>
          <p style={{ fontSize: "1rem", color: "var(--fg)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            {profile.languages.join("  \u2014  ")}
          </p>
        </section>
      </ScrollReveal>

      {/* CTAs */}
      <ScrollReveal delay={400}>
        <section
          style={{
            borderTop: "1px solid var(--border-subtle)",
            paddingTop: "4rem",
            display: "flex",
            gap: "1.5rem",
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
        fontSize: "0.8rem",
        color: "var(--fg)",
        textTransform: "uppercase",
        letterSpacing: "0.15em",
        marginBottom: "2rem",
        paddingBottom: "1rem",
        borderBottom: "1px solid var(--border-subtle)",
      }}
    >
      {children}
    </h2>
  );
}
