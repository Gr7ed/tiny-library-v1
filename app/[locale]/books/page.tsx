import { notFound } from "next/navigation";
import { BooksCollection } from "@/components/BooksCollection";
import { getBooksPage } from "@/lib/books";
import { getMessages, isLocale, type Locale } from "@/lib/i18n";
import { delayForLoadingUi } from "@/lib/loading-delay";
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
  await delayForLoadingUi();
  const books = getBooksPage({ locale, page: Number(page), query: q, sort });

  return (
    <BooksCollection
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
