"use client";

import Link from "next/link";
import type { FieldNote } from "@/lib/types";

export function FieldNoteCard({ note }: { note: FieldNote }) {
  return (
    <Link
      href={`/writing/${note.slug}`}
      className="card"
      style={{
        display: "block",
        padding: "1.5rem",
        textDecoration: "none",
      }}
    >
      {/* Top row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          marginBottom: "0.75rem",
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            color: "var(--accent)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            fontWeight: 700,
          }}
        >
          {note.category}
        </span>
        <span style={{ color: "var(--fg-muted)", fontSize: "0.5rem" }}>·</span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            color: "var(--fg-muted)",
          }}
        >
          {new Date(note.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
        <span style={{ color: "var(--fg-muted)", fontSize: "0.5rem" }}>·</span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            color: "var(--fg-muted)",
          }}
        >
          {note.readingTime}
        </span>
      </div>

      {/* Title */}
      <h3
        className="glitch"
        style={{
          fontSize: "1.125rem",
          fontWeight: 700,
          color: "var(--fg)",
          marginBottom: "0.5rem",
          letterSpacing: "-0.01em",
          fontFamily: "var(--font-display)",
        }}
      >
        {note.title}
      </h3>

      {/* Excerpt */}
      <p
        style={{
          fontSize: "0.85rem",
          color: "var(--fg-secondary)",
          lineHeight: 1.6,
          marginBottom: "1rem",
        }}
      >
        {note.excerpt}
      </p>

      {/* Tags */}
      <div style={{ display: "flex", gap: "0.375rem", flexWrap: "wrap" }}>
        {note.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.625rem",
              padding: "0.2rem 0.5rem",
              border: "1px solid var(--border)",
              color: "var(--fg-muted)",
              fontWeight: 600,
            }}
          >
            {tag}
          </span>
        ))}
        {note.mood && (
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.625rem",
              padding: "0.2rem 0.5rem",
              background: "var(--accent)",
              color: "var(--bg)",
              fontWeight: 700,
            }}
          >
            {note.mood}
          </span>
        )}
      </div>
    </Link>
  );
}
