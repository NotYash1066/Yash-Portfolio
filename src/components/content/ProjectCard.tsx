"use client";

import Link from "next/link";
import type { Project } from "@/lib/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      style={{
        display: "block",
        padding: "1.75rem",
        border: "1px solid var(--border)",
        borderRadius: "6px",
        background: "var(--surface)",
        textDecoration: "none",
        transition: "all 0.25s ease",
        position: "relative",
        overflow: "hidden",
      }}
      className="project-card"
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
            fontWeight: 600,
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
              }}
            >
              {project.hackathonResult || project.hackathon}
            </span>
          </>
        )}
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: "1.375rem",
          fontWeight: 600,
          color: "var(--fg)",
          marginBottom: "0.5rem",
          letterSpacing: "-0.02em",
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
              borderRadius: "4px",
              border: "1px solid var(--border)",
              color: "var(--fg-secondary)",
              background: "var(--surface-elevated)",
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
          borderTop: "1px solid var(--border)",
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
        {project.readme && (
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              padding: "0.2rem 0.5rem",
              borderRadius: "4px",
              border: "1px solid var(--border)",
              color: "var(--fg-muted)",
            }}
          >
            README
          </span>
        )}
      </div>

      <style jsx>{`
        .project-card:hover {
          border-color: var(--accent) !important;
          box-shadow: 0 0 0 1px var(--accent-muted);
        }
      `}</style>
    </Link>
  );
}
