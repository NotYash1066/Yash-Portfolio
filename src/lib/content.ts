import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { calculateReadingTime } from "./reading-time";
import type { Project, FieldNote, CrashReport, ArchiveItem } from "./types";
import {
  fetchNotionCrashReports,
  fetchNotionFieldNotes,
  isNotionConfigured,
} from "./notion-content";

const contentDir = path.join(process.cwd(), "content");

/* ================================================================
   Projects
   ================================================================ */
export function getAllProjects(): Project[] {
  const projectsDir = path.join(contentDir, "projects");
  if (!fs.existsSync(projectsDir)) return [];

  const slugs = fs
    .readdirSync(projectsDir)
    .filter((f) => fs.statSync(path.join(projectsDir, f)).isDirectory());

  return slugs
    .map((slug) => {
      const metaPath = path.join(projectsDir, slug, "meta.json");
      if (!fs.existsSync(metaPath)) return null;

      const meta = JSON.parse(fs.readFileSync(metaPath, "utf-8"));
      return { ...meta, slug } as Project;
    })
    .filter(Boolean)
    .sort(
      (a, b) =>
        new Date(b!.date).getTime() - new Date(a!.date).getTime()
    ) as Project[];
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | null {
  const projectDir = path.join(contentDir, "projects", slug);
  const metaPath = path.join(projectDir, "meta.json");

  if (!fs.existsSync(metaPath)) return null;

  const meta = JSON.parse(fs.readFileSync(metaPath, "utf-8"));

  // Read case study MDX content
  const mdxPath = path.join(projectDir, "index.mdx");
  let content = "";
  if (fs.existsSync(mdxPath)) {
    const file = fs.readFileSync(mdxPath, "utf-8");
    const { content: mdxContent } = matter(file);
    content = mdxContent;
  }

  return { ...meta, slug, content } as Project;
}

export function getProjectReadme(slug: string): string | null {
  const readmePath = path.join(contentDir, "projects", slug, "README.md");
  if (!fs.existsSync(readmePath)) return null;
  return fs.readFileSync(readmePath, "utf-8");
}

export function getProjectArchitecture(slug: string): string | null {
  const architecturePath = path.join(contentDir, "projects", slug, "architecture.mmd");
  if (!fs.existsSync(architecturePath)) return null;
  return fs.readFileSync(architecturePath, "utf-8");
}

/* ================================================================
   Writing (formerly Field Notes)
   ================================================================ */
function getAllLocalFieldNotes(): FieldNote[] {
  const notesDir = path.join(contentDir, "writing");
  if (!fs.existsSync(notesDir)) return [];

  const files = fs.readdirSync(notesDir).filter((f) => f.endsWith(".mdx"));

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(notesDir, file), "utf-8");
      const { data, content } = matter(raw);

      if (data.status !== "published") return null;

      return {
        ...data,
        slug: data.slug || file.replace(".mdx", ""),
        readingTime: calculateReadingTime(content),
        content,
      } as FieldNote;
    })
    .filter(Boolean)
    .sort(
      (a, b) =>
        new Date(b!.date).getTime() - new Date(a!.date).getTime()
    ) as FieldNote[];
}

function getLocalFieldNoteBySlug(slug: string): FieldNote | null {
  const notesDir = path.join(contentDir, "writing");
  if (!fs.existsSync(notesDir)) return null;

  const files = fs.readdirSync(notesDir).filter((f) => f.endsWith(".mdx"));

  for (const file of files) {
    const raw = fs.readFileSync(path.join(notesDir, file), "utf-8");
    const { data, content } = matter(raw);
    const fileSlug = data.slug || file.replace(".mdx", "");

    if (fileSlug === slug) {
      return {
        ...data,
        slug: fileSlug,
        readingTime: calculateReadingTime(content),
        content,
      } as FieldNote;
    }
  }

  return null;
}

export async function getAllFieldNotes(): Promise<FieldNote[]> {
  if (!isNotionConfigured()) return getAllLocalFieldNotes();

  try {
    return await fetchNotionFieldNotes();
  } catch (error) {
    console.error("Falling back to local writing content after Notion fetch failed.", error);
    return getAllLocalFieldNotes();
  }
}

