import { redirect } from "next/navigation";
import { BooksBrowser } from "@/components/BooksBrowser";
import { getBooksPage } from "@/lib/books";
import { getSafeBooksQuery } from "@/lib/books-route";
import { categoryLabel, getMessages, isLocale } from "@/lib/i18n";
import {
  bookCategories,
  bookSorts,
  locales,
  type BookCategory,
  type BookSort,
  type BooksSearchParams,
  type Locale,
} from "@/types";

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
  searchParams: Promise<BooksSearchParams>;
}) {
  const { locale: value, category } = await params;
  if (!isLocale(value)) redirect("/en/books");
  if (!isBookCategory(category)) redirect(`/${value}/books`);
  const locale: Locale = value;
  const copy = getMessages(locale);
  const label = categoryLabel(locale, category);
  const { page, q = "", sort: requestedSort } = await searchParams;
  const sort: BookSort = bookSorts.includes(requestedSort as BookSort)
    ? (requestedSort as BookSort)
    : "default";
  const books = getBooksPage({ category, locale, page: Number(page), query: q, sort });
  const safeQuery = getSafeBooksQuery({
    page,
    q,
    sort: requestedSort,
    totalPages: books.totalPages,
  });
  if (safeQuery !== null) {
    redirect(`/${locale}/books/category/${category}${safeQuery ? `?${safeQuery}` : ""}`);
  }

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
