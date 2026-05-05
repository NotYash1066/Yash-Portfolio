import type { Metadata } from "next";
import { getAllProjects } from "@/lib/content";
import { ProjectCard } from "@/components/content/ProjectCard";
import { ScrollReveal } from "@/components/layout/ScrollReveal";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected projects — systems I've built, problems I've solved, and lessons each one left behind.",
};

export default function WorkPage() {
  const projects = getAllProjects();

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "4rem 1rem",
        minHeight: "80vh",
      }}
    >
      {/* Header */}
      <ScrollReveal>
      <div style={{ marginBottom: "3rem", maxWidth: "650px" }}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            color: "var(--accent)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            fontWeight: 700,
            display: "block",
            marginBottom: "0.75rem",
          }}
        >
          Selected Work
        </span>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 800,
            color: "var(--fg)",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: "1rem",
          }}
        >
          Projects that shaped my engineering
        </h1>
        <p
          style={{
            fontSize: "0.95rem",
            color: "var(--fg-secondary)",
            lineHeight: 1.7,
          }}
        >
          These are the projects I learned the most from — not all of them shipped perfectly, but each one left a trace. Every project page includes a case study and, where available, the original README.
        </p>
      </div>
      </ScrollReveal>

      {/* Projects grid */}
      <ScrollReveal delay={100}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
          gap: "1.5rem",
        }}
      >
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
      </ScrollReveal>
    </div>
  );
}