export async function getFieldNoteBySlug(slug: string): Promise<FieldNote | null> {
  if (!isNotionConfigured()) return getLocalFieldNoteBySlug(slug);

  try {
    return (await fetchNotionFieldNotes()).find((note) => note.slug === slug) ?? null;
  } catch (error) {
    console.error("Falling back to local writing content after Notion fetch failed.", error);
    return getLocalFieldNoteBySlug(slug);
  }
}

/* ================================================================
   Lessons (formerly Crash Reports)
   ================================================================ */
function getAllLocalCrashReports(): CrashReport[] {
  const reportsDir = path.join(contentDir, "lessons");
  if (!fs.existsSync(reportsDir)) return [];

  const files = fs.readdirSync(reportsDir).filter((f) => f.endsWith(".mdx"));

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(reportsDir, file), "utf-8");
      const { data, content } = matter(raw);

      if (data.status !== "published") return null;

      return {
        ...data,
        slug: data.slug || file.replace(".mdx", ""),
        readingTime: calculateReadingTime(content),
        content,
      } as CrashReport;
    })
    .filter(Boolean)
    .sort(
      (a, b) =>
        new Date(b!.date).getTime() - new Date(a!.date).getTime()
    ) as CrashReport[];
}

function getLocalCrashReportBySlug(slug: string): CrashReport | null {
  const reportsDir = path.join(contentDir, "lessons");
  if (!fs.existsSync(reportsDir)) return null;

  const files = fs.readdirSync(reportsDir).filter((f) => f.endsWith(".mdx"));

  for (const file of files) {
    const raw = fs.readFileSync(path.join(reportsDir, file), "utf-8");
    const { data, content } = matter(raw);
    const fileSlug = data.slug || file.replace(".mdx", "");

    if (fileSlug === slug) {
      return {
        ...data,
        slug: fileSlug,
        readingTime: calculateReadingTime(content),
        content,
      } as CrashReport;
    }
  }

  return null;
}

export async function getAllCrashReports(): Promise<CrashReport[]> {
  if (!isNotionConfigured()) return getAllLocalCrashReports();

  try {
    return await fetchNotionCrashReports();
  } catch (error) {
    console.error("Falling back to local lessons content after Notion fetch failed.", error);
    return getAllLocalCrashReports();
  }
}

export async function getCrashReportBySlug(slug: string): Promise<CrashReport | null> {
  if (!isNotionConfigured()) return getLocalCrashReportBySlug(slug);

  try {
    return (await fetchNotionCrashReports()).find((report) => report.slug === slug) ?? null;
  } catch (error) {
    console.error("Falling back to local lessons content after Notion fetch failed.", error);
    return getLocalCrashReportBySlug(slug);
  }
}

/* ================================================================
   Archive
   ================================================================ */
export function getArchiveItems(): ArchiveItem[] {
  const archivePath = path.join(contentDir, "archive", "experiments.json");
  if (!fs.existsSync(archivePath)) return [];
  return JSON.parse(fs.readFileSync(archivePath, "utf-8"));
}

/* ================================================================
   Now Page
   ================================================================ */
export function getNowPageContent(): string {
  const nowPath = path.join(contentDir, "now", "index.mdx");
  if (!fs.existsSync(nowPath)) return "";
  const raw = fs.readFileSync(nowPath, "utf-8");
  const { content } = matter(raw);
  return content;
}

/* ================================================================
   Related Content
   ================================================================ */
export async function getRelatedFieldNotes(projectSlug: string): Promise<FieldNote[]> {
  return (await getAllFieldNotes()).filter(
    (note) => note.relatedProject === projectSlug
  );
}

export async function getRelatedCrashReports(projectSlug: string): Promise<CrashReport[]> {
  return (await getAllCrashReports()).filter(
    (report) => report.relatedProject === projectSlug
  );
}

/* ================================================================
   Navigation helpers
   ================================================================ */
export async function getAdjacentFieldNotes(slug: string) {
  const notes = await getAllFieldNotes();
  const index = notes.findIndex((n) => n.slug === slug);
  return {
    previous: index < notes.length - 1 ? notes[index + 1] : null,
    next: index > 0 ? notes[index - 1] : null,
  };
}

export async function getAdjacentCrashReports(slug: string) {
  const reports = await getAllCrashReports();
  const index = reports.findIndex((r) => r.slug === slug);
  return {
    previous: index < reports.length - 1 ? reports[index + 1] : null,
    next: index > 0 ? reports[index - 1] : null,
  };
}
