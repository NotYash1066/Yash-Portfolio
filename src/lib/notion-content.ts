import { calculateReadingTime } from "./reading-time";
import type { CrashReport, FieldNote } from "./types";

const NOTION_API_VERSION = "2026-03-11";
const NOTION_BASE_URL = "https://api.notion.com/v1";
const DEFAULT_REVALIDATE_SECONDS = 60 * 60;

type NotionFetchInit = RequestInit & {
  next?: {
    revalidate?: number;
    tags?: string[];
  };
};

type NotionRichText = {
  plain_text?: string;
};

type NotionProperty = {
  type?: string;
  title?: NotionRichText[];
  rich_text?: NotionRichText[];
  select?: { name?: string } | null;
  status?: { name?: string } | null;
  multi_select?: Array<{ name?: string }>;
  date?: { start?: string } | null;
};

type NotionPage = {
  object: "page";
  id: string;
  properties: Record<string, NotionProperty | undefined>;
};

type NotionQueryResponse = {
  results: Array<NotionPage | { object?: string }>;
  has_more: boolean;
  next_cursor: string | null;
};

type NotionMarkdownResponse = {
  markdown?: string;
  truncated?: boolean;
};

type PortfolioContentType = "Writing" | "Lesson";

export function isNotionConfigured() {
  return Boolean(process.env.NOTION_TOKEN && process.env.NOTION_CONTENT_DATA_SOURCE_ID);
}

async function notionRequest<T>(path: string, init: NotionFetchInit = {}): Promise<T> {
  const token = process.env.NOTION_TOKEN;

  if (!token) {
    throw new Error("NOTION_TOKEN is not configured.");
  }

  const response = await fetch(`${NOTION_BASE_URL}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "Notion-Version": NOTION_API_VERSION,
    },
    next: {
      revalidate: getRevalidateSeconds(),
      tags: ["notion-content"],
    },
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(
      `Notion request failed (${response.status}) for ${path}: ${details.slice(0, 300)}`
    );
  }

  return response.json() as Promise<T>;
}

function getRevalidateSeconds() {
  const value = Number(process.env.NOTION_REVALIDATE_SECONDS);
  return Number.isFinite(value) && value >= 0 ? value : DEFAULT_REVALIDATE_SECONDS;
}

function isPage(result: NotionPage | { object?: string }): result is NotionPage {
  return result.object === "page" && "properties" in result;
}

async function getAllContentPages() {
  const dataSourceId = process.env.NOTION_CONTENT_DATA_SOURCE_ID;

  if (!dataSourceId) {
    throw new Error("NOTION_CONTENT_DATA_SOURCE_ID is not configured.");
  }

  const pages: NotionPage[] = [];
  let cursor: string | null = null;

  do {
    const response: NotionQueryResponse = await notionRequest<NotionQueryResponse>(
      `/data_sources/${dataSourceId}/query`,
      {
        method: "POST",
        body: JSON.stringify({
          page_size: 100,
          ...(cursor ? { start_cursor: cursor } : {}),
        }),
      }
    );

    pages.push(...response.results.filter(isPage));
    cursor = response.has_more ? response.next_cursor : null;
  } while (cursor);

  return pages;
}

async function getPageMarkdown(page: NotionPage, title: string) {
  const response = await notionRequest<NotionMarkdownResponse>(
    `/pages/${page.id}/markdown`
  );
  return stripDuplicateTitle(response.markdown ?? "", title);
}

function stripDuplicateTitle(markdown: string, title: string) {
  const normalizedTitle = title.trim().toLowerCase();
  const lines = markdown.replace(/^\uFEFF/, "").split(/\r?\n/);
  const firstContentLineIndex = lines.findIndex((line) => line.trim().length > 0);

  if (firstContentLineIndex === -1) return markdown;

  const firstLine = lines[firstContentLineIndex].trim();
  const titleHeading = firstLine.match(/^#\s+(.+)$/);

  if (!titleHeading || titleHeading[1].trim().toLowerCase() !== normalizedTitle) {
    return markdown;
  }

  return lines.slice(firstContentLineIndex + 1).join("\n").trimStart();
}

function getText(properties: NotionPage["properties"], name: string) {
  const property = properties[name];
  if (!property) return "";

  if (property.title) return property.title.map((item) => item.plain_text ?? "").join("");
  if (property.rich_text) {
    return property.rich_text.map((item) => item.plain_text ?? "").join("");
  }
  if (property.select?.name) return property.select.name;
  if (property.status?.name) return property.status.name;

  return "";
}

function getSelectName(properties: NotionPage["properties"], name: string) {
  const property = properties[name];
  return property?.select?.name ?? property?.status?.name ?? getText(properties, name);
}

function getDate(properties: NotionPage["properties"], name: string) {
  return properties[name]?.date?.start ?? "";
}

function getTags(properties: NotionPage["properties"], name: string) {
  return properties[name]?.multi_select?.map((tag) => tag.name).filter(Boolean) as string[] ?? [];
}

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function isPublishedPublicPage(page: NotionPage, type: PortfolioContentType) {
  const properties = page.properties;
  const pageType = getSelectName(properties, "Type");
  const status = getSelectName(properties, "Status");
  const visibility = getSelectName(properties, "Visibility");

  return (
    normalize(pageType) === normalize(type) &&
    normalize(status) === "published" &&
    (!visibility || normalize(visibility) === "public")
  );
}

function firstParagraph(markdown: string) {
  return (
    markdown
      .split(/\n{2,}/)
      .map((block) => block.replace(/[#*_`>\-[\]()]/g, "").trim())
      .find(Boolean) ?? ""
  );
}

