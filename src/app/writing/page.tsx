import type { Metadata } from "next";
import { getAllFieldNotes } from "@/lib/content";
import { FieldNoteCard } from "@/components/content/FieldNoteCard";
import { ScrollReveal, TextReveal } from "@/components/layout/ScrollReveal";

export const metadata: Metadata = {
  title: "Writing",
  description: "Field notes on building, breaking, and understanding systems.",
};

export default async function WritingPage() {
  const notes = await getAllFieldNotes();

  return (
    <div
      style={{
        maxWidth: "1400px",
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
            03 &mdash; Writing
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
          <TextReveal text="Receipts from the learning" delay={100} />
        </h1>

        <ScrollReveal delay={300} duration={1}>
          <p
            style={{
              fontSize: "1.2rem",
              color: "var(--fg-secondary)",
              lineHeight: 1.6,
              maxWidth: "700px",
              fontWeight: 300,
            }}
          >
            A collection of field notes documenting my attempts to understand software engineering deeply. Less about tutorials, more about mental models and debugging rabbit holes.
          </p>
        </ScrollReveal>
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "3rem",
        }}
      >
        {notes.map((note, index) => (
          <ScrollReveal key={note.slug} delay={index * 100}>
            <FieldNoteCard note={note} />
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
