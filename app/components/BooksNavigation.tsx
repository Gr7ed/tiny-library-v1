"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiGrid } from "react-icons/fi";
import { bookCategories } from "@/app/types";
import { categoryLabel, getMessages, localizedPath, type Locale } from "@/app/i18n";

export function BooksNavigation({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const copy = getMessages(locale);
  const items = [
    { href: "/books", label: copy.allBooks },
    ...bookCategories.map((category) => ({
      href: `/books/category/${category}`,
      label: categoryLabel(locale, category),
    })),
  ];

  return (
    <aside className="sticky top-0 z-30 -mx-4 mb-6 self-start bg-background/95 px-4 py-2 backdrop-blur sm:-mx-6 sm:px-6 lg:sticky md:sticky lg:top-10 md:top-10 lg:z-auto lg:mx-0 lg:mb-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
      <div className="rounded-2xl border border-border bg-surface/95 p-3 shadow-sm sm:p-4 lg:sticky lg:top-24">
        <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-foreground sm:mb-4 sm:text-sm">
          <FiGrid className="text-accent" aria-hidden="true" />
          {copy.browseByCategory}
        </div>
        <nav aria-label={copy.browseByCategory}>
          <ul className="flex gap-2 overflow-x-auto pb-1 scrollbar-none lg:flex-col lg:overflow-visible [&::-webkit-scrollbar]:hidden">
            {items.map((item) => {
              const href = localizedPath(locale, item.href);
              const active = pathname === href;
              return (
                <li key={item.href} className="shrink-0">
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={clsx(
                      "block whitespace-nowrap rounded-xl px-3 py-2 text-sm font-semibold capitalize transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                      active ? "bg-accent text-white shadow-sm" : "text-muted hover:bg-surface-muted hover:text-accent",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
