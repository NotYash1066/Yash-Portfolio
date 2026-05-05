import { profile } from "@/config/profile";

export function StatusPanel() {
  const items = [
    { label: "Currently building", value: profile.currentBuilding.join(", ") },
    { label: "Currently learning", value: profile.currentLearning.join(", ") },
    { label: "Current obsession", value: profile.currentObsession },
    { label: "Currently improving", value: profile.currentImproving },
    { label: "Open to", value: profile.openTo.join(", ") },
  ];

  return (
    <div
      style={{
        border: `${2}px solid var(--border)`,
        background: "var(--surface)",
        overflow: "hidden",
        boxShadow: "var(--shadow-brutal)",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "1rem 1.5rem",
          borderBottom: `${2}px solid var(--border)`,
          display: "flex",
          alignItems: "center",
          gap: "0.625rem",
          background: "var(--surface-elevated)",
        }}
      >
        <span className="live-dot" aria-hidden="true" />
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            color: "var(--accent)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            fontWeight: 700,
          }}
        >
          Current Status
        </span>
      </div>

      {/* Items */}
      <div style={{ padding: "0.25rem 0" }}>
        {items.map((item, i) => (
          <div
            key={item.label}
            style={{
              padding: "0.875rem 1.5rem",
              borderBottom:
                i < items.length - 1 ? `1px solid var(--border-subtle)` : "none",
              display: "flex",
              flexDirection: "column",
              gap: "0.25rem",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                color: "var(--fg-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                fontWeight: 700,
              }}
            >
              {item.label}
            </span>
            <span
              style={{
                fontSize: "0.85rem",
                color: "var(--fg-secondary)",
                lineHeight: 1.5,
              }}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
