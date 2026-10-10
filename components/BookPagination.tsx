import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import { PaginationButton } from "@/components/PaginationButton";
import { getMessages, localizedPath } from "@/lib/i18n";
import type { BookSort, Locale } from "@/types";

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

function getPageNumbers(page: number, totalPages: number) {
  if (totalPages <= 3) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (page === 1) {
    return [1, 2, totalPages];
  }

  if (page === totalPages) {
    return [1, totalPages - 1, totalPages];
  }

  return [...new Set([1, page - 1, page, page + 1, totalPages])];
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
  const pageNumbers = getPageNumbers(page, totalPages);

  return (
    <nav
      className="flex justify-center border-t border-border pt-5"
      aria-label={copy.collection}
    >
      <div className="flex flex-wrap items-center justify-center gap-2">
        {pageNumbers.map((pageNumber) => (
          <PaginationButton
            key={pageNumber}
            href={pageHref(locale, basePath, pageNumber, query, sort)}
            active={pageNumber === page}
            aria-label={copy.pageOf(pageNumber, totalPages)}
          >
            {pageNumber === 1 && page !== pageNumber && totalPages > 1 ? (
              <FiChevronsLeft aria-hidden="true" className="rtl:rotate-180" />
            ) : pageNumber === totalPages && page !== pageNumber && totalPages > 1 ? (
              <FiChevronsRight aria-hidden="true" className="rtl:rotate-180" />
            ) : (
              pageNumber
            )}
          </PaginationButton>
        ))}
      </div>
    </nav>
  );
}