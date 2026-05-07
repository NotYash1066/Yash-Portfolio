"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { CrashReport } from "@/lib/types";

export function CrashReportCard({
  report,
  index,
}: {
  report: CrashReport;
  index: number;
}) {
  const severityColor = {
    Low: "var(--fg-muted)",
    Medium: "var(--warning)",
    High: "var(--destructive)",
    Critical: "var(--destructive)",
  }[report.severity];

  return (
    <Link
      href={`/lessons/${report.slug}`}
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
            hover: { opacity: 0.02 },
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
              alignItems: "center",
              marginBottom: "1.5rem",
              borderBottom: "1px solid var(--border-subtle)",
              paddingBottom: "0.5rem",
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
              Incident #{String(index + 1).padStart(3, "0")}
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                color: severityColor,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {report.severity}
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
            {report.title}
          </motion.h3>

          <p
            style={{
              fontSize: "0.95rem",
              color: "var(--fg-secondary)",
              lineHeight: 1.6,
              margin: 0,
              fontStyle: "italic",
            }}
          >
            &ldquo;{report.lesson}&rdquo;
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
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              color: "var(--fg-muted)",
            }}
          >
            {report.system}
          </span>
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
