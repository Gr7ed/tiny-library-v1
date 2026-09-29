import { BookCard } from "@/components/BookCard";
import { BookCollectionHeader } from "@/components/BookCollectionHeader";
import { BookPagination } from "@/components/BookPagination";
import { getMessages, type Locale } from "@/lib/i18n";
import type { BooksPage } from "@/types";

type BookCollectionProps = {
  booksPage: BooksPage;
  locale: Locale;
  eyebrow: string;
  title: string;
  description: string;
  query: string;
  basePath: string;
};

export function BookCollection({
  booksPage,
  locale,
  eyebrow,
  title,
  description,
  query,
  basePath,
}: BookCollectionProps) {
  const copy = getMessages(locale);
  const { items: books } = booksPage;

  return (
    <section className="flex min-w-0 flex-col gap-7 sm:gap-10">
      <BookCollectionHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        count={booksPage.total}
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
          {copy.noSearchResults(query)}
        </p>
      )}
      {booksPage.totalPages > 1 ? (
        <BookPagination
          basePath={basePath}
          locale={locale}
          page={booksPage.page}
          query={query}
          totalPages={booksPage.totalPages}
        />
      ) : null}
    </section>
  );
}