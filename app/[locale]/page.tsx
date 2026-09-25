import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiBookOpen, FiHeart, FiSearch } from "react-icons/fi";
import { notFound } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { getMessages, isLocale, localizedPath, type Locale } from "@/app/i18n";

export default async function LocaleHomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: value } = await params;
  if (!isLocale(value)) notFound();
  const locale: Locale = value;
  const copy = getMessages(locale);
  const highlights = [
    { icon: FiBookOpen, value: "52", label: copy.highlights[0] },
    { icon: FiSearch, value: "9", label: copy.highlights[1] },
    { icon: FiHeart, value: "100%", label: copy.highlights[2] },
  ];

  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-12 px-4 py-8 sm:px-6 md:gap-20 md:py-16 lg:px-8">
      <section className="relative overflow-hidden rounded-4xl border border-border bg-surface shadow-sm">
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
        <div className="grid items-center gap-8 p-6 sm:p-10 md:grid-cols-[1fr_0.85fr] md:p-14">
          <div className="relative z-10 flex flex-col items-start gap-6">
            <span className="rounded-full bg-surface-muted px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-accent">{copy.welcome}</span>
            <h1 className="max-w-2xl text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl">{copy.heroTitle}</h1>
            <p className="max-w-xl text-lg leading-8 text-muted">{copy.heroDescription}</p>
            <div className="flex flex-wrap items-center gap-3">
              <Button asChild><Link href={localizedPath(locale, "/books")}>{copy.explore} <FiArrowRight /></Link></Button>
              <Link href={localizedPath(locale, "/about")} className="rounded-full px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-foreground transition-colors hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">{copy.ourStory}</Link>
            </div>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-8 rounded-full bg-surface-muted" />
            <Image className="relative h-auto w-full max-w-lg" src="/hero-image.png" alt={copy.siteName} width={800} height={640} priority />
          </div>
        </div>
      </section>
      <section className="grid gap-4 sm:grid-cols-3" aria-label={copy.siteName}>
        {highlights.map((highlight) => (
          <Card key={highlight.label} className="rounded-2xl">
            <CardContent className="flex items-center gap-4 p-5">
              <span className="rounded-xl bg-surface-muted p-3 text-xl text-accent"><highlight.icon aria-hidden="true" /></span>
              <span className="flex flex-col gap-1"><strong className="text-2xl text-foreground">{highlight.value}</strong><span className="text-sm text-muted">{highlight.label}</span></span>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
