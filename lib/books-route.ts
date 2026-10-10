import { bookSorts, type BookSort, type BooksRouteSearchParams } from "../types";

function isValidPage(value: string | undefined): boolean {
  if (value === undefined) return true;

  const page = Number(value);
  return /^[1-9]\d*$/.test(value) && Number.isSafeInteger(page);
}

export function getSafeBooksQuery({
  page,
  q,
  sort,
  totalPages,
}: BooksRouteSearchParams): string | null {
  const validPage =
    isValidPage(page) &&
    (page === undefined || totalPages === undefined || Number(page) <= totalPages);
  const validSort = sort === undefined || bookSorts.includes(sort as BookSort);

  if (validPage && validSort) return null;

  const params = new URLSearchParams();
  if (q?.trim()) params.set("q", q);

  if (page && isValidPage(page)) {
    const requestedPage = Number(page);
    const safePage =
      totalPages !== undefined ? Math.min(requestedPage, totalPages) : requestedPage;
    if (safePage > 1) {
      params.set("page", String(safePage));
    }
  }

  if (validSort && sort && sort !== "default") {
    params.set("sort", sort);
  }

  return params.toString();
}
