import type { Metadata } from "next";
import { getAllCrashReports } from "@/lib/content";
import { CrashReportCard } from "@/components/content/CrashReportCard";
import { ScrollReveal, TextReveal } from "@/components/layout/ScrollReveal";

export const metadata: Metadata = {
  title: "Lessons & Crash Reports",
  description: "A log of systems that broke, and the mental models they forced me to fix.",
};

export default async function LessonsPage() {
  const reports = await getAllCrashReports();

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
            04 &mdash; Lessons
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
          <TextReveal text="What broke, and what it taught me" delay={100} />
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
            Bugs are not interruptions. They are the curriculum. Here are some of the most educational mistakes I&apos;ve made so far.
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
        {reports.map((report, index) => (
          <ScrollReveal key={report.slug} delay={index * 100}>
            <CrashReportCard report={report} index={index} />
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
