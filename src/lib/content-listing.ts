import type { CrashReport, FieldNote } from "./types";

export type ListingSearchParams = Record<string, string | string[] | undefined>;

export interface ListingFilters {
  q: string;
  tag: string;
  category: string;
  severity: string;
  page: number;
}

export interface PaginatedItems<T> {
  items: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  startItem: number;
  endItem: number;
}

const DEFAULT_PAGE = 1;

export function parseListingFilters(searchParams: ListingSearchParams): ListingFilters {
  return {
    q: getParam(searchParams, "q"),
    tag: getParam(searchParams, "tag"),
    category: getParam(searchParams, "category"),
    severity: getParam(searchParams, "severity"),
    page: parsePage(getParam(searchParams, "page")),
  };
}

export function filterFieldNotes(notes: FieldNote[], filters: ListingFilters) {
  const query = normalize(filters.q);
  const tag = normalize(filters.tag);
  const category = normalize(filters.category);

  return notes.filter((note) => {
    const matchesQuery =
      !query ||
      [
        note.title,
        note.excerpt,
        note.category,
        note.mood,
        note.content,
        ...note.tags,
      ].some((value) => normalize(value).includes(query));

    const matchesTag = !tag || note.tags.some((value) => normalize(value) === tag);
    const matchesCategory = !category || normalize(note.category) === category;

    return matchesQuery && matchesTag && matchesCategory;
  });
}

export function filterCrashReports(reports: CrashReport[], filters: ListingFilters) {
  const query = normalize(filters.q);
  const tag = normalize(filters.tag);
  const severity = normalize(filters.severity);

  return reports.filter((report) => {
    const matchesQuery =
      !query ||
      [
        report.title,
        report.lesson,
        report.system,
        report.severity,
        report.content,
        ...report.tags,
      ].some((value) => normalize(value).includes(query));

    const matchesTag = !tag || report.tags.some((value) => normalize(value) === tag);
    const matchesSeverity = !severity || normalize(report.severity) === severity;

    return matchesQuery && matchesTag && matchesSeverity;
  });
}

export function paginateItems<T>(
  items: T[],
  requestedPage: number,
  pageSize: number
): PaginatedItems<T> {
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const currentPage = clamp(requestedPage, DEFAULT_PAGE, totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const pageItems = items.slice(startIndex, startIndex + pageSize);

  return {
    items: pageItems,
    currentPage,
    totalPages,
    totalItems,
    startItem: totalItems === 0 ? 0 : startIndex + 1,
    endItem: Math.min(startIndex + pageItems.length, totalItems),
  };
}

export function uniqueSorted(values: string[]) {
  return Array.from(new Set(values.filter(Boolean))).sort((a, b) =>
    a.localeCompare(b)
  );
}

export function getFieldNoteFilterOptions(notes: FieldNote[]) {
  return {
    categories: uniqueSorted(notes.map((note) => note.category)),
    tags: uniqueSorted(notes.flatMap((note) => note.tags)),
  };
}

export function getCrashReportFilterOptions(reports: CrashReport[]) {
  return {
    severities: uniqueSorted(reports.map((report) => report.severity)),
    tags: uniqueSorted(reports.flatMap((report) => report.tags)),
  };
}

export function buildListingHref(
  basePath: string,
  filters: ListingFilters,
  overrides: Partial<ListingFilters> = {}
) {
  const next = { ...filters, ...overrides };
  const params = new URLSearchParams();

  if (next.q.trim()) params.set("q", next.q.trim());
  if (next.tag.trim()) params.set("tag", next.tag.trim());
  if (next.category.trim()) params.set("category", next.category.trim());
  if (next.severity.trim()) params.set("severity", next.severity.trim());
  if (next.page > DEFAULT_PAGE) params.set("page", String(next.page));

  const query = params.toString();
  return query ? `${basePath}?${query}` : basePath;
}

export function hasActiveFilters(filters: ListingFilters) {
  return Boolean(
    filters.q.trim() ||
      filters.tag.trim() ||
      filters.category.trim() ||
      filters.severity.trim()
  );
}

function getParam(searchParams: ListingSearchParams, key: string) {
  const value = searchParams[key];
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

function parsePage(value: string) {
  const page = Number.parseInt(value, 10);
  return Number.isFinite(page) && page > 0 ? page : DEFAULT_PAGE;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function normalize(value: string) {
  return value.trim().toLowerCase();
}
