"use client";

import { BookCard } from "@/components/BookCard";
import { getMessages, type Locale } from "@/lib/i18n";
import type { Book } from "@/types";

type BooksCollectionProps = {
  books: Book[];
  locale: Locale;
  search?: string;
};

export function BooksCollection({ books, locale, search = "" }: BooksCollectionProps) {
  const copy = getMessages(locale);

  return books.length > 0 ? (
    <div className="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {books.map((book) => (
        <BookCard key={book.id} book={book} locale={locale} />
      ))}
    </div>
  ) : (
    <p className="rounded-2xl border border-dashed border-border bg-surface-muted p-8 text-center text-muted">
      {copy.noSearchResults(search)}
    </p>
  );
}
