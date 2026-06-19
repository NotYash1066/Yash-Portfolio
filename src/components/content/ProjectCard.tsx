"use client";

import Link from "next/link";
import type { Project } from "@/lib/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="project-card"
      style={{
        display: "block",
        padding: "1.5rem",
        textDecoration: "none",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top metadata row */}
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
            letterSpacing: "0.1em",
            fontWeight: 700,
          }}
        >
          {project.type === "selected-work" ? "Selected Work" : project.type}
        </span>
        <span style={{ color: "var(--fg-muted)", fontSize: "0.65rem" }}>·</span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            color: "var(--fg-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          {project.team}
        </span>
        {project.hackathon && (
          <>
            <span style={{ color: "var(--fg-muted)", fontSize: "0.65rem" }}>·</span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                color: "var(--warning)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                fontWeight: 700,
              }}
            >
              {project.hackathonResult || project.hackathon}
            </span>
          </>
        )}
      </div>

      {/* Title */}
      <h3
        className="glitch"
        style={{
          fontSize: "1.375rem",
          fontWeight: 700,
          color: "var(--fg)",
          marginBottom: "0.5rem",
          letterSpacing: "-0.02em",
          fontFamily: "var(--font-display)",
        }}
      >
        {project.title}
      </h3>

      {/* Summary */}
      <p
        style={{
          fontSize: "0.9rem",
          color: "var(--fg-secondary)",
          lineHeight: 1.6,
          marginBottom: "1.25rem",
        }}
      >
        {project.summary}
      </p>

      {/* Stack tags */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.375rem",
          marginBottom: "1rem",
        }}
      >
        {project.stack.slice(0, 5).map((tech) => (
          <span
            key={tech}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.675rem",
              padding: "0.25rem 0.625rem",
              border: "1px solid var(--border)",
              color: "var(--fg-secondary)",
              background: "var(--surface-elevated)",
              fontWeight: 600,
            }}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Bottom row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: "1rem",
          borderTop: `${2}px solid var(--border)`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              color: "var(--fg-muted)",
            }}
          >
            {project.role}
          </span>
          <span style={{ color: "var(--fg-muted)", fontSize: "0.65rem" }}>·</span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              color: "var(--fg-muted)",
            }}
          >
            {new Date(project.date).getFullYear()}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {project.readme && (
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                padding: "0.2rem 0.5rem",
                border: "1px solid var(--border)",
                color: "var(--fg-muted)",
                fontWeight: 600,
              }}
            >
              README
            </span>
          )}
          <span className="project-card-arrow">→</span>
        </div>
      </div>
    </Link>
  );
}
