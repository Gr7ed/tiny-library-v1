"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getMessages, type Locale } from "@/lib/i18n";
import { bookSorts, type BookSort } from "@/types";
import { SortButton } from "@/components/SortButton";

type SortControlsProps = {
  locale: Locale;
};

export function SortControls({ locale }: SortControlsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const copy = getMessages(locale);
  const requestedSort = searchParams.get("sort");
  const activeSort: BookSort = bookSorts.includes(requestedSort as BookSort)
    ? (requestedSort as BookSort)
    : "default";
  const labels: Record<BookSort, string> = {
    default: copy.sortDefault,
    alpha: copy.sortAlpha,
    likes: copy.sortLikes,
    newest: copy.sortNewest,
  };

  function updateSort(sort: BookSort) {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");

    if (sort === "default") {
      params.delete("sort");
    } else {
      params.set("sort", sort);
    }

    const nextQuery = params.toString();
    router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, { scroll: false });
  }

  return (
    <div className="flex flex-wrap items-center gap-2" aria-label={copy.sortBooks} role="group">
      <span className="mr-1 text-sm font-bold text-foreground">{copy.sortBooks}</span>
      {bookSorts.map((sort) => (
        <SortButton key={sort} sort={sort} active={activeSort === sort} onClick={() => updateSort(sort)}>
          {labels[sort]}
        </SortButton>
      ))}
    </div>
  );
}