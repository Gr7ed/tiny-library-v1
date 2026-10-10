import { redirect } from "next/navigation";
import { BooksBrowser } from "@/components/BooksBrowser";
import { getBooksPage } from "@/lib/books";
import { getSafeBooksQuery } from "@/lib/books-route";
import { getMessages, isLocale } from "@/lib/i18n";
import { bookSorts, type BookSort, type BooksSearchParams, type Locale } from "@/types";

export default async function LocaleBooksPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<BooksSearchParams>;
}) {
  const { locale: value } = await params;
  if (!isLocale(value)) redirect("/en/books");
  const locale: Locale = value;
  const copy = getMessages(locale);
  const { page, q = "", sort: requestedSort } = await searchParams;
  const sort: BookSort = bookSorts.includes(requestedSort as BookSort)
    ? (requestedSort as BookSort)
    : "default";
  const books = getBooksPage({ locale, page: Number(page), query: q, sort });
  const safeQuery = getSafeBooksQuery({
    page,
    q,
    sort: requestedSort,
    totalPages: books.totalPages,
  });
  if (safeQuery !== null) {
    redirect(`/${locale}/books${safeQuery ? `?${safeQuery}` : ""}`);
  }

  return (
    <BooksBrowser
      books={books.items.map((book) => ({ ...book }))}
      locale={locale}
      eyebrow={copy.collectionEyebrow}
      title={copy.collectionTitle}
      description={copy.collectionDescription}
      search={q}
      basePath="/books"
      page={books.page}
      total={books.total}
      totalPages={books.totalPages}
      sort={sort}
    />
  );
}
