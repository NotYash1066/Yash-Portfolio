"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { FieldNote } from "@/lib/types";

export function FieldNoteCard({ note }: { note: FieldNote }) {
  return (
    <Link
      href={`/writing/${note.slug}`}
      style={{ textDecoration: "none", display: "block", height: "100%" }}
    >
      <motion.div
        whileHover="hover"
        initial="initial"
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "2rem",
          background: "var(--surface)",
          border: "1px solid var(--border)",
          height: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <motion.div
          variants={{
            initial: { opacity: 0 },
            hover: { opacity: 0.03 },
          }}
          transition={{ duration: 0.3 }}
          style={{
            position: "absolute",
            inset: 0,
            background: "var(--fg)",
            zIndex: 0,
          }}
        />

        <div style={{ position: "relative", zIndex: 1, flexGrow: 1 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "1.5rem",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                color: "var(--fg)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              {note.category}
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                color: "var(--fg-muted)",
              }}
            >
              {new Date(note.date).getFullYear()}
            </span>
          </div>

          <motion.h3
            variants={{
              initial: { y: 0 },
              hover: { y: -5 },
            }}
            transition={{ duration: 0.3 }}
            style={{
              fontSize: "1.5rem",
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              color: "var(--fg)",
              margin: "0 0 1rem 0",
              lineHeight: 1.2,
            }}
          >
            {note.title}
          </motion.h3>

          <p
            style={{
              fontSize: "0.95rem",
              color: "var(--fg-secondary)",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {note.excerpt}
          </p>
        </div>

        <div
          style={{
            marginTop: "2rem",
            position: "relative",
            zIndex: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {note.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  padding: "0.2rem 0.5rem",
                  border: "1px solid var(--border-subtle)",
                  color: "var(--fg-muted)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          
          <motion.span
            variants={{
              initial: { opacity: 0.5, x: -10 },
              hover: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 0.3 }}
            style={{ color: "var(--fg)", fontSize: "1.2rem" }}
          >
            &#8594;
          </motion.span>
        </div>
      </motion.div>
    </Link>
  );
}
