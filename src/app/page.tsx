import Link from "next/link";
import { profile } from "@/config/profile";
import { getFeaturedProjects, getAllFieldNotes, getAllCrashReports } from "@/lib/content";
import { ScrollReveal } from "@/components/layout/ScrollReveal";

export default function HomePage() {
  const projects = getFeaturedProjects();
  const fieldNotes = getAllFieldNotes().slice(0, 4);
  const crashReports = getAllCrashReports().slice(0, 2);

  return (
    <div>
      {/* ============================================================
          ABOVE THE FOLD — Hero
          ============================================================ */}
      <section className="above-fold" style={{ padding: "0 1.5rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

          {/* Eyebrow */}
          <ScrollReveal>
            <span className="fold-eyebrow">Living Engineering Archive</span>
          </ScrollReveal>

          {/* Massive headline */}
          <ScrollReveal delay={80}>
            <h1 className="fold-headline glitch">
              {profile.name}
            </h1>
          </ScrollReveal>

          {/* Horizontal rule */}
          <ScrollReveal delay={120}>
            <div className="fold-rule rule-animate" />
          </ScrollReveal>

          {/* Two-column below fold */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "3rem",
            alignItems: "start",
          }}>
            <ScrollReveal delay={160}>
              <p className="fold-deck">
                {profile.heroDescription}
              </p>
              <p style={{
                fontSize: "0.9rem",
                color: "var(--fg-muted)",
                lineHeight: 1.7,
                maxWidth: "520px",
                marginBottom: "2rem",
              }}>
                {profile.heroSubtext}
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <Link href="/work" className="btn-primary">
                  <span>View Selected Work</span>
                </Link>
                <Link href="/field-notes" className="btn-secondary">Read Writing</Link>
                <Link href="/resume" className="btn-secondary">Resume</Link>
              </div>
            </ScrollReveal>

            {/* Stamp */}
            <ScrollReveal delay={200}>
              <div style={{ paddingTop: "1rem" }}>
                <span className="work-stamp stamp-animate">● Open to Work</span>
              </div>
            </ScrollReveal>
          </div>

          {/* Meta bar */}
          <ScrollReveal delay={240}>
            <div className="fold-meta-bar">
              <span className="fold-meta-item">
                <span className="live-dot" />
                {profile.currentFocus.slice(0, 60)}...
              </span>
              <span className="fold-meta-item desktop-only">
                {profile.university} · {profile.cgpa}
              </span>
              <span className="fold-meta-item desktop-only">
                Graduating {profile.graduationYear}
              </span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ============================================================
          STATS BAR
          ============================================================ */}
      <ScrollReveal>
        <div className="stats-bar" style={{ maxWidth: "1280px", margin: "0 auto 0", padding: "0 1.5rem" }}>
          {[
            { value: "4+", label: "Projects Shipped" },
            { value: "3", label: "Years Learning" },
            { value: "15+", label: "Technologies" },
            { value: "∞", label: "Bugs Fixed" },
          ].map((stat) => (
            <div key={stat.label} className="stat-item">
              <span className="stat-value stat-number">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* ============================================================
          MARQUEE TICKER
          ============================================================ */}
      <div className="ticker-bar" style={{ margin: "0" }}>
        <div className="marquee-track ticker-content">
          {Array(4).fill(null).map((_, i) => (
            <span key={i}>
              {profile.beliefs.map((b) => `◆ ${b} `).join("")}
            </span>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem" }}>

        {/* ============================================================
            SELECTED WORK
            ============================================================ */}
        <section style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
          <ScrollReveal>
            <div className="section-header">
              <div style={{ display: "flex", alignItems: "baseline", gap: "1rem" }}>
                <span className="section-kicker">01</span>
                <h2 className="section-title">Selected Work</h2>
              </div>
              <Link href="/work" className="section-link">All projects →</Link>
            </div>
          </ScrollReveal>

          <div className="stagger" style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 380px), 1fr))",
          }}>
            {projects.map((project) => (
              <ScrollReveal key={project.slug}>
                <Link href={`/work/${project.slug}`} className="article-card">
                  {/* Kicker row */}
                  <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.75rem", flexWrap: "wrap" }}>
                    <span style={{
                      fontFamily: "var(--font-mono)", fontSize: "0.6rem", fontWeight: 700,
                      textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--fg)",
                      background: "var(--accent)", padding: "0.15rem 0.4rem",
                    }}>
                      {project.type === "selected-work" ? "Work" : project.type}
                    </span>
                    {project.hackathon && (
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--destructive)", fontWeight: 700, textTransform: "uppercase" }}>
                        {project.hackathonResult || project.hackathon}
                      </span>
                    )}
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--fg-muted)", marginLeft: "auto" }}>
                      {new Date(project.date).getFullYear()}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="article-card-title">
                    {project.title} <span className="article-card-arrow">→</span>
                  </h3>

                  {/* Summary */}
                  <p style={{ fontSize: "0.875rem", color: "var(--fg-muted)", lineHeight: 1.6, marginBottom: "1rem" }}>
                    {project.summary}
                  </p>

                  {/* Stack */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
                    {project.stack.slice(0, 4).map((tech) => (
                      <span key={tech} className="tag">{tech}</span>
                    ))}
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ============================================================
            WRITING
            ============================================================ */}
        {fieldNotes.length > 0 && (
          <section style={{ paddingBottom: "4rem" }}>
            <ScrollReveal>
              <div className="section-header">
                <div style={{ display: "flex", alignItems: "baseline", gap: "1rem" }}>
                  <span className="section-kicker">02</span>
                  <h2 className="section-title">Writing</h2>
                </div>
                <Link href="/field-notes" className="section-link">All writing →</Link>
              </div>
            </ScrollReveal>

            <div className="stagger">
              {fieldNotes.map((note, i) => (
                <ScrollReveal key={note.slug}>
                  <Link href={`/field-notes/${note.slug}`} className="writing-item">
                    <span className="writing-item-num">{String(i + 1).padStart(2, "0")}</span>
                    <div style={{ flex: 1 }}>
                      <div className="writing-item-title">{note.title}</div>
                      <p style={{ fontSize: "0.85rem", color: "var(--fg-muted)", lineHeight: 1.5, marginBottom: "0.5rem" }}>
                        {note.excerpt}
                      </p>
                      <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--fg-muted)", fontWeight: 700, textTransform: "uppercase" }}>
                          {note.category}
                        </span>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--fg-muted)" }}>
                          {note.readingTime}
                        </span>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--fg-muted)" }}>
                          {new Date(note.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                        </span>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </section>
        )}

        {/* ============================================================
            LESSONS + PULL QUOTE — Two column
            ============================================================ */}
        <section style={{ paddingBottom: "4rem" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0",
            borderTop: "3px solid var(--border)",
          }}>
            {/* Lessons column */}
            <div style={{ borderRight: "1px solid var(--border)", paddingRight: "2rem", paddingTop: "2rem" }}>
              <ScrollReveal>
                <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", marginBottom: "1.5rem" }}>
                  <span className="section-kicker">03</span>
                  <h2 className="section-title" style={{ fontSize: "1.5rem" }}>Lessons</h2>
                </div>
              </ScrollReveal>
              <div className="stagger">
                {crashReports.map((report, i) => (
                  <ScrollReveal key={report.slug}>
                    <Link href={`/crash-reports/${report.slug}`} className="article-card" style={{ paddingLeft: 0, paddingRight: 0 }}>
                      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--fg-muted)", fontWeight: 700, textTransform: "uppercase" }}>
                          #{String(i + 1).padStart(3, "0")}
                        </span>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--destructive)", fontWeight: 700, textTransform: "uppercase" }}>
                          {report.severity}
                        </span>
                      </div>
                      <h3 className="article-card-title" style={{ fontSize: "1.1rem" }}>
                        {report.title} <span className="article-card-arrow">→</span>
                      </h3>
                      <p style={{ fontSize: "0.85rem", color: "var(--fg-muted)", fontStyle: "italic", lineHeight: 1.5 }}>
                        &ldquo;{report.lesson}&rdquo;
                      </p>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
              <ScrollReveal>
                <Link href="/crash-reports" className="section-link" style={{ display: "inline-block", marginTop: "1rem" }}>
                  All lessons →
                </Link>
              </ScrollReveal>
            </div>

            {/* Pull quote column */}
            <div style={{ paddingLeft: "2rem", paddingTop: "2rem" }}>
              <ScrollReveal delay={100}>
                <blockquote className="pull-quote">
                  &ldquo;{profile.closingLine}&rdquo;
                </blockquote>
              </ScrollReveal>
              <ScrollReveal delay={150}>
                <p style={{ fontSize: "0.85rem", color: "var(--fg-muted)", lineHeight: 1.7, marginBottom: "2rem" }}>
                  {profile.currentFocus}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {profile.currentLearning.map((item) => (
                    <div key={item} style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                      <span style={{ width: "6px", height: "6px", background: "var(--accent)", flexShrink: 0 }} />
                      <span style={{ fontSize: "0.85rem", color: "var(--fg-secondary)", fontFamily: "var(--font-mono)", fontWeight: 600 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <Link href="/about" className="btn-primary"><span>About me</span></Link>
                  <Link href="/contact" className="btn-secondary">Get in touch</Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
