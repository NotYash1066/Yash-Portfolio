import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getProjectBySlug,
  getProjectReadme,
  getAllProjects,
  getRelatedFieldNotes,
  getRelatedCrashReports,
} from "@/lib/content";
import { ProjectTabs } from "@/components/content/ProjectTabs";

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const readme = getProjectReadme(slug);
  const relatedNotes = await getRelatedFieldNotes(slug);
  const relatedReports = await getRelatedCrashReports(slug);

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "4rem 1.5rem",
        minHeight: "80vh",
      }}
    >
      {/* Back link */}
      <Link
        href="/work"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.75rem",
          color: "var(--fg-muted)",
          textDecoration: "none",
          display: "inline-block",
          marginBottom: "2rem",
        }}
      >
        ← Back to Work
      </Link>

      {/* Project header */}
      <div style={{ marginBottom: "3rem" }}>
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
              letterSpacing: "0.1em",
              fontWeight: 600,
            }}
          >
            {project.type === "selected-work" ? "Selected Work" : project.type}
          </span>
          <span style={{ color: "var(--fg-muted)", fontSize: "0.5rem" }}>·</span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              color: "var(--fg-muted)",
            }}
          >
            {project.team}
            {project.teamName ? ` — ${project.teamName}` : ""}
          </span>
          <span style={{ color: "var(--fg-muted)", fontSize: "0.5rem" }}>·</span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              color: "var(--fg-muted)",
            }}
          >
            {project.status}
          </span>
          {project.hackathon && (
            <>
              <span style={{ color: "var(--fg-muted)", fontSize: "0.5rem" }}>·</span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  color: "var(--warning)",
                }}
              >
                {project.hackathonResult || project.hackathon}
              </span>
            </>
          )}
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 4vw, 3.25rem)",
            fontWeight: 400,
            color: "var(--fg)",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: "1rem",
          }}
        >
          {project.title}
        </h1>

        {/* Summary */}
        <p
          style={{
            fontSize: "1.1rem",
            color: "var(--fg-secondary)",
            lineHeight: 1.6,
            maxWidth: "700px",
            marginBottom: "1.5rem",
          }}
        >
          {project.summary}
        </p>

        {/* Stack */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.375rem",
            marginBottom: "1.5rem",
          }}
        >
          {project.stack.map((tech) => (
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

        {/* Links */}
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.8rem",
                color: "var(--accent)",
                textDecoration: "none",
              }}
            >
              GitHub ↗
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.8rem",
                color: "var(--accent)",
                textDecoration: "none",
              }}
            >
              Live Demo ↗
            </a>
          )}
        </div>
      </div>

      {/* Tabs: Case Study / README */}
      <ProjectTabs
        caseStudy={project.content || ""}
        readme={readme}
      />

      {/* Related content */}
      {(relatedNotes.length > 0 || relatedReports.length > 0) && (
        <div
          style={{
            marginTop: "4rem",
            paddingTop: "2rem",
            borderTop: "1px solid var(--border)",
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
              display: "block",
              marginBottom: "1.5rem",
            }}
          >
            Related Content
          </span>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {relatedNotes.map((note) => (
              <Link
                key={note.slug}
                href={`/writing/${note.slug}`}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.85rem",
                  color: "var(--fg-secondary)",
                  textDecoration: "none",
                }}
              >
                Writing: {note.title}
              </Link>
            ))}
            {relatedReports.map((report) => (
              <Link
                key={report.slug}
                href={`/lessons/${report.slug}`}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.85rem",
                  color: "var(--fg-secondary)",
                  textDecoration: "none",
                }}
              >
                Lesson: {report.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
