import type { Metadata } from "next";
import { profile } from "@/config/profile";
import { ScrollReveal } from "@/components/layout/ScrollReveal";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch — email, GitHub, LinkedIn.",
};

export default function ContactPage() {
  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "4rem 1rem", minHeight: "80vh" }}>
      <ScrollReveal>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, display: "block", marginBottom: "0.75rem" }}>Contact</span>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "var(--fg)", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "1rem" }}>Let&apos;s talk</h1>
        <p style={{ fontSize: "0.95rem", color: "var(--fg-secondary)", lineHeight: 1.7, marginBottom: "2.5rem" }}>
          I&apos;m open to {profile.openTo.join(", ").toLowerCase()}. If you have an interesting problem, a collaboration idea, or feedback on my work — I&apos;d like to hear from you.
        </p>
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {[
            { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
            { label: "GitHub", value: "NotYash1066", href: profile.github },
            { label: "LinkedIn", value: "Yash Karthiya", href: profile.linkedin },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.label !== "Email" ? "_blank" : undefined}
              rel={item.label !== "Email" ? "noopener noreferrer" : undefined}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1.25rem 0",
                borderBottom: "2px solid var(--border)",
                textDecoration: "none",
              }}
            >
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--fg-muted)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700 }}>{item.label}</span>
              <span style={{ fontSize: "0.9rem", color: "var(--accent)", fontFamily: "var(--font-mono)", fontWeight: 700 }}>{item.value} {item.label !== "Email" ? "↗" : ""}</span>
            </a>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal delay={150}>
        <p style={{ marginTop: "3rem", fontFamily: "var(--font-display)", fontSize: "1.25rem", color: "var(--fg-muted)", fontStyle: "italic", lineHeight: 1.5, fontWeight: 700 }}>
          &ldquo;{profile.signatureLine}&rdquo;
        </p>
      </ScrollReveal>
    </div>
  );
}
