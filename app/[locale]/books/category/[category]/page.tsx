import { notFound } from "next/navigation";
import { BookCard } from "@/app/components/BookCard";
import { BookCollectionHeader } from "@/app/components/BookCollectionHeader";
import { getBooksByCategory } from "@/app/lib/books";
import { categoryLabel, getMessages, isLocale, locales, type Locale } from "@/app/i18n";
import { bookCategories, type BookCategory } from "@/app/types";

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
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale: value, category } = await params;
  if (!isLocale(value) || !isBookCategory(category)) notFound();
  const locale: Locale = value;
  const copy = getMessages(locale);
  const label = categoryLabel(locale, category);
  const books = getBooksByCategory(category);

  return (
    <section className="flex min-w-0 flex-col gap-7 sm:gap-10">
      <BookCollectionHeader eyebrow={copy.categoryEyebrow} title={label} description={copy.categoryDescription(label)} count={books.length} locale={locale} />
      <div className="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {books.map((book) => <BookCard key={book.id} book={book} locale={locale} />)}
      </div>
    </section>
  );
}
