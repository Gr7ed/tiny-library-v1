import { notFound } from "next/navigation";
import { BookCard } from "@/app/components/BookCard";
import { BookCollectionHeader } from "@/app/components/BookCollectionHeader";
import { getBooks, searchBooks } from "@/app/lib/books";
import { getMessages, isLocale, type Locale } from "@/app/i18n";

export default async function LocaleBooksPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { locale: value } = await params;
  if (!isLocale(value)) notFound();
  const locale: Locale = value;
  const copy = getMessages(locale);
  const { q = "" } = await searchParams;
  const books = searchBooks(getBooks(), q, locale);

  return (
    <section className="flex min-w-0 flex-col gap-7 sm:gap-10">
      <BookCollectionHeader eyebrow={copy.collectionEyebrow} title={copy.collectionTitle} description={copy.collectionDescription} count={books.length} locale={locale} />
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
