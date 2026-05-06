import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import {
  getFieldNoteBySlug,
  getAllFieldNotes,
  getAdjacentFieldNotes,
} from "@/lib/content";

export async function generateStaticParams() {
  const notes = await getAllFieldNotes();
  return notes.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const note = await getFieldNoteBySlug(slug);
  if (!note) return {};
  return {
    title: note.title,
    description: note.excerpt,
  };
}

export default async function FieldNotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = await getFieldNoteBySlug(slug);

  if (!note) notFound();

  const { previous, next } = await getAdjacentFieldNotes(slug);

  return (
    <div
      style={{
        maxWidth: "750px",
        margin: "0 auto",
        padding: "4rem 1.5rem",
        minHeight: "80vh",
      }}
    >
      {/* Back link */}
      <Link
        href="/writing"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.75rem",
          color: "var(--fg-muted)",
          textDecoration: "none",
          display: "inline-block",
          marginBottom: "2rem",
        }}
      >
        ← Back to Writing
      </Link>

      {/* Header */}
      <header style={{ marginBottom: "3rem" }}>
        {/* Meta row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "1rem",
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
              month: "long",
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
          {note.mood && (
            <>
              <span style={{ color: "var(--fg-muted)", fontSize: "0.5rem" }}>·</span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.625rem",
                  padding: "0.15rem 0.5rem",
                  borderRadius: "4px",
                  background: "var(--accent-muted)",
                  color: "var(--accent)",
                }}
              >
                {note.mood}
              </span>
            </>
          )}
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
            fontWeight: 400,
            color: "var(--fg)",
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
            marginBottom: "1rem",
          }}
        >
          {note.title}
        </h1>

        {/* Tags */}
        <div style={{ display: "flex", gap: "0.375rem", flexWrap: "wrap" }}>
          {note.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.625rem",
                padding: "0.2rem 0.5rem",
                borderRadius: "4px",
                border: "1px solid var(--border)",
                color: "var(--fg-muted)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* Content */}
      <article className="prose">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
          {note.content}
        </ReactMarkdown>
      </article>

      {/* Navigation */}
      <nav
        style={{
          marginTop: "4rem",
          paddingTop: "2rem",
          borderTop: "1px solid var(--border)",
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        {previous ? (
          <Link
            href={`/writing/${previous.slug}`}
            style={{
              textDecoration: "none",
              maxWidth: "45%",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                color: "var(--fg-muted)",
                display: "block",
                marginBottom: "0.25rem",
              }}
            >
              ← Previous
            </span>
            <span
              style={{
                fontSize: "0.85rem",
                color: "var(--fg-secondary)",
              }}
            >
              {previous.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={`/writing/${next.slug}`}
            style={{
              textDecoration: "none",
              textAlign: "right",
              maxWidth: "45%",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                color: "var(--fg-muted)",
                display: "block",
                marginBottom: "0.25rem",
              }}
            >
              Next →
            </span>
            <span
              style={{
                fontSize: "0.85rem",
                color: "var(--fg-secondary)",
              }}
            >
              {next.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </div>
  );
}
