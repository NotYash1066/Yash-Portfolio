import type { Metadata } from "next";
import { getAllFieldNotes } from "@/lib/content";
import { FieldNoteCard } from "@/components/content/FieldNoteCard";
import { ScrollReveal } from "@/components/layout/ScrollReveal";

export const metadata: Metadata = {
  title: "Writing",
  description: "Technical notes, personal reflections, build logs, and learning diary entries. Where I keep the receipts from my learning.",
};

export default function WritingPage() {
  const notes = getAllFieldNotes();

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "4rem 1.5rem",
        minHeight: "80vh",
      }}
    >
      {/* Header */}
      <ScrollReveal>
      <div style={{ marginBottom: "3rem", maxWidth: "650px" }}>
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
          Writing
        </span>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 800,
            color: "var(--fg)",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: "1rem",
          }}
        >
          This is where I keep the receipts from my learning
        </h1>
        <p
          style={{
            fontSize: "0.95rem",
            color: "var(--fg-secondary)",
            lineHeight: 1.7,
          }}
        >
          Technical notes, personal diary entries, build logs, debugging stories, and reflections. A private notebook intentionally made public.
        </p>
      </div>
      </ScrollReveal>

      {/* Notes grid */}
      {notes.length > 0 ? (
        <ScrollReveal delay={100}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
            gap: "1.25rem",
          }}
        >
          {notes.map((note) => (
            <FieldNoteCard key={note.slug} note={note} />
          ))}
        </div>
        </ScrollReveal>
      ) : (
        <div
          style={{
            padding: "4rem 2rem",
            textAlign: "center",
            border: "1px solid var(--border)",
            borderRadius: "6px",
          }}
        >
          <p style={{ color: "var(--fg-muted)", fontSize: "0.9rem" }}>
            No field notes published yet. Check back soon.
          </p>
        </div>
      )}
    </div>
  );
}
