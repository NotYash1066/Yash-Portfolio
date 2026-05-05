export function StatsCards() {
  const stats = [
    { label: "Projects Shipped", value: "4+" },
    { label: "Years Learning", value: "3" },
    { label: "Tech Stack", value: "15+" },
    { label: "Bugs Fixed", value: "∞" },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
        gap: "1rem",
      }}
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="card"
          style={{
            padding: "1.5rem 1rem",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 800,
              color: "var(--accent)",
              lineHeight: 1,
              marginBottom: "0.5rem",
            }}
          >
            {stat.value}
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              color: "var(--fg-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              fontWeight: 700,
            }}
          >
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
