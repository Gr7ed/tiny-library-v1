"use client";

import { FiSearch } from "react-icons/fi";
import { getMessages, type Locale } from "@/lib/i18n";
import { Input } from "@/components/ui/input";
import { useEffect, useRef } from "react";

type BooksSearchProps = {
  locale: Locale;
  value: string;
  isPending: boolean;
  onChange: (value: string) => void;
};

export function BooksSearch({ locale, value, isPending, onChange }: BooksSearchProps) {
  const copy = getMessages(locale);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  return (
    <div
      className="sticky top-20 z-20 -mx-4 mb-7 px-4 backdrop-blur sm:-mx-6 sm:px-6 lg:top-0 lg:mx-0 lg:px-0"
      aria-busy={isPending}
    >
      <div className="mt-3 mb-3 border-t border-border pt-3 sm:mt-4 sm:pt-4">
        <label className="mb-2 mt-6 block text-xs font-bold uppercase tracking-[0.12em] text-foreground" htmlFor="book-search">
          {copy.searchBooks}
        </label>
        <div className="relative" ref={ref}>
          <FiSearch aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-accent" />
          <Input
            id="book-search"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder={copy.searchBooksPlaceholder}
            aria-label={copy.searchBooks}
            aria-describedby="book-search-status"
            className="pl-10"
          />
        </div>
        <p id="book-search-status" className="sr-only" aria-live="polite">
          {isPending ? copy.loading : ""}
        </p>
      </div>
    </div>
  );
}
