"use client";

import { useEffect, useId, useRef, useState } from "react";
import mermaid from "mermaid";
import { useTheme } from "@/components/navigation/ThemeProvider";

export function MermaidDiagram({ code }: { code: string }) {
  const id = useId().replace(/:/g, "");
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isRendering, setIsRendering] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    let isMounted = true;

    async function renderDiagram() {
      if (!containerRef.current || !code.trim()) return;

      setError(null);
      setIsRendering(true);
      containerRef.current.innerHTML = "";

      mermaid.initialize({
        startOnLoad: false,
        securityLevel: "strict",
        theme: "base",
        themeVariables: getThemeVariables(theme),
        flowchart: {
          curve: "basis",
          htmlLabels: false,
          useMaxWidth: true,
        },
      });

      try {
        const { svg } = await mermaid.render(`architecture-${id}`, code);
        if (!isMounted || !containerRef.current) return;
        containerRef.current.innerHTML = svg;
      } catch (renderError) {
        if (!isMounted) return;
        setError(
          renderError instanceof Error
            ? renderError.message
            : "Mermaid could not render this diagram."
        );
      } finally {
        if (isMounted) setIsRendering(false);
      }
    }

    renderDiagram();

    return () => {
      isMounted = false;
    };
  }, [code, id, theme]);

  if (!code.trim()) {
    return (
      <EmptyDiagramMessage message="No architecture diagram has been added for this project yet." />
    );
  }

  return (
    <div>
      <div
        style={{
          border: "2px solid var(--border)",
          background: "var(--surface)",
          boxShadow: "var(--shadow-brutal)",
          padding: "1rem",
          overflowX: "auto",
        }}
      >
        {isRendering && (
          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: "var(--fg-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Rendering architecture diagram...
          </p>
        )}
        <div
          ref={containerRef}
          aria-label="Project architecture diagram"
          style={{
            minWidth: "720px",
          }}
        />
      </div>

      {error && (
        <div style={{ marginTop: "1.5rem" }}>
          <EmptyDiagramMessage message="Mermaid could not render this diagram. Raw source is shown below." />
          <pre
            style={{
              marginTop: "1rem",
              padding: "1rem",
              border: "1px solid var(--border)",
              background: "var(--surface-elevated)",
              color: "var(--fg-secondary)",
              overflowX: "auto",
              fontSize: "0.8rem",
            }}
          >
            <code>{code}</code>
          </pre>
          <p
            style={{
              color: "var(--fg-muted)",
              fontSize: "0.75rem",
              fontFamily: "var(--font-mono)",
              marginTop: "0.75rem",
            }}
          >
            {error}
          </p>
        </div>
      )}
    </div>
  );
}

function EmptyDiagramMessage({ message }: { message: string }) {
  return (
    <div
      style={{
        padding: "2rem",
        border: "1px solid var(--border)",
        textAlign: "center",
      }}
    >
      <p
        style={{
          color: "var(--fg-muted)",
          fontSize: "0.9rem",
          fontStyle: "italic",
          margin: 0,
        }}
      >
        {message}
      </p>
    </div>
  );
}

function getThemeVariables(theme: "dark" | "light") {
  if (theme === "light") {
    return {
      background: "#F5F0E8",
      primaryColor: "#EEEAE0",
      primaryTextColor: "#0c0c0c",
      primaryBorderColor: "#0c0c0c",
      lineColor: "#0c0c0c",
      secondaryColor: "#FF3B00",
      tertiaryColor: "#ffffff",
      fontFamily: "JetBrains Mono, monospace",
    };
  }

  return {
    background: "#0c0c0c",
    primaryColor: "#1a1a1a",
    primaryTextColor: "#f0ede6",
    primaryBorderColor: "#f0ede6",
    lineColor: "#FFE500",
    secondaryColor: "#FFE500",
    tertiaryColor: "#2a2a2a",
    fontFamily: "JetBrains Mono, monospace",
  };
}
