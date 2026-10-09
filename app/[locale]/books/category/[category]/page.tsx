import { notFound } from "next/navigation";
import { BooksBrowser } from "@/components/BooksBrowser";
import { getBooksPage } from "@/lib/books";
import { categoryLabel, getMessages, isLocale, locales, type Locale } from "@/lib/i18n";
import { bookCategories, bookSorts, type BookCategory, type BookSort } from "@/types";

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
  searchParams: Promise<{ page?: string; q?: string; sort?: string }>;
}) {
  const { locale: value, category } = await params;
  if (!isLocale(value) || !isBookCategory(category)) notFound();
  const locale: Locale = value;
  const copy = getMessages(locale);
  const label = categoryLabel(locale, category);
  const { page, q = "", sort: requestedSort } = await searchParams;
  const sort: BookSort = bookSorts.includes(requestedSort as BookSort)
    ? (requestedSort as BookSort)
    : "default";
  const books = getBooksPage({ category, locale, page: Number(page), query: q, sort });

  return (
    <BooksBrowser
      books={books.items.map((book) => ({ ...book }))}
      locale={locale}
      eyebrow={copy.categoryEyebrow}
      title={label}
      description={copy.categoryDescription(label)}
      search={q}
      categoryName={label}
      basePath={`/books/category/${category}`}
      page={books.page}
      total={books.total}
      totalPages={books.totalPages}
      sort={sort}
    />
  );
}
