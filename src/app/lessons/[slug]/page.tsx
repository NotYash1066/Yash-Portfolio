import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import {
  getCrashReportBySlug,
  getAllCrashReports,
  getAdjacentCrashReports,
} from "@/lib/content";

export async function generateStaticParams() {
  const reports = await getAllCrashReports();
  return reports.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const report = await getCrashReportBySlug(slug);
  if (!report) return {};
  return {
    title: `Crash Report — ${report.title}`,
    description: report.lesson,
  };
}

export default async function CrashReportPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const report = await getCrashReportBySlug(slug);

  if (!report) notFound();

  const allReports = await getAllCrashReports();
  const reportIndex = allReports.findIndex((r) => r.slug === slug);
  const { previous, next } = await getAdjacentCrashReports(slug);

  const severityColor = {
    Low: "var(--fg-muted)",
    Medium: "var(--warning)",
    High: "var(--destructive)",
    Critical: "var(--destructive)",
  }[report.severity];

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
        href="/lessons"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.75rem",
          color: "var(--fg-muted)",
          textDecoration: "none",
          display: "inline-block",
          marginBottom: "2rem",
        }}
      >
        ← Back to Lessons
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
              color: "var(--fg-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Crash Report #{String(reportIndex + 1).padStart(3, "0")}
          </span>
          <span style={{ color: "var(--fg-muted)", fontSize: "0.5rem" }}>·</span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              color: severityColor,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            {report.severity}
          </span>
          <span style={{ color: "var(--fg-muted)", fontSize: "0.5rem" }}>·</span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              color: "var(--fg-muted)",
            }}
          >
            {report.system}
          </span>
          <span style={{ color: "var(--fg-muted)", fontSize: "0.5rem" }}>·</span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              color: "var(--fg-muted)",
            }}
          >
            {new Date(report.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>

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
          {report.title}
        </h1>

        {/* Lesson callout */}
        <div
          style={{
            padding: "1rem 1.25rem",
            background: "var(--accent-muted)",
            borderLeft: "3px solid var(--accent)",
            borderRadius: "0 6px 6px 0",
            marginBottom: "1.5rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              color: "var(--accent)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              display: "block",
              marginBottom: "0.375rem",
            }}
          >
            Lesson
          </span>
          <p
            style={{
              fontSize: "0.9rem",
              color: "var(--fg)",
              lineHeight: 1.5,
              fontStyle: "italic",
            }}
          >
            {report.lesson}
          </p>
        </div>

        {/* Tags */}
        <div style={{ display: "flex", gap: "0.375rem", flexWrap: "wrap" }}>
          {report.tags.map((tag) => (
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
          {report.content}
        </ReactMarkdown>
      </article>

      {/* Related project */}
      {report.relatedProject && (
        <div
          style={{
            marginTop: "3rem",
            paddingTop: "1.5rem",
            borderTop: "1px solid var(--border)",
          }}
        >
          <Link
            href={`/work/${report.relatedProject}`}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
              color: "var(--accent)",
              textDecoration: "none",
            }}
          >
            Related project: {report.relatedProject} →
          </Link>
        </div>
      )}

      {/* Navigation */}
      <nav
        style={{
          marginTop: "3rem",
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
            href={`/lessons/${previous.slug}`}
            style={{ textDecoration: "none", maxWidth: "45%" }}
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
            <span style={{ fontSize: "0.85rem", color: "var(--fg-secondary)" }}>
              {previous.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={`/lessons/${next.slug}`}
            style={{ textDecoration: "none", textAlign: "right", maxWidth: "45%" }}
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
            <span style={{ fontSize: "0.85rem", color: "var(--fg-secondary)" }}>
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
