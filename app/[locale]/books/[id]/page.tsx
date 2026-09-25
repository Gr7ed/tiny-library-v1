import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiHeart } from "react-icons/fi";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { getBookById } from "@/app/lib/books";
import { getMessages, isLocale, localizedPath, type Locale } from "@/app/i18n";

export default async function LocaleBookPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale: value, id } = await params;
  if (!isLocale(value)) notFound();
  const locale: Locale = value;
  const copy = getMessages(locale);
  const book = getBookById(id);
  if (!book) notFound();

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 md:py-16 lg:px-8">
      <Link href={localizedPath(locale, "/books")} className="mb-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
        <FiArrowLeft /> {copy.backToCollection}
      </Link>
      <Card className="overflow-hidden rounded-3xl">
        <div className="grid gap-0 md:grid-cols-[0.8fr_1.2fr]">
          <div className="bg-surface-muted p-5 sm:p-8"><Image src={book.image} alt={locale === "ar" ? `غلاف كتاب ${book.name}` : `Cover of ${book.name}`} width={600} height={450} className="h-auto w-full rounded-2xl object-cover" unoptimized /></div>
          <CardContent className="flex flex-col gap-6 p-6 sm:p-10">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{book.category.replace("-", " ")}</span>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">{book.name}</h1>
            <p className="text-xl text-muted">{locale === "ar" ? `بقلم ${book.author}` : `by ${book.author}`}</p>
            <div className="flex items-center gap-2 text-sm font-semibold text-muted"><FiHeart className="text-accent" /> {copy.readersLikeThis(book.likes)}</div>
            <div className="mt-auto border-t border-border pt-6"><Button asChild><Link href={localizedPath(locale, "/books")}>{copy.discoverAnother}</Link></Button></div>
          </CardContent>
        </div>
      </Card>
    </main>
  );
}
