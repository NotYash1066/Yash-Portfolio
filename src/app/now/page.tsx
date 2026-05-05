import type { Metadata } from "next";
import { profile } from "@/config/profile";
import { getNowPageContent } from "@/lib/content";
import ReactMarkdown from "react-markdown";

export const metadata: Metadata = {
  title: "Now",
  description: "What I'm currently building, learning, reading, and struggling with.",
};

export default function NowPage() {
  const nowContent = getNowPageContent();

  const sections = [
    { label: "Currently building", value: profile.currentBuilding.join(", ") },
    { label: "Currently learning", value: profile.currentLearning.join(", ") },
    { label: "Currently reading", value: profile.currentReading },
    { label: "Current focus", value: profile.currentFocus },
    { label: "Current obsession", value: profile.currentObsession },
    { label: "Currently struggling with", value: profile.currentStruggle },
    { label: "Currently improving", value: profile.currentImproving },
    { label: "Next milestone", value: profile.nextMilestone },
  ];

  return (
    <div
      style={{
        maxWidth: "750px",
        margin: "0 auto",
        padding: "4rem 1.5rem",
        minHeight: "80vh",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "3rem" }}>
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
          Now
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
          What I&apos;m focused on right now
        </h1>
        <p
          style={{
            fontSize: "0.85rem",
            color: "var(--fg-muted)",
            fontFamily: "var(--font-mono)",
          }}
        >
          Last updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </p>
      </div>

      {/* Sections */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
        {sections.map((section) => (
          <div
            key={section.label}
            style={{
              padding: "1.5rem 0",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                color: "var(--accent)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                display: "block",
                marginBottom: "0.5rem",
              }}
            >
              {section.label}
            </span>
            <p
              style={{
                fontSize: "0.95rem",
                color: "var(--fg-secondary)",
                lineHeight: 1.7,
              }}
            >
              {section.value}
            </p>
          </div>
        ))}
      </div>

      {/* Additional MDX content */}
      {nowContent && (
        <div className="prose" style={{ marginTop: "3rem" }}>
          <ReactMarkdown>{nowContent}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}
