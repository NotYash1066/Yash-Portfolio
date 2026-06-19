import Link from "next/link";
import { profile } from "@/config/profile";
import { getFeaturedProjects, getAllFieldNotes, getAllCrashReports } from "@/lib/content";
import { ProjectCard } from "@/components/content/ProjectCard";
import { FieldNoteCard } from "@/components/content/FieldNoteCard";
import { CrashReportCard } from "@/components/content/CrashReportCard";
import { StatusPanel } from "@/components/content/StatusPanel";
import { StatsCards } from "@/components/content/StatsCards";
import { ScrollReveal } from "@/components/layout/ScrollReveal";

export default async function HomePage() {
  const projects = getFeaturedProjects();
  const fieldNotes = (await getAllFieldNotes()).slice(0, 3);
  const crashReports = (await getAllCrashReports()).slice(0, 2);

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* ============================================================
          HERO
          ============================================================ */}
      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "6rem 1rem 4rem",
          position: "relative",
        }}
      >
        <div style={{ maxWidth: "800px" }}>
          {/* Name + Stamp */}
          <ScrollReveal>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "1.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
          <h1
            className="glitch"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 10vw, 6rem)",
              fontWeight: 800,
              color: "var(--fg)",
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            {profile.name}
          </h1>
          <span className="work-stamp">● Open to Work</span>
          </div>
          </ScrollReveal>

          {/* Hero description */}
          <ScrollReveal delay={100}>
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
          </ScrollReveal>

          {/* Subtext */}
          <ScrollReveal delay={150}>
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
          </ScrollReveal>

          {/* CTAs */}
          <ScrollReveal delay={200}>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Link href="/work" className="btn-primary">
              View Selected Work
            </Link>
            <Link href="/writing" className="btn-secondary">
              Read Writing
            </Link>
            <Link href="/resume" className="btn-secondary">
              Download Resume
            </Link>
          </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ============================================================
          STATUS PANEL + STATS
          ============================================================ */}
      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1rem 5rem",
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
          <ScrollReveal delay={50}>
            <StatusPanel />
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <StatsCards />
          </ScrollReveal>
        </div>
      </section>

      {/* ============================================================
          SELECTED WORK
          ============================================================ */}
      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1rem 5rem",
          position: "relative",
        }}
      >
        {/* Section header */}
        <ScrollReveal>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: "2rem",
            position: "relative",
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
                fontWeight: 700,
                display: "block",
                marginBottom: "0.5rem",
              }}
            >
              01 / Selected Work
            </span>
            <h2
              style={{
                fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
                fontWeight: 800,
                color: "var(--fg)",
                letterSpacing: "-0.02em",
                fontFamily: "var(--font-display)",
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
              fontWeight: 700,
            }}
          >
            View all →
          </Link>
        </div>
        </ScrollReveal>

        {/* Project grid */}
        <ScrollReveal delay={100}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
            gap: "1.25rem",
          }}
        >
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        </ScrollReveal>
      </section>

      {/* ============================================================
          FIELD NOTES
          ============================================================ */}
      {fieldNotes.length > 0 && (
        <section
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 1rem 5rem",
          }}
        >
          <ScrollReveal>
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
                  fontWeight: 700,
                  display: "block",
                  marginBottom: "0.5rem",
                }}
              >
                02 / Writing
              </span>
              <h2
                style={{
                  fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
                  fontWeight: 800,
                  color: "var(--fg)",
                  letterSpacing: "-0.02em",
                  fontFamily: "var(--font-display)",
                }}
              >
                Receipts from the learning
              </h2>
            </div>
            <Link
              href="/writing"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                color: "var(--fg-secondary)",
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              View all →
            </Link>
          </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
              gap: "1.25rem",
            }}
          >
            {fieldNotes.map((note) => (
              <FieldNoteCard key={note.slug} note={note} />
            ))}
          </div>
          </ScrollReveal>
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
            padding: "0 1rem 5rem",
          }}
        >
          <ScrollReveal>
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
                  fontWeight: 700,
                  display: "block",
                  marginBottom: "0.5rem",
                }}
              >
                03 / Lessons
              </span>
              <h2
                style={{
                  fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
                  fontWeight: 800,
                  color: "var(--fg)",
                  letterSpacing: "-0.02em",
                  fontFamily: "var(--font-display)",
                }}
              >
                What broke, and what it taught me
              </h2>
            </div>
            <Link
              href="/lessons"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                color: "var(--fg-secondary)",
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              View all →
            </Link>
          </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
              gap: "1.25rem",
            }}
          >
            {crashReports.map((report, i) => (
              <CrashReportCard key={report.slug} report={report} index={i} />
            ))}
          </div>
          </ScrollReveal>
        </section>
      )}

      {/* ============================================================
          CLOSING
          ============================================================ */}
      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1rem 6rem",
        }}
      >
        <ScrollReveal>
        <div
          style={{
            borderTop: `${2}px solid var(--border)`,
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
              fontWeight: 700,
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
                fontWeight: 700,
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
                fontWeight: 700,
              }}
            >
              Get in touch →
            </Link>
          </div>
        </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
