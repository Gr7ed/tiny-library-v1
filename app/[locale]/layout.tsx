import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocaleDocumentAttributes } from "@/components/LocaleDocumentAttributes";
import { directionFor, isLocale, locales, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isArabic = locale === "ar";
  return {
    title: isArabic ? "المكتبة الصغيرة" : "Tiny Library",
    description: isArabic
      ? "مجموعة صغيرة ومنتقاة من الكتب"
      : "A carefully curated collection of books",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale: value } = await params;
  if (!isLocale(value)) notFound();
  const locale: Locale = value;

  return (
    <div dir={directionFor(locale)} className={locale === "ar" ? "font-arabic" : undefined}>
      <LocaleDocumentAttributes locale={locale} />
      {children}
    </div>
  );
}
