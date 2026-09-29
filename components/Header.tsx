"use client";

import clsx from "clsx";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Transition,
} from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";
import { alternateLocale, getMessages, localizedPath, type Locale } from "@/lib/i18n";

function isActiveRoute(pathname: string, href: string, locale: Locale) {
  const localized = localizedPath(locale, href);
  return pathname === localized || (href !== "/" && pathname.startsWith(`${localized}/`));
}

export function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const activeLocale: Locale = pathname.startsWith("/ar")
    ? "ar"
    : pathname.startsWith("/en")
      ? "en"
      : locale;
  const copy = getMessages(activeLocale);
  const [isDark, setIsDark] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = savedTheme === "dark" || (!savedTheme && prefersDark);
    document.documentElement.classList.toggle("dark", shouldUseDark);
    window.requestAnimationFrame(() => setIsDark(shouldUseDark));
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let frameId: number | null = null;

    function updateVisibility() {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY <= 8 || currentScrollY < lastScrollY);
      lastScrollY = currentScrollY;
      frameId = null;
    }

    function handleScroll() {
      if (frameId === null) {
        frameId = window.requestAnimationFrame(updateVisibility);
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, []);

  function toggleTheme() {
    const nextIsDark = !isDark;
    document.documentElement.classList.toggle("dark", nextIsDark);
    window.localStorage.setItem("theme", nextIsDark ? "dark" : "light");
    setIsDark(nextIsDark);
  }

  function NavigationLinks({ close }: { close?: () => void }) {
    return (
      <>
        {[
          { href: "/", label: copy.home },
          { href: "/books", label: copy.collection },
          { href: "/about", label: copy.about },
        ].map((item) => {
          const active = isActiveRoute(pathname, item.href, activeLocale);
          return (
            <li key={item.href}>
              <Link
                href={localizedPath(activeLocale, item.href)}
                aria-current={active ? "page" : undefined}
                onClick={close}
                className={clsx(
                  "inline-flex items-center gap-2 rounded-full px-2.5 py-1.5 text-xs font-bold uppercase tracking-[0.12em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:px-3 sm:py-2 sm:text-sm",
                  active
                    ? "bg-accent text-white shadow-sm"
                    : "text-muted hover:bg-surface-muted hover:text-accent",
                )}
              >
                {item.label}
              </Link>
              {item.href === "/about" && pathname.startsWith(localizedPath(activeLocale, "/about/contact")) && (
                <>
                  <span aria-hidden="true" className="px-1 text-accent">:</span>
                  <Link
                    href={localizedPath(activeLocale, "/about/contact")}
                    aria-current="page"
                    onClick={close}
                    className="inline-flex rounded-full px-2.5 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-accent underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:px-3 sm:py-2 sm:text-sm"
                  >
                    {activeLocale === "ar" ? "تواصل " : "Contact"}
                  </Link>
                </>
              )}
            </li>
          );
        })}
      </>
    );
  }

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 border-b border-border/80 bg-background/90 shadow-sm backdrop-blur-xl transition-[transform,opacity] duration-300",
        activeLocale === "ar" && "font-arabic",
        isVisible || isMenuOpen
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-full opacity-0",
      )}
    >
      <Disclosure
        as="div"
        className="mx-auto max-w-7xl px-4 py-2 sm:px-6 sm:py-2.5 lg:px-8"
      >
        {({ open, close }) => (
          <>
            <div className="flex items-center justify-between gap-4">
              <Link
                href={localizedPath(activeLocale)}
                aria-label="Tiny Library home"
                className="rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <Image
                  src="/tinylibrary-logo.png"
                  alt="Tiny Library"
                  width={200}
                  height={200}
                  className="h-auto w-28"
                  priority
                />
              </Link>

              <div className="hidden items-center gap-2 lg:flex">
                <nav aria-label="Main navigation">
                  <ul className="flex items-center gap-1">
                    <NavigationLinks />
                  </ul>
                </nav>
                <LanguageSwitch locale={activeLocale} label={copy.switchLanguage} pathname={pathname} />
                <ThemeButton copy={copy} isDark={isDark} onClick={toggleTheme} />
              </div>

              <div className="flex items-center gap-2 lg:hidden">
                <LanguageSwitch locale={activeLocale} label={copy.switchLanguage} pathname={pathname} />
                <ThemeButton copy={copy} isDark={isDark} onClick={toggleTheme} />
                <DisclosureButton
                  aria-label={open ? copy.closeMenu : copy.openMenu}
                  onClick={() => setIsMenuOpen(!open)}
                  className="rounded-lg border border-border bg-surface p-1.5 text-foreground shadow-sm transition hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {open ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
                </DisclosureButton>
              </div>
            </div>

            <Transition
              enter="transition duration-200 ease-out"
              enterFrom="-translate-y-2 opacity-0"
              enterTo="translate-y-0 opacity-100"
              leave="transition duration-150 ease-in"
              leaveFrom="translate-y-0 opacity-100"
              leaveTo="-translate-y-2 opacity-0"
            >
              <DisclosurePanel className="lg:hidden">
                <nav aria-label="Mobile navigation" className="mt-3 border-t border-border pt-3">
                  <ul className="flex flex-col gap-2">
                    <NavigationLinks
                      close={() => {
                        close();
                        setIsMenuOpen(false);
                      }}
                    />
                  </ul>
                </nav>
              </DisclosurePanel>
            </Transition>
          </>
        )}
      </Disclosure>
    </header>
  );
}

function LanguageSwitch({
  locale,
  label,
  pathname,
}: {
  locale: Locale;
  label: string;
  pathname: string;
}) {
  const alternate = alternateLocale(locale);
  const currentPath = pathname.replace(/^\/(en|ar)/, "") || "/";
  return (
    <Link
      href={localizedPath(alternate, currentPath)}
      className="rounded-lg border border-border bg-surface px-2 py-1.5 text-xs font-bold text-foreground transition hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      {label}
    </Link>
  );
}

function ThemeButton({
  copy,
  isDark,
  onClick,
}: {
  copy: ReturnType<typeof getMessages>;
  isDark: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={isDark ? copy.themeLight : copy.themeDark}
      onClick={onClick}
      className="rounded-lg border border-border bg-surface p-1.5 text-foreground shadow-sm transition hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      {isDark ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
    </button>
  );
}
