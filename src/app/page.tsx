import Link from "next/link";
import { profile } from "@/config/profile";
import { getFeaturedProjects, getAllFieldNotes, getAllCrashReports } from "@/lib/content";
import { ProjectCard } from "@/components/content/ProjectCard";
import { FieldNoteCard } from "@/components/content/FieldNoteCard";
import { CrashReportCard } from "@/components/content/CrashReportCard";
import { ScrollReveal, TextReveal } from "@/components/layout/ScrollReveal";

export default async function HomePage() {
  const projects = getFeaturedProjects();
  const fieldNotes = (await getAllFieldNotes()).slice(0, 3);
  const crashReports = (await getAllCrashReports()).slice(0, 2);

  return (
    <div style={{ minHeight: "100vh", paddingBottom: "10vh" }}>
      {/* ============================================================
          HERO (Cinematic & Massive)
          ============================================================ */}
      <section
        style={{
          minHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "2rem 1.5rem",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <div style={{ maxWidth: "1000px" }}>
          <div style={{ marginBottom: "2rem" }}>
            <ScrollReveal delay={100} duration={1.2}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  fontSize: "0.85rem",
                  color: "var(--fg-secondary)",
                  display: "inline-block",
                  borderBottom: "1px solid var(--border)",
                  paddingBottom: "0.5rem",
                }}
              >
                Portfolio Edition II &mdash; {new Date().getFullYear()}
              </span>
            </ScrollReveal>
          </div>

          <h1
            style={{
              fontSize: "clamp(3.5rem, 12vw, 9rem)",
              lineHeight: 0.9,
              color: "var(--fg)",
              margin: "0 0 2rem -0.05em",
            }}
          >
            <TextReveal text={profile.name} delay={200} />
          </h1>

          <ScrollReveal delay={600} duration={1.2} yOffset={20}>
            <p
              style={{
                fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
                color: "var(--fg-secondary)",
                lineHeight: 1.4,
                maxWidth: "700px",
                fontWeight: 300,
                fontFamily: "var(--font-sans)",
              }}
            >
              {profile.heroDescription}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={900} duration={1.2} yOffset={20}>
            <div
              style={{
                marginTop: "4rem",
                display: "flex",
                gap: "2rem",
                alignItems: "center",
              }}
            >
              <Link href="/work" className="btn-primary">
                Selected Work
              </Link>
              <Link
                href="/about"
                className="hover-underline-link"
                style={{
                  fontFamily: "var(--font-mono)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  fontSize: "0.8rem",
                  color: "var(--fg)",
                  textDecoration: "none",
                }}
              >
                Discover More
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ============================================================
          SELECTED WORK (Cinematic List)
          ============================================================ */}
      <section
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "10rem 1.5rem 5rem",
        }}
      >
        <ScrollReveal>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: "4rem",
              borderBottom: "1px solid var(--border)",
              paddingBottom: "1rem",
            }}
          >
            <h2
              style={{
                fontSize: "clamp(2rem, 5vw, 4rem)",
                color: "var(--fg)",
                margin: 0,
              }}
            >
              Selected Works
            </h2>
            <Link
              href="/work"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.85rem",
                color: "var(--fg-secondary)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                textDecoration: "none",
              }}
            >
              View Archive &#8594;
            </Link>
          </div>
        </ScrollReveal>

        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {projects.map((project, index) => (
            <ScrollReveal key={project.slug} delay={index * 150}>
              <ProjectCard project={project} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ============================================================
          WRITING / FIELD NOTES (Editorial Grid)
          ============================================================ */}
      {fieldNotes.length > 0 && (
        <section
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "8rem 1.5rem 5rem",
          }}
        >
          <ScrollReveal>
            <div
              style={{
                marginBottom: "4rem",
              }}
            >
              <h2
                style={{
                  fontSize: "clamp(2rem, 5vw, 4rem)",
                  color: "var(--fg)",
                  margin: 0,
                }}
              >
                Journal & Notes
              </h2>
            </div>
          </ScrollReveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "3rem",
            }}
          >
            {fieldNotes.map((note, index) => (
              <ScrollReveal key={note.slug} delay={index * 150}>
                <FieldNoteCard note={note} />
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* ============================================================
          CLOSING STATEMENT
          ============================================================ */}
      <section
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "10rem 1.5rem 2rem",
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <ScrollReveal>
          <div style={{ maxWidth: "800px" }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 6vw, 4rem)",
                lineHeight: 1.1,
                color: "var(--fg)",
                margin: "0 0 3rem 0",
              }}
            >
              {profile.closingLine}
            </h2>
            <Link href="/contact" className="btn-primary">
              Start a Conversation
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
