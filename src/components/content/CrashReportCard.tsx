"use client";

import Link from "next/link";
import type { CrashReport } from "@/lib/types";

export function CrashReportCard({
  report,
  index,
}: {
  report: CrashReport;
  index: number;
}) {
  const severityColor = {
    Low: "var(--fg-muted)",
    Medium: "var(--warning)",
    High: "var(--destructive)",
    Critical: "var(--destructive)",
  }[report.severity];

  return (
    <Link
      href={`/lessons/${report.slug}`}
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
            color: "var(--fg-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            fontWeight: 700,
          }}
        >
          Crash Report #{String(index + 1).padStart(3, "0")}
        </span>
        <span style={{ color: "var(--fg-muted)", fontSize: "0.5rem" }}>·</span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            color: severityColor,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            fontWeight: 700,
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
        {report.title}
      </h3>

      {/* Lesson */}
      <p
        style={{
          fontSize: "0.85rem",
          color: "var(--fg-secondary)",
          lineHeight: 1.6,
          marginBottom: "1rem",
          fontStyle: "italic",
        }}
      >
        &ldquo;{report.lesson}&rdquo;
      </p>

      {/* Bottom */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        <div style={{ display: "flex", gap: "0.375rem", flexWrap: "wrap" }}>
          {report.tags.slice(0, 3).map((tag) => (
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
        </div>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            color: "var(--fg-muted)",
          }}
        >
          {new Date(report.date).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>
    </Link>
  );
}
