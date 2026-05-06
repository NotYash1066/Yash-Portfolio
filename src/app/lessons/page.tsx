import type { Metadata } from "next";
import { getAllCrashReports } from "@/lib/content";
import {
  filterCrashReports,
  getCrashReportFilterOptions,
  paginateItems,
  parseListingFilters,
  type ListingSearchParams,
} from "@/lib/content-listing";
import {
  ContentListingControls,
  PaginationControls,
} from "@/components/content/ContentListingControls";
import { CrashReportCard } from "@/components/content/CrashReportCard";
import { ScrollReveal } from "@/components/layout/ScrollReveal";

const LESSONS_PAGE_SIZE = 6;

export const metadata: Metadata = {
  title: "Lessons",
  description: "Engineering maturity through mistakes — bugs, failed assumptions, and lessons.",
};

export default async function LessonsPage({
  searchParams,
}: {
  searchParams: Promise<ListingSearchParams>;
}) {
  const filters = parseListingFilters(await searchParams);
  const reports = await getAllCrashReports();
  const options = getCrashReportFilterOptions(reports);
  const filteredReports = filterCrashReports(reports, filters);
  const paginatedReports = paginateItems(
    filteredReports,
    filters.page,
    LESSONS_PAGE_SIZE
  );

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "4rem 1rem",
        minHeight: "80vh",
      }}
    >
      {/* Header */}
      <ScrollReveal>
      <div style={{ marginBottom: "3rem", maxWidth: "650px" }}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            color: "var(--accent)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            fontWeight: 700,
            display: "block",
            marginBottom: "0.75rem",
          }}
        >
          Lessons
        </span>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 800,
            color: "var(--fg)",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: "1rem",
          }}
        >
          What broke, and what it taught me
        </h1>
        <p
          style={{
            fontSize: "0.95rem",
            color: "var(--fg-secondary)",
            lineHeight: 1.7,
          }}
        >
          Bugs, failed assumptions, and production incidents — documented honestly. Every crash report follows the same structure: what happened, why it happened, how I fixed it, and what I&apos;ll do differently next time.
        </p>
      </div>
      </ScrollReveal>

      <ScrollReveal delay={75}>
        <ContentListingControls
          basePath="/lessons"
          currentType="Lesson"
          filters={{ ...filters, page: 1 }}
          filteredCount={filteredReports.length}
          totalCount={reports.length}
          pageLabel="reports"
          searchPlaceholder="Search lessons"
          selects={[
            {
              name: "severity",
              label: "Severity",
              value: filters.severity,
              allLabel: "All severities",
              options: options.severities,
            },
            {
              name: "tag",
              label: "Tag",
              value: filters.tag,
              allLabel: "All tags",
              options: options.tags,
            },
          ]}
        />
      </ScrollReveal>

      {/* Reports */}
      {paginatedReports.items.length > 0 ? (
        <ScrollReveal delay={100}>
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
                gap: "1.25rem",
              }}
            >
              {paginatedReports.items.map((report, i) => (
                <CrashReportCard
                  key={report.slug}
                  report={report}
                  index={paginatedReports.startItem + i - 1}
                />
              ))}
            </div>
            <PaginationControls
              basePath="/lessons"
              filters={filters}
              currentPage={paginatedReports.currentPage}
              totalPages={paginatedReports.totalPages}
              startItem={paginatedReports.startItem}
              endItem={paginatedReports.endItem}
              totalItems={paginatedReports.totalItems}
            />
          </>
        </ScrollReveal>
      ) : (
        <div
          style={{
            padding: "4rem 2rem",
            textAlign: "center",
            border: "2px solid var(--border)",
          }}
        >
          <p style={{ color: "var(--fg-muted)", fontSize: "0.9rem", fontFamily: "var(--font-mono)" }}>
            No lessons matched this view.
          </p>
        </div>
      )}
    </div>
  );
}
