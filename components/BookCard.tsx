import Image from "next/image";
import Link from "next/link";
import { FiHeart } from "react-icons/fi";
import { Card } from "@/components/ui/card";
import { categoryLabel, localizedPath, type Locale } from "@/lib/i18n";
import type { Book } from "@/types";

export function BookCard({ book, locale = "en" }: { book: Book; locale?: Locale }) {
  return (
    <Link
      href={localizedPath(locale, `/books/${book.id}`)}
    >
    <Card className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl transition-all duration-200 hover:-translate-y-1 hover:border-accent/60 hover:shadow-lg">
      <div className="relative aspect-4/3 min-w-0 overflow-hidden bg-surface-muted">
        <Image
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={book.image}
          alt={locale === "ar" ? `غلاف كتاب ${book.name}` : `Cover of ${book.name}`}
          width={300}
          height={225}
          unoptimized
        />
        <span className="absolute left-3 top-3 max-w-[calc(100%-1.5rem)] truncate rounded-full bg-background/90 px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-green backdrop-blur">
          {categoryLabel(locale, book.category)}
        </span>
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-3 p-4 sm:p-5">
        <div className="flex min-w-0 flex-wrap items-center justify-between gap-x-3 gap-y-1 text-xs text-muted sm:text-sm">
          <span className="min-w-0 wrap-break-word">by {book.author}</span>
          <span className="inline-flex shrink-0 items-center gap-1">
            <FiHeart aria-hidden="true" className="text-accent" /> {book.likes}
          </span>
        </div>
        <h2 className="wrap-break-word text-lg font-bold leading-tight text-foreground sm:text-xl">
          {book.name}
        </h2>
      </div>
    </Card>
    </Link>
  );
}
