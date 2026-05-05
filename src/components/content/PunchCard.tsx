"use client";

export function PunchCard() {
  // Simulated activity data (months x projects)
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const years = ["2024", "2025", "2026"];
  
  // Activity intensity (0-4, 0 = no activity, 4 = high activity)
  const activityData: Record<string, number[]> = {
    "2024": [0, 1, 2, 3, 2, 1, 0, 2, 3, 4, 3, 2],
    "2025": [3, 4, 3, 2, 3, 4, 3, 2, 1, 2, 3, 4],
    "2026": [4, 3, 4, 3, 2, 0, 0, 0, 0, 0, 0, 0],
  };

  const getIntensityColor = (intensity: number) => {
    if (intensity === 0) return "var(--surface-elevated)";
    if (intensity === 1) return "rgba(var(--accent-rgb), 0.2)";
    if (intensity === 2) return "rgba(var(--accent-rgb), 0.4)";
    if (intensity === 3) return "rgba(var(--accent-rgb), 0.7)";
    return "var(--accent)";
  };

  return (
    <div
      className="card"
      style={{
        padding: "2rem 1.5rem",
        overflow: "auto",
      }}
    >
      <div style={{ marginBottom: "1.5rem" }}>
        <h3
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            color: "var(--accent)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            fontWeight: 700,
            marginBottom: "0.5rem",
          }}
        >
          Activity Punch Card
        </h3>
        <p
          style={{
            fontSize: "0.8rem",
            color: "var(--fg-muted)",
            fontFamily: "var(--font-mono)",
          }}
        >
          Project & learning activity by month
        </p>
      </div>

      <div style={{ minWidth: "600px" }}>
        {years.map((year) => (
          <div key={year} style={{ marginBottom: "1.5rem" }}>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                color: "var(--fg-secondary)",
                marginBottom: "0.5rem",
                fontWeight: 700,
              }}
            >
              {year}
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(12, 1fr)",
                gap: "0.5rem",
              }}
            >
              {months.map((month, i) => {
                const intensity = activityData[year][i];
                return (
                  <div
                    key={month}
                    style={{
                      aspectRatio: "1",
                      border: `${2}px solid var(--border)`,
                      background: getIntensityColor(intensity),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      cursor: "pointer",
                      transition: "transform 0.1s",
                    }}
                    title={`${month} ${year}: ${intensity === 0 ? "No activity" : `${intensity} project${intensity > 1 ? "s" : ""}`}`}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    {intensity > 0 && (
                      <div
                        style={{
                          width: "40%",
                          height: "40%",
                          background: "var(--bg)",
                          borderRadius: "50%",
                        }}
                      />
                    )}
                    <span
                      style={{
                        position: "absolute",
                        bottom: "-1.25rem",
                        fontSize: "0.55rem",
                        fontFamily: "var(--font-mono)",
                        color: "var(--fg-muted)",
                        fontWeight: 600,
                      }}
                    >
                      {month.charAt(0)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: "2rem",
          paddingTop: "1rem",
          borderTop: `1px solid var(--border-subtle)`,
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            color: "var(--fg-muted)",
            fontWeight: 700,
          }}
        >
          INTENSITY:
        </span>
        {[0, 1, 2, 3, 4].map((level) => (
          <div key={level} style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
            <div
              style={{
                width: "12px",
                height: "12px",
                border: `${2}px solid var(--border)`,
                background: getIntensityColor(level),
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                color: "var(--fg-muted)",
              }}
            >
              {level === 0 ? "None" : level}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
