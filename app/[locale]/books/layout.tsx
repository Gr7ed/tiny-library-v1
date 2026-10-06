import { notFound } from "next/navigation";
import { BooksNavigation } from "@/components/BooksNavigation";
import { isLocale, type Locale } from "@/lib/i18n";

export default async function LocaleBooksLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale: value } = await params;
  if (!isLocale(value)) notFound();
  const locale: Locale = value;

  return (
    <main className="mx-auto grid min-w-0 max-w-7xl grid-cols-1 px-4 py-4 sm:px-6 sm:py-8 md:py-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12 lg:px-8">
      <BooksNavigation locale={locale} />
      <div className="min-w-0">
        {children}
      </div>
    </main>
  );
}
