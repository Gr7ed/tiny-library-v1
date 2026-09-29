"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FiGrid } from "react-icons/fi";
import { bookCategories } from "@/types";
import { categoryLabel, getMessages, localizedPath, type Locale } from "@/lib/i18n";

export function BooksNavigation({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const navigationRef = useRef<HTMLUListElement>(null);
  const activeLinkRef = useRef<HTMLAnchorElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const copy = getMessages(locale);
  const items = [
    { href: "/books", label: copy.allBooks },
    ...bookCategories.map((category) => ({
      href: `/books/category/${category}`,
      label: categoryLabel(locale, category),
    })),
  ];

  useEffect(() => {
    const navigation = navigationRef.current;
    if (!navigation) return;

    const updateScrollState = () => {
      const navigationBounds = navigation.getBoundingClientRect();
      const children = Array.from(navigation.children);
      setCanScrollLeft(
        children.some((child) => child.getBoundingClientRect().left < navigationBounds.left - 1),
      );
      setCanScrollRight(
        children.some((child) => child.getBoundingClientRect().right > navigationBounds.right + 1),
      );
    };

    updateScrollState();
    navigation.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    const resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(navigation);

    return () => {
      navigation.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
      resizeObserver.disconnect();
    };
  }, [items.length]);

  useEffect(() => {
    activeLinkRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [pathname]);

  const activeIndex = items.findIndex((item) => pathname === localizedPath(locale, item.href));
  const showStartShadow =
    locale === "ar"
      ? canScrollRight && activeIndex !== items.length - 1
      : canScrollLeft;
  const showEndShadow =
    locale === "ar"
      ? canScrollLeft && activeIndex !== 0
      : canScrollRight;

  return (
    <aside className="sticky top-0 z-30 -mx-4 mb-6 self-start bg-background/95 px-4 py-2 backdrop-blur sm:-mx-6 sm:px-6 lg:sticky md:sticky lg:top-10 md:top-0 lg:z-auto lg:mx-0 lg:mb-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
      <div className="rounded-2xl border border-border bg-surface/95 p-3 shadow-sm sm:p-4 lg:sticky lg:top-24">
        <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-foreground sm:mb-4 sm:text-sm">
          <FiGrid className="text-accent" aria-hidden="true" />
          {copy.browseByCategory}
        </div>
        <nav className="relative" aria-label={copy.browseByCategory}>
          <ul
            ref={navigationRef}
            className="flex gap-2 overflow-x-auto pb-1 scrollbar-none lg:flex-col lg:overflow-visible [&::-webkit-scrollbar]:hidden"
          >
            {items.map((item) => {
              const href = localizedPath(locale, item.href);
              const active = pathname === href;
              return (
                <li key={item.href} className="shrink-0">
                  <Link
                    href={href}
                    ref={active ? activeLinkRef : undefined}
                    aria-current={active ? "page" : undefined}
                    className={clsx(
                      "block whitespace-nowrap rounded-xl px-3 py-0 text-sm font-semibold capitalize transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                      active ? "bg-accent text-white shadow-sm" : "text-muted hover:bg-surface-muted hover:text-accent",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <span
            aria-hidden="true"
            className={clsx(
              "pointer-events-none absolute inset-y-0 left-0 w-8 bg-linear-to-r from-surface/95 to-transparent transition-opacity lg:hidden",
              showStartShadow ? "opacity-100" : "opacity-0",
            )}
          />
          <span
            aria-hidden="true"
            className={clsx(
              "pointer-events-none absolute inset-y-0 right-0 w-8 bg-linear-to-l from-surface/95 to-transparent transition-opacity lg:hidden",
              showEndShadow ? "opacity-100" : "opacity-0",
            )}
          />
        </nav>
      </div>
    </aside>
  );
}
