import type { Metadata } from "next";
import { getAllProjects } from "@/lib/content";
import { ProjectCard } from "@/components/content/ProjectCard";
import { ScrollReveal, TextReveal } from "@/components/layout/ScrollReveal";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected projects — systems I've built, problems I've solved, and lessons each one left behind.",
};

export default function WorkPage() {
  const projects = getAllProjects();

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
            02 &mdash; Selected Work
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
          <TextReveal text="Projects that shaped my engineering" delay={100} />
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
            These are the projects I learned the most from &mdash; not all of them shipped perfectly, but each one left a trace. Every project page includes a case study and, where available, the original README.
          </p>
        </ScrollReveal>
      </div>

      {/* Projects list */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        {projects.map((project, index) => (
          <ScrollReveal key={project.slug} delay={index * 100}>
            <ProjectCard project={project} />
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
