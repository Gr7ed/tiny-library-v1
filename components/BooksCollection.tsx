"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useOptimistic, useTransition } from "react";
import { BookCard } from "@/components/BookCard";
import { BookCollectionHeader } from "@/components/BookCollectionHeader";
import { BookPagination } from "@/components/BookPagination";
import { BooksSearch } from "@/components/BooksSearch";
import { SortControls } from "@/components/SortControls";
import { getMessages, type Locale } from "@/lib/i18n";
import { bookSorts, type Book, type BookSort } from "@/types";

type BooksCollectionProps = {
  books: Book[];
  locale: Locale;
  eyebrow: string;
  title: string;
  description: string;
  search?: string;
  categoryName?: string;
  basePath: string;
  page: number;
  total: number;
  totalPages: number;
  sort: BookSort;
};

export function BooksCollection({
  books,
  locale,
  eyebrow,
  title,
  description,
  search = "",
  categoryName,
  basePath,
  page,
  total,
  totalPages,
  sort,
}: BooksCollectionProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const routeSearch = searchParams.get("q") ?? search;
  const [searchValue, setSearchValue] = useOptimistic(routeSearch);
  const requestedSort = searchParams.get("sort");
  const activeSort: BookSort = bookSorts.includes(requestedSort as BookSort)
    ? (requestedSort as BookSort)
    : sort;
  const copy = getMessages(locale);

  function updateUrl(update: (params: URLSearchParams) => void) {
    const params = new URLSearchParams(searchParams.toString());
    update(params);
    const nextQuery = params.toString();

    startTransition(() => {
      router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, { scroll: false });
    });
  }

  function updateSearch(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    if (value.trim()) {
      params.set("q", value);
    } else {
      params.delete("q");
    }
    const nextQuery = params.toString();

    startTransition(() => {
      setSearchValue(value);
      router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, { scroll: false });
    });
  }

  function updateSort(nextSort: BookSort) {
    updateUrl((params) => {
      params.delete("page");
      if (nextSort === "default") {
        params.delete("sort");
      } else {
        params.set("sort", nextSort);
      }
    });
  }

  return (
    <section className="flex min-w-0 flex-col gap-7 sm:gap-10">
      <BooksSearch
        locale={locale}
        value={searchValue}
        isPending={isPending}
        onChange={updateSearch}
      />
      <SortControls
        locale={locale}
        activeSort={activeSort}
        isPending={isPending}
        onChange={updateSort}
      />
      <BookCollectionHeader
        eyebrow={eyebrow}
        title={categoryName ?? title}
        description={description}
        count={total}
        locale={locale}
      />
      {books.length > 0 ? (
        <div className="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {books.map((book) => (
            <BookCard key={book.id} book={book} locale={locale} />
          ))}
        </div>
      ) : (
        <p className="rounded-2xl border border-dashed border-border bg-surface-muted p-8 text-center text-muted">
          {copy.noSearchResults(searchValue)}
        </p>
      )}
      {totalPages > 1 ? (
        <BookPagination
          basePath={basePath}
          locale={locale}
          page={page}
          query={searchValue}
          sort={sort}
          totalPages={totalPages}
        />
      ) : null}
    </section>
  );
}