import { notFound } from "next/navigation";
import { BookCollection } from "@/components/BookCollection";
import { getBooksPage } from "@/lib/books";
import { getMessages, isLocale, type Locale } from "@/lib/i18n";

export default async function LocaleBooksPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string; q?: string }>;
}) {
  const { locale: value } = await params;
  if (!isLocale(value)) notFound();
  const locale: Locale = value;
  const copy = getMessages(locale);
  const { page, q = "" } = await searchParams;
  const books = getBooksPage({ locale, page: Number(page), query: q });

  return (
    <BookCollection
      booksPage={books}
      locale={locale}
      eyebrow={copy.collectionEyebrow}
      title={copy.collectionTitle}
      description={copy.collectionDescription}
      query={q}
      basePath="/books"
    />
  );
}
