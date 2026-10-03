import { notFound } from "next/navigation";
import { BookCollection } from "@/components/BookCollection";
import { BooksSearch } from "@/components/BooksSearch";
import { SortControls } from "@/components/SortControls";
import { getBooksPage } from "@/lib/books";
import { getMessages, isLocale, type Locale } from "@/lib/i18n";
import { bookSorts, type BookSort } from "@/types";

export default async function LocaleBooksPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string; q?: string; sort?: string }>;
}) {
  const { locale: value } = await params;
  if (!isLocale(value)) notFound();
  const locale: Locale = value;
  const copy = getMessages(locale);
  const { page, q = "", sort: requestedSort } = await searchParams;
  const sort: BookSort = bookSorts.includes(requestedSort as BookSort)
    ? (requestedSort as BookSort)
    : "default";
  const books = getBooksPage({ locale, page: Number(page), query: q, sort });

  return (
    <>
      <BooksSearch locale={locale} />
      <BookCollection
        booksPage={books}
        locale={locale}
        eyebrow={copy.collectionEyebrow}
        title={copy.collectionTitle}
        description={copy.collectionDescription}
        query={q}
        basePath="/books"
        sort={sort}
      />
    </>
  );
}
