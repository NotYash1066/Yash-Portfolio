import type { Metadata } from "next";
import { profile } from "@/config/profile";
import { ScrollReveal, TextReveal } from "@/components/layout/ScrollReveal";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const metadata: Metadata = {
  title: "Now",
  description: "What I'm doing right now.",
};

export default function NowPage() {
  const contentPath = path.join(process.cwd(), "content/now/index.mdx");
  let lastUpdated = "";
  
  if (fs.existsSync(contentPath)) {
    const fileContent = fs.readFileSync(contentPath, "utf8");
    const { data } = matter(fileContent);
    if (data.date) {
      lastUpdated = new Date(data.date).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric"
      });
    }
  }

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "8rem 1.5rem 6rem",
        minHeight: "100vh",
      }}
    >
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
            Now
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
          <TextReveal text="What I'm focused on" delay={100} />
        </h1>

        <ScrollReveal delay={300} duration={1}>
          <p
            style={{
              fontSize: "1.2rem",
              color: "var(--fg-secondary)",
              lineHeight: 1.6,
              maxWidth: "600px",
              fontWeight: 300,
            }}
          >
            A snapshot of my current priorities, reading list, and struggles.
          </p>
          {lastUpdated && (
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--fg-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginTop: "1rem" }}>
              Last updated &mdash; {lastUpdated}
            </p>
          )}
        </ScrollReveal>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "4rem" }}>
        {/* Current Focus */}
        <ScrollReveal delay={100}>
          <section>
            <SectionLabel>Current Focus</SectionLabel>
            <p style={{ fontSize: "1.1rem", color: "var(--fg-secondary)", lineHeight: 1.8, fontWeight: 300 }}>{profile.currentFocus}</p>
          </section>
        </ScrollReveal>

        {/* Learning */}
        <ScrollReveal delay={200}>
          <section>
            <SectionLabel>Learning</SectionLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {profile.currentLearning.map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "baseline", gap: "1rem" }}>
                  <span style={{ color: "var(--fg-muted)" }}>&mdash;</span>
                  <span style={{ fontSize: "1rem", color: "var(--fg-secondary)", fontWeight: 300 }}>{item}</span>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* Building */}
        <ScrollReveal delay={300}>
          <section>
            <SectionLabel>Building</SectionLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {profile.currentBuilding.map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "baseline", gap: "1rem" }}>
                  <span style={{ color: "var(--fg-muted)" }}>&mdash;</span>
                  <span style={{ fontSize: "1rem", color: "var(--fg-secondary)", fontWeight: 300 }}>{item}</span>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* Reading */}
        <ScrollReveal delay={400}>
          <section>
            <SectionLabel>Reading / Consuming</SectionLabel>
            <p style={{ fontSize: "1.1rem", color: "var(--fg-secondary)", lineHeight: 1.8, fontWeight: 300 }}>{profile.currentReading}</p>
          </section>
        </ScrollReveal>

        {/* Obsession */}
        <ScrollReveal delay={500}>
          <section>
            <SectionLabel>Current Obsession</SectionLabel>
            <p style={{ fontSize: "1.1rem", color: "var(--fg-secondary)", lineHeight: 1.8, fontWeight: 300 }}>{profile.currentObsession}</p>
          </section>
        </ScrollReveal>
      </div>
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
        marginBottom: "1.5rem",
        paddingBottom: "0.5rem",
        borderBottom: "1px solid var(--border-subtle)",
      }}
    >
      {children}
    </h2>
  );
}
