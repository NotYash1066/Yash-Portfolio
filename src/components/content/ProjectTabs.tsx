"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function ProjectTabs({
  caseStudy,
  readme,
}: {
  caseStudy: string;
  readme: string | null;
}) {
  const [activeTab, setActiveTab] = useState<"case-study" | "readme">("case-study");

  return (
    <div>
      {/* Tab bar */}
      <div
        style={{
          display: "flex",
          gap: "0",
          borderBottom: "1px solid var(--border)",
          marginBottom: "2rem",
        }}
      >
        <button
          onClick={() => setActiveTab("case-study")}
          style={{
            padding: "0.75rem 1.5rem",
            background: "transparent",
            border: "none",
            borderBottom: activeTab === "case-study"
              ? "2px solid var(--accent)"
              : "2px solid transparent",
            color:
              activeTab === "case-study"
                ? "var(--fg)"
                : "var(--fg-secondary)",
            fontSize: "0.875rem",
            fontWeight: activeTab === "case-study" ? 500 : 400,
            cursor: "pointer",
            transition: "all 0.2s",
            fontFamily: "var(--font-sans)",
          }}
        >
          Case Study
        </button>
        <button
          onClick={() => setActiveTab("readme")}
          style={{
            padding: "0.75rem 1.5rem",
            background: "transparent",
            border: "none",
            borderBottom: activeTab === "readme"
              ? "2px solid var(--accent)"
              : "2px solid transparent",
            color:
              activeTab === "readme"
                ? "var(--fg)"
                : "var(--fg-secondary)",
            fontSize: "0.875rem",
            fontWeight: activeTab === "readme" ? 500 : 400,
            cursor: "pointer",
            transition: "all 0.2s",
            fontFamily: "var(--font-sans)",
          }}
        >
          README
        </button>
      </div>

      {/* Content */}
      {activeTab === "case-study" && (
        <div className="prose" style={{ maxWidth: "750px" }}>
          {caseStudy ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {caseStudy}
            </ReactMarkdown>
          ) : (
            <p style={{ color: "var(--fg-muted)", fontStyle: "italic" }}>
              No case study has been written for this project yet.
            </p>
          )}
        </div>
      )}

      {activeTab === "readme" && (
        <div className="prose" style={{ maxWidth: "750px" }}>
          {readme ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {readme}
            </ReactMarkdown>
          ) : (
            <div
              style={{
                padding: "2rem",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  color: "var(--fg-muted)",
                  fontSize: "0.9rem",
                  fontStyle: "italic",
                }}
              >
                No README was found for this project yet. The case study above captures the build, decisions, and lessons.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
