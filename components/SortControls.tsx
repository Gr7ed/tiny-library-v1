"use client";

import { getMessages, type Locale } from "@/lib/i18n";
import { bookSorts, type BookSort } from "@/types";
import { SortButton } from "@/components/SortButton";

type SortControlsProps = {
  locale: Locale;
  activeSort: BookSort;
  isPending: boolean;
  onChange: (sort: BookSort) => void;
};

export function SortControls({ locale, activeSort, isPending, onChange }: SortControlsProps) {
  const copy = getMessages(locale);
  const labels: Record<BookSort, string> = {
    default: copy.sortDefault,
    alpha: copy.sortAlpha,
    likes: copy.sortLikes,
    newest: copy.sortNewest,
  };

  return (
    <div
      className="flex flex-wrap items-center gap-2"
      aria-label={copy.sortBooks}
      aria-busy={isPending}
      role="group"
    >
      <span className="mr-1 text-sm font-bold text-foreground">{copy.sortBooks}</span>
      {bookSorts.map((sort) => (
        <SortButton
          key={sort}
          sort={sort}
          active={activeSort === sort}
          disabled={isPending}
          onClick={() => onChange(sort)}
        >
          {labels[sort]}
        </SortButton>
      ))}
      <span className="sr-only" aria-live="polite">
        {isPending ? copy.loading : ""}
      </span>
    </div>
  );
}