"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/lib/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      style={{ textDecoration: "none", display: "block" }}
    >
      <motion.div
        whileHover="hover"
        initial="initial"
        style={{
          padding: "2.5rem 0",
          borderBottom: "1px solid var(--border)",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                fontSize: "0.75rem",
                color: "var(--fg-muted)",
              }}
            >
              {project.team} &mdash; {new Date(project.date).getFullYear()}
            </span>
            <motion.h3
              variants={{
                initial: { x: 0, color: "var(--fg)" },
                hover: { x: 10, color: "var(--fg)" },
              }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontFamily: "var(--font-display)",
                margin: 0,
                fontWeight: 400,
                lineHeight: 1.1,
              }}
            >
              {project.title}
            </motion.h3>
          </div>

          <motion.div
            variants={{
              initial: { opacity: 0, x: -20 },
              hover: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: "2rem",
              color: "var(--fg)",
              fontWeight: 300,
              fontFamily: "var(--font-sans)",
            }}
          >
            &#8594;
          </motion.div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginTop: "1rem",
          }}
        >
          <p
            style={{
              maxWidth: "500px",
              color: "var(--fg-secondary)",
              fontSize: "1rem",
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            {project.summary}
          </p>

          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "flex-end" }}>
            {project.stack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  padding: "0.2rem 0.5rem",
                  border: "1px solid var(--border-subtle)",
                  color: "var(--fg-muted)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
