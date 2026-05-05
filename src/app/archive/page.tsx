import type { Metadata } from "next";
import { getArchiveItems } from "@/lib/content";

export const metadata: Metadata = {
  title: "Archive",
  description: "Smaller experiments, old builds, prototypes, and abandoned ideas.",
};

export default function ArchivePage() {
  const items = getArchiveItems();

  const statusColor = (status: string) => {
    switch (status) {
      case "Shipped": return "var(--success)";
      case "Prototype": return "var(--accent)";
      case "Rebuilt": return "var(--accent)";
      case "Paused": return "var(--warning)";
      case "Abandoned": return "var(--fg-muted)";
      default: return "var(--fg-muted)";
    }
  };

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "4rem 1.5rem",
        minHeight: "80vh",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "3rem", maxWidth: "650px" }}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            color: "var(--accent)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            fontWeight: 600,
            display: "block",
            marginBottom: "0.75rem",
          }}
        >
          Archive
        </span>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 400,
            color: "var(--fg)",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: "1rem",
          }}
        >
          Some projects shipped. Some taught me why they didn&apos;t.
        </h1>
        <p
          style={{
            fontSize: "0.95rem",
            color: "var(--fg-secondary)",
            lineHeight: 1.7,
          }}
        >
          Smaller experiments, hackathon prototypes, learning projects, and abandoned ideas. Not everything needs to be a case study — but everything left a trace.
        </p>
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "0.85rem",
          }}
        >
          <thead>
            <tr>
              {["Name", "Type", "Year", "Stack", "Status", "Note"].map(
                (h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: "left",
                      padding: "0.75rem 1rem",
                      borderBottom: "1px solid var(--border)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.65rem",
                      color: "var(--fg-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i}>
                <td
                  style={{
                    padding: "1rem",
                    borderBottom: "1px solid var(--border-subtle)",
                    color: "var(--fg)",
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "var(--accent)", textDecoration: "none" }}
                    >
                      {item.name} ↗
                    </a>
                  ) : (
                    item.name
                  )}
                </td>
                <td
                  style={{
                    padding: "1rem",
                    borderBottom: "1px solid var(--border-subtle)",
                    color: "var(--fg-secondary)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.type}
                </td>
                <td
                  style={{
                    padding: "1rem",
                    borderBottom: "1px solid var(--border-subtle)",
                    color: "var(--fg-muted)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                  }}
                >
                  {item.year}
                </td>
                <td
                  style={{
                    padding: "1rem",
                    borderBottom: "1px solid var(--border-subtle)",
                  }}
                >
                  <div style={{ display: "flex", gap: "0.25rem", flexWrap: "wrap" }}>
                    {item.stack.map((tech) => (
                      <span
                        key={tech}
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.625rem",
                          padding: "0.15rem 0.4rem",
                          borderRadius: "3px",
                          border: "1px solid var(--border)",
                          color: "var(--fg-muted)",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </td>
                <td
                  style={{
                    padding: "1rem",
                    borderBottom: "1px solid var(--border-subtle)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.7rem",
                    color: statusColor(item.status),
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.status}
                </td>
                <td
                  style={{
                    padding: "1rem",
                    borderBottom: "1px solid var(--border-subtle)",
                    color: "var(--fg-secondary)",
                    fontSize: "0.825rem",
                    maxWidth: "300px",
                    lineHeight: 1.5,
                  }}
                >
                  {item.note}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
