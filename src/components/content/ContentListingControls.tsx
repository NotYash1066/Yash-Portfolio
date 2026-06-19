import Link from "next/link";
import type { CSSProperties } from "react";
import {
  buildListingHref,
  hasActiveFilters,
  type ListingFilters,
} from "@/lib/content-listing";

interface SelectFilter {
  name: "category" | "severity" | "tag";
  label: string;
  value: string;
  allLabel: string;
  options: string[];
}

interface ContentListingControlsProps {
  basePath: string;
  currentType: "Writing" | "Lesson";
  filters: ListingFilters;
  filteredCount: number;
  totalCount: number;
  pageLabel: string;
  searchPlaceholder: string;
  selects: SelectFilter[];
}

export function ContentListingControls({
  basePath,
  currentType,
  filters,
  filteredCount,
  totalCount,
  pageLabel,
  searchPlaceholder,
  selects,
}: ContentListingControlsProps) {
  const activeFilters = hasActiveFilters(filters);

  return (
    <div
      style={{
        border: "2px solid var(--border)",
        boxShadow: "var(--shadow-brutal-sm)",
        background: "var(--surface)",
        padding: "1rem",
        marginBottom: "1.5rem",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
          flexWrap: "wrap",
          marginBottom: "1rem",
        }}
      >
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <TypeLink href="/writing" label="Writing" active={currentType === "Writing"} />
          <TypeLink href="/lessons" label="Lessons" active={currentType === "Lesson"} />
        </div>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            color: "var(--fg-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            alignSelf: "center",
          }}
        >
          {filteredCount} / {totalCount} {pageLabel}
        </span>
      </div>

      <form
        action={basePath}
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.75rem",
          alignItems: "stretch",
        }}
      >
        <input
          name="q"
          type="search"
          defaultValue={filters.q}
          placeholder={searchPlaceholder}
          aria-label={`Search ${pageLabel}`}
          style={{ ...controlStyle, flex: "1 1 260px" }}
        />

        {selects.map((select) => (
          <label key={select.name} style={{ display: "contents" }}>
            <span className="sr-only">{select.label}</span>
            <select
              name={select.name}
              defaultValue={select.value}
              aria-label={select.label}
              style={{ ...controlStyle, flex: "1 1 170px" }}
            >
              <option value="">{select.allLabel}</option>
              {select.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        ))}

        <button type="submit" className="btn-primary">
          Apply
        </button>
        {activeFilters ? (
          <Link href={basePath} className="btn-secondary">
            Clear
          </Link>
        ) : null}
      </form>
    </div>
  );
}

interface PaginationControlsProps {
  basePath: string;
  filters: ListingFilters;
  currentPage: number;
  totalPages: number;
  startItem: number;
  endItem: number;
  totalItems: number;
}

export function PaginationControls({
  basePath,
  filters,
  currentPage,
  totalPages,
  startItem,
  endItem,
  totalItems,
}: PaginationControlsProps) {
  if (totalPages <= 1) return null;

  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <nav
      aria-label="Pagination"
      style={{
        marginTop: "2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "1rem",
        flexWrap: "wrap",
        borderTop: "2px solid var(--border)",
        paddingTop: "1.25rem",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.75rem",
          color: "var(--fg-muted)",
        }}
      >
        {startItem}-{endItem} of {totalItems}
      </span>

      <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
        {hasPrevious ? (
          <Link
            className="btn-secondary"
            href={buildListingHref(basePath, filters, { page: currentPage - 1 })}
          >
            Previous
          </Link>
        ) : null}
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            color: "var(--fg-secondary)",
            minWidth: "6rem",
            textAlign: "center",
          }}
        >
          {currentPage} / {totalPages}
        </span>
        {hasNext ? (
          <Link
            className="btn-primary"
            href={buildListingHref(basePath, filters, { page: currentPage + 1 })}
          >
            Next
          </Link>
        ) : null}
      </div>
    </nav>
  );
}

function TypeLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      style={{
        display: "inline-flex",
        alignItems: "center",
        minHeight: "34px",
        padding: "0.35rem 0.7rem",
        border: "2px solid var(--border)",
        background: active ? "var(--accent)" : "transparent",
        color: active ? "var(--bg)" : "var(--fg)",
        fontFamily: "var(--font-mono)",
        fontSize: "0.7rem",
        fontWeight: 800,
        textDecoration: "none",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
      }}
    >
      {label}
    </Link>
  );
}

const controlStyle = {
  width: "100%",
  minHeight: "44px",
  border: "2px solid var(--border)",
  borderRadius: 0,
  background: "var(--bg)",
  color: "var(--fg)",
  padding: "0.7rem 0.85rem",
  fontFamily: "var(--font-mono)",
  fontSize: "0.8rem",
  fontWeight: 700,
} satisfies CSSProperties;