function byNewestDate<T extends { date: string }>(a: T, b: T) {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

function isDefined<T>(value: T | null): value is T {
  return value !== null;
}

export async function fetchNotionFieldNotes(): Promise<FieldNote[]> {
  const pages = (await getAllContentPages()).filter((page) =>
    isPublishedPublicPage(page, "Writing")
  );
  const notes = await Promise.all(pages.map(toFieldNote));

  return notes.filter(isDefined).sort(byNewestDate);
}

export async function fetchNotionCrashReports(): Promise<CrashReport[]> {
  const pages = (await getAllContentPages()).filter((page) =>
    isPublishedPublicPage(page, "Lesson")
  );
  const reports = await Promise.all(pages.map(toCrashReport));

  return reports.filter(isDefined).sort(byNewestDate);
}

async function toFieldNote(page: NotionPage): Promise<FieldNote | null> {
  const properties = page.properties;
  const title = getText(properties, "Name");
  const slug = getText(properties, "Slug");
  const date = getDate(properties, "Date");

  if (!title || !slug || !date) return null;

  const content = await getPageMarkdown(page, title);

  return {
    title,
    slug,
    date,
    type: "field-note",
    category: getSelectName(properties, "Category") || "Technical",
    tags: getTags(properties, "Tags"),
    status: "published",
    visibility: "public",
    mood: getSelectName(properties, "Mood"),
    excerpt: getText(properties, "Excerpt") || firstParagraph(content).slice(0, 160),
    relatedProject: getText(properties, "RelatedProject"),
    relatedCrashReport: getText(properties, "RelatedLesson"),
    readingTime: calculateReadingTime(content),
    content,
  };
}

async function toCrashReport(page: NotionPage): Promise<CrashReport | null> {
  const properties = page.properties;
  const title = getText(properties, "Name");
  const slug = getText(properties, "Slug");
  const date = getDate(properties, "Date");

  if (!title || !slug || !date) return null;

  const content = await getPageMarkdown(page, title);

  return {
    title,
    slug,
    date,
    severity: (getSelectName(properties, "Severity") || "Medium") as CrashReport["severity"],
    system: getText(properties, "System") || "General",
    status: "published",
    lesson: getText(properties, "Lesson") || getText(properties, "Excerpt") || firstParagraph(content),
    tags: getTags(properties, "Tags"),
    relatedProject: getText(properties, "RelatedProject"),
    readingTime: calculateReadingTime(content),
    content,
  };
}
