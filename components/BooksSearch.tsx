"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FiSearch } from "react-icons/fi";
import { getMessages, type Locale } from "@/lib/i18n";
import { Input } from "@/components/ui/input";
import { useEffect, useRef } from "react";

export function BooksSearch({ locale }: { locale: Locale }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const copy = getMessages(locale);
  const query = searchParams.get("q") ?? "";
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current?.focus();
    }
  }, [query]);

  function updateQuery(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");

    if (value.trim()) {
      params.set("q", value);
    } else {
      params.delete("q");
    }

    const nextQuery = params.toString();
    router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, { scroll: false });
  }

  return (
    <div className="sticky top-20 z-20 -mx-4 mb-7 px-4 backdrop-blur sm:-mx-6 sm:px-6 lg:top-0 lg:mx-0 lg:px-0">
      <div className="mt-3 mb-3 border-t border-border pt-3 sm:mt-4 sm:pt-4">
        <label className="mb-2 mt-6 block text-xs font-bold uppercase tracking-[0.12em] text-foreground" htmlFor="book-search">
          {copy.searchBooks}
        </label>
        <div className="relative" ref={ref}>
          <FiSearch aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-accent" />
          <Input
            id="book-search"
            value={query}
            onChange={(event) => updateQuery(event.target.value)}
            placeholder={copy.searchBooksPlaceholder}
            aria-label={copy.searchBooks}
            className="pl-10"
          />
        </div>
      </div>
    </div>
  );
}
