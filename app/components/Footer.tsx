"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiArrowUpRight } from "react-icons/fi";
import { getMessages, localizedPath, type Locale } from "@/app/i18n";

export function Footer({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const activeLocale: Locale = pathname.startsWith("/ar")
    ? "ar"
    : pathname.startsWith("/en")
      ? "en"
      : locale;
  const copy = getMessages(activeLocale);
  return (
    <footer className="mt-16 border-t border-border bg-surface-muted ">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1fr_auto] lg:px-8 items-center-safe">
        <div className="flex flex-col gap-4">
          <Image src="/tinylibrary-logo.png" alt={copy.siteName} width={128} height={32} />
          <p className="max-w-sm text-sm leading-6 text-muted">
            {activeLocale === "ar"
              ? "ركن صغير ومنتقًى بعناية للقراء الباحثين عن حكايتهم القادمة."
              : "A small, carefully curated corner of the web for readers looking for their next story."}
          </p>
        </div>
        <div className="flex flex-col items-start gap-3 text-sm font-bold uppercase tracking-[0.12em] text-muted md:items-end">
          <Link className="inline-flex items-center gap-2 hover:text-accent" href={localizedPath(activeLocale, "/books")}>
            {copy.browseCollection} <FiArrowUpRight aria-hidden="true" />
          </Link>
          <Link className="inline-flex items-center gap-2 hover:text-accent" href={localizedPath(activeLocale, "/about/contact")}>
            {copy.contactTeam} <FiArrowUpRight aria-hidden="true" />
          </Link>
        </div>
      </div>
      <div className="border-t border-border px-4 py-4 text-center text-xs text-muted sm:px-6 lg:px-8">
        © {new Date().getFullYear()} {copy.siteName}. {activeLocale === "ar" ? "صُممت للقراء الفضوليين." : "Made for curious readers."}
      </div>
    </footer>
  );
}
