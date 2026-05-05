import type { Metadata } from "next";
import { getAllCrashReports } from "@/lib/content";
import { CrashReportCard } from "@/components/content/CrashReportCard";

export const metadata: Metadata = {
  title: "Crash Reports",
  description: "Engineering maturity through mistakes — bugs, failed assumptions, and lessons.",
};

export default function CrashReportsPage() {
  const reports = getAllCrashReports();

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
      <div style={{ marginBottom: "3rem", maxWidth: "650px" }}>
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
          Crash Reports
        </span>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 400,
            color: "var(--fg)",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: "1rem",
          }}
        >
          What broke, and what it taught me
        </h1>
        <p
          style={{
            fontSize: "0.95rem",
            color: "var(--fg-secondary)",
            lineHeight: 1.7,
          }}
        >
          Bugs, failed assumptions, and production incidents — documented honestly. Every crash report follows the same structure: what happened, why it happened, how I fixed it, and what I&apos;ll do differently next time.
        </p>
      </div>

      {/* Reports */}
      {reports.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 520px), 1fr))",
            gap: "1.25rem",
          }}
        >
          {reports.map((report, i) => (
            <CrashReportCard key={report.slug} report={report} index={i} />
          ))}
        </div>
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
            No crash reports published yet. Either nothing has broken, or I haven&apos;t documented it yet.
          </p>
        </div>
      )}
    </div>
  );
}
