import Link from "next/link";
import { FiArrowUpRight, FiMail } from "react-icons/fi";
import { notFound } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { getMessages, isLocale, type Locale } from "@/app/i18n";

export default async function LocaleContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: value } = await params;
  if (!isLocale(value)) notFound();
  const locale: Locale = value;
  const copy = getMessages(locale);
  const topics = locale === "ar"
    ? [["اقتراحات الكتب", "أخبرنا بما ينبغي أن نضيفه إلى الرف."], ["التصحيحات", "هل وجدت خطأ؟ أخبرنا لنصلحه."], ["الشراكات", "هل ترغب في العمل مع المكتبة الصغيرة؟ تواصل معنا."]]
    : [["Book suggestions", "Tell us what we should add to the shelf."], ["Corrections", "Spotted an error? Let us know so we can fix it."], ["Partnerships", "Interested in working with Tiny Library? Say hello."]];

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-16 lg:px-8">
      <section className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="flex flex-col gap-5"><span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{copy.contactEyebrow}</span><h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">{copy.contactTitle}</h1><p className="max-w-md text-lg leading-8 text-muted">{locale === "ar" ? "نحن فريق صغير، لذا البريد الإلكتروني هو أفضل طريقة للتواصل معنا." : "We are a small team, so email is the best way to reach us."}</p><Button asChild><a href="mailto:info@tinylibrary.com">{locale === "ar" ? "راسلنا" : "Email us"} <FiMail /></a></Button></div>
        <Card className="rounded-3xl"><CardContent className="grid gap-3 p-6 sm:p-8">{topics.map(([title, description]) => <div key={title} className="flex items-start justify-between gap-5 rounded-2xl border border-border bg-surface-muted p-5"><div className="flex flex-col gap-2"><h2 className="font-bold text-foreground">{title}</h2><p className="text-sm leading-6 text-muted">{description}</p></div><FiArrowUpRight className="shrink-0 text-accent" aria-hidden="true" /></div>)}</CardContent></Card>
      </section>
      <p className="mt-8 text-sm text-muted">{locale === "ar" ? "تفضل بالكتابة مباشرة؟" : "Prefer to write directly?"} <Link className="font-bold text-accent hover:underline" href="mailto:info@tinylibrary.com">info@tinylibrary.com</Link></p>
    </main>
  );
}
