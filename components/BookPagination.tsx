import Link from "next/link";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { getMessages, localizedPath, type Locale } from "@/lib/i18n";
import type { BookSort } from "@/types";

type BookPaginationProps = {
  basePath: string;
  locale: Locale;
  page: number;
  query: string;
  sort?: BookSort;
  totalPages: number;
};

function pageHref(locale: Locale, basePath: string, page: number, query: string, sort?: BookSort) {
  const params = new URLSearchParams();
  if (query.trim()) params.set("q", query.trim());
  if (sort && sort !== "default") params.set("sort", sort);
  if (page > 1) params.set("page", String(page));
  const search = params.toString();
  return `${localizedPath(locale, basePath)}${search ? `?${search}` : ""}`;
}

export function BookPagination({
  basePath,
  locale,
  page,
  query,
  sort,
  totalPages,
}: BookPaginationProps) {
  const copy = getMessages(locale);
  const previousPage = page - 1;
  const nextPage = page + 1;

  return (
    <nav className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5" aria-label={copy.collection}>
      {previousPage > 0 ? (
        <Link
          href={pageHref(locale, basePath, previousPage, query, sort)}
          className="inline-flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <FiArrowLeft aria-hidden="true" className="rtl:rotate-180" />
          {copy.previousPage}
        </Link>
      ) : (
        <span />
      )}
      <span className="text-sm font-semibold text-muted" aria-current="page">
        {copy.pageOf(page, totalPages)}
      </span>
      {nextPage <= totalPages ? (
        <Link
          href={pageHref(locale, basePath, nextPage, query, sort)}
          className="inline-flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {copy.nextPage}
          <FiArrowRight aria-hidden="true" className="rtl:rotate-180" />
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}