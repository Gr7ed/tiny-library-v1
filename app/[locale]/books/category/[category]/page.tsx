import { notFound } from "next/navigation";
import { BookCard } from "@/components/BookCard";
import { BookCollectionHeader } from "@/components/BookCollectionHeader";
import { getBooksByCategory, searchBooks } from "@/lib/books";
import { categoryLabel, getMessages, isLocale, locales, type Locale } from "@/lib/i18n";
import { bookCategories, type BookCategory } from "@/types";

function isBookCategory(value: string): value is BookCategory {
  return bookCategories.includes(value as BookCategory);
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    bookCategories.map((category) => ({ locale, category })),
  );
}

export default async function LocaleCategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; category: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { locale: value, category } = await params;
  if (!isLocale(value) || !isBookCategory(category)) notFound();
  const locale: Locale = value;
  const copy = getMessages(locale);
  const label = categoryLabel(locale, category);
  const { q = "" } = await searchParams;
  const books = searchBooks(getBooksByCategory(category), q, locale);

  return (
    <section className="flex min-w-0 flex-col gap-7 sm:gap-10">
      <BookCollectionHeader eyebrow={copy.categoryEyebrow} title={label} description={copy.categoryDescription(label)} count={books.length} locale={locale} />
      {books.length > 0 ? (
        <div className="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {books.map((book) => <BookCard key={book.id} book={book} locale={locale} />)}
        </div>
      ) : (
        <p className="rounded-2xl border border-dashed border-border bg-surface-muted p-8 text-center text-muted">
          {copy.noSearchResults(q)}
        </p>
      )}
    </section>
  );
}
