import Link from "next/link";
import { profile } from "@/config/profile";
import { getFeaturedProjects, getAllFieldNotes, getAllCrashReports } from "@/lib/content";
import { ProjectCard } from "@/components/content/ProjectCard";
import { FieldNoteCard } from "@/components/content/FieldNoteCard";
import { CrashReportCard } from "@/components/content/CrashReportCard";
import { StatusPanel } from "@/components/content/StatusPanel";

export default function HomePage() {
  const projects = getFeaturedProjects();
  const fieldNotes = getAllFieldNotes().slice(0, 3);
  const crashReports = getAllCrashReports().slice(0, 2);

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* ============================================================
          HERO
          ============================================================ */}
      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "6rem 1.5rem 4rem",
        }}
      >
        <div style={{ maxWidth: "800px" }}>
          {/* Name */}
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 7vw, 5rem)",
              fontWeight: 400,
              color: "var(--fg)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              marginBottom: "1.5rem",
            }}
          >
            {profile.name}
          </h1>

          {/* Hero description */}
          <p
            style={{
              fontSize: "clamp(1.1rem, 2vw, 1.3rem)",
              color: "var(--fg-secondary)",
              lineHeight: 1.6,
              marginBottom: "1rem",
              maxWidth: "650px",
            }}
          >
            {profile.heroDescription}
          </p>

          {/* Subtext */}
          <p
            style={{
              fontSize: "0.9rem",
              color: "var(--fg-muted)",
              lineHeight: 1.7,
              marginBottom: "2.5rem",
              maxWidth: "600px",
            }}
          >
            {profile.heroSubtext}
          </p>

          {/* CTAs */}
          <div
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Link
              href="/work"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.5rem",
                background: "var(--fg)",
                color: "var(--bg)",
                borderRadius: "6px",
                fontSize: "0.875rem",
                fontWeight: 500,
                textDecoration: "none",
                transition: "opacity 0.2s",
              }}
            >
              View Selected Work
            </Link>
            <Link
              href="/field-notes"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.5rem",
                border: "1px solid var(--border)",
                color: "var(--fg-secondary)",
                borderRadius: "6px",
                fontSize: "0.875rem",
                fontWeight: 500,
                textDecoration: "none",
                transition: "all 0.2s",
              }}
            >
              Read Field Notes
            </Link>
            <Link
              href="/resume"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.5rem",
                border: "1px solid var(--border)",
                color: "var(--fg-secondary)",
                borderRadius: "6px",
                fontSize: "0.875rem",
                fontWeight: 500,
                textDecoration: "none",
                transition: "all 0.2s",
              }}
            >
              Download Resume
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          STATUS PANEL
          ============================================================ */}
      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1.5rem 5rem",
        }}
      >
        <div style={{ maxWidth: "600px" }}>
          <StatusPanel />
        </div>
      </section>

      {/* ============================================================
          SELECTED WORK
          ============================================================ */}
      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1.5rem 5rem",
        }}
      >
        {/* Section header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: "2rem",
          }}
        >
          <div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                color: "var(--accent)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                fontWeight: 600,
                display: "block",
                marginBottom: "0.5rem",
              }}
            >
              Selected Work
            </span>
            <h2
              style={{
                fontSize: "1.75rem",
                fontWeight: 600,
                color: "var(--fg)",
                letterSpacing: "-0.02em",
              }}
            >
              Projects that shaped my engineering
            </h2>
          </div>
          <Link
            href="/work"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: "var(--fg-secondary)",
              textDecoration: "none",
            }}
          >
            View all →
          </Link>
        </div>

        {/* Project grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 480px), 1fr))",
            gap: "1.25rem",
          }}
        >
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      {/* ============================================================
          FIELD NOTES
          ============================================================ */}
      {fieldNotes.length > 0 && (
        <section
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 1.5rem 5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: "2rem",
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  color: "var(--accent)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  fontWeight: 600,
                  display: "block",
                  marginBottom: "0.5rem",
                }}
              >
                Field Notes
              </span>
              <h2
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 600,
                  color: "var(--fg)",
                  letterSpacing: "-0.02em",
                }}
              >
                Receipts from the learning
              </h2>
            </div>
            <Link
              href="/field-notes"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                color: "var(--fg-secondary)",
                textDecoration: "none",
              }}
            >
              View all →
            </Link>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 360px), 1fr))",
              gap: "1.25rem",
            }}
          >
            {fieldNotes.map((note) => (
              <FieldNoteCard key={note.slug} note={note} />
            ))}
          </div>
        </section>
      )}

      {/* ============================================================
          CRASH REPORTS
          ============================================================ */}
      {crashReports.length > 0 && (
        <section
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 1.5rem 5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: "2rem",
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  color: "var(--accent)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  fontWeight: 600,
                  display: "block",
                  marginBottom: "0.5rem",
                }}
              >
                Crash Reports
              </span>
              <h2
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 600,
                  color: "var(--fg)",
                  letterSpacing: "-0.02em",
                }}
              >
                What broke, and what it taught me
              </h2>
            </div>
            <Link
              href="/crash-reports"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                color: "var(--fg-secondary)",
                textDecoration: "none",
              }}
            >
              View all →
            </Link>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 480px), 1fr))",
              gap: "1.25rem",
            }}
          >
            {crashReports.map((report, i) => (
              <CrashReportCard key={report.slug} report={report} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* ============================================================
          CLOSING
          ============================================================ */}
      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1.5rem 6rem",
        }}
      >
        <div
          style={{
            borderTop: "1px solid var(--border)",
            paddingTop: "3rem",
            maxWidth: "650px",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
              color: "var(--fg-secondary)",
              lineHeight: 1.5,
              fontStyle: "italic",
            }}
          >
            &ldquo;{profile.closingLine}&rdquo;
          </p>
          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/about"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.8rem",
                color: "var(--accent)",
                textDecoration: "none",
              }}
            >
              Learn more about me →
            </Link>
            <Link
              href="/contact"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.8rem",
                color: "var(--fg-secondary)",
                textDecoration: "none",
              }}
            >
              Get in touch →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
