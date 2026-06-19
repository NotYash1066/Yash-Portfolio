"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { useTheme } from "./ThemeProvider";
import { profile } from "@/config/profile";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { toggleTheme } = useTheme();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    },
    []
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const navigate = (path: string) => {
    router.push(path);
    setOpen(false);
  };

  const externalLink = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  if (!open) return null;

  return (
    <>
      <div
        onClick={() => setOpen(false)}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(4px)",
          zIndex: 90,
        }}
      />
      <div
        style={{
          position: "fixed",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          maxWidth: "560px",
          width: "calc(100% - 2rem)",
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "12px",
          boxShadow: "var(--shadow-lg)",
          zIndex: 100,
          overflow: "hidden",
        }}
      >
        <Command label="Command palette">
          <Command.Input
            placeholder="Type a command or search..."
            style={{
              width: "100%",
              padding: "1rem 1.25rem",
              border: "none",
              borderBottom: "1px solid var(--border)",
              background: "transparent",
              color: "var(--fg)",
              fontSize: "1rem",
              fontFamily: "var(--font-sans)",
              outline: "none",
            }}
          />
          <Command.List
            style={{
              maxHeight: "320px",
              overflowY: "auto",
              padding: "0.5rem",
            }}
          >
            <Command.Empty
              style={{
                padding: "2rem 1rem",
                textAlign: "center",
                color: "var(--fg-muted)",
                fontSize: "0.9rem",
              }}
            >
              No results found.
            </Command.Empty>

            <Command.Group
              heading="Navigation"
              style={{ marginBottom: "0.25rem" }}
            >
              {[
                { label: "Go to Index", path: "/" },
                { label: "Go to Work", path: "/work" },
                { label: "Go to Writing", path: "/writing" },
                { label: "Go to Lessons", path: "/lessons" },
                { label: "Go to Now", path: "/now" },
                { label: "Go to About", path: "/about" },
                { label: "Go to Archive", path: "/archive" },
                { label: "Go to Resume", path: "/resume" },
                { label: "Go to Contact", path: "/contact" },
              ].map((item) => (
                <Command.Item
                  key={item.path}
                  onSelect={() => navigate(item.path)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.625rem 0.75rem",
                    borderRadius: "6px",
                    cursor: "pointer",
                    color: "var(--fg-secondary)",
                    fontSize: "0.9rem",
                  }}
                >
                  <span style={{ fontSize: "0.85rem" }}>→</span>
                  {item.label}
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group heading="Actions" style={{ marginBottom: "0.25rem" }}>
              <Command.Item
                onSelect={() => externalLink(profile.github)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.625rem 0.75rem",
                  borderRadius: "6px",
                  cursor: "pointer",
                  color: "var(--fg-secondary)",
                  fontSize: "0.9rem",
                }}
              >
                <span style={{ fontSize: "0.85rem" }}>↗</span>
                Open GitHub
              </Command.Item>
              <Command.Item
                onSelect={() => externalLink(profile.linkedin)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.625rem 0.75rem",
                  borderRadius: "6px",
                  cursor: "pointer",
                  color: "var(--fg-secondary)",
                  fontSize: "0.9rem",
                }}
              >
                <span style={{ fontSize: "0.85rem" }}>↗</span>
                Open LinkedIn
              </Command.Item>
              <Command.Item
                onSelect={() => {
                  window.location.href = `mailto:${profile.email}`;
                  setOpen(false);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.625rem 0.75rem",
                  borderRadius: "6px",
                  cursor: "pointer",
                  color: "var(--fg-secondary)",
                  fontSize: "0.9rem",
                }}
              >
                <span style={{ fontSize: "0.85rem" }}>✉</span>
                Email me
              </Command.Item>
              <Command.Item
                onSelect={() => {
                  toggleTheme();
                  setOpen(false);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.625rem 0.75rem",
                  borderRadius: "6px",
                  cursor: "pointer",
                  color: "var(--fg-secondary)",
                  fontSize: "0.9rem",
                }}
              >
                <span style={{ fontSize: "0.85rem" }}>◑</span>
                Toggle theme
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </>
  );
}
