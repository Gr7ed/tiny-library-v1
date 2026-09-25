import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiCompass, FiHeart, FiLayers } from "react-icons/fi";
import { notFound } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { getMessages, isLocale, localizedPath, type Locale } from "@/app/i18n";

export default async function LocaleAboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: value } = await params;
  if (!isLocale(value)) notFound();
  const locale: Locale = value;
  const copy = getMessages(locale);
  const features = locale === "ar"
    ? [["اختيارات منتقاة", "مجموعة مركزة يستحق كل عنوان فيها مكانه."], ["سهولة التصفح", "تصنيفات واضحة تساعدك على الوصول إلى اختيارك بسرعة."], ["القارئ أولًا", "تجربة هادئة مصممة حول الفضول والاكتشاف."]]
    : [["Curated, not crowded", "A focused catalogue where every title earns its place."], ["Easy to browse", "Clear categories help you find a good direction quickly."], ["Readers first", "A calm experience designed around curiosity and discovery."]];
  const icons = [FiLayers, FiCompass, FiHeart];

  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-12 px-4 py-8 sm:px-6 md:gap-20 md:py-16 lg:px-8">
      <section className="grid items-center gap-10 overflow-hidden rounded-4xl border border-border bg-surface p-6 shadow-sm sm:p-10 md:grid-cols-2 md:p-14">
        <div className="flex flex-col items-start gap-5">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{copy.aboutEyebrow}</span>
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-6xl">{copy.aboutTitle}</h1>
          <p className="max-w-xl text-lg leading-8 text-muted">{locale === "ar" ? "بدأت المكتبة الصغيرة كفكرة بسيطة: تسهيل الأمر على القراء الفضوليين للعثور فعليًا على كتب سيحبونها، وليس مجرد التمرير عبر قوائم لا تنتهي. كل عنوان هنا مُختار بعناية، وليس بواسطة خوارزميات." : "Tiny Library started as a simple idea: make it easier for curious readers to actually find books they'll love, not just scroll endless lists. Every title here is chosen with care, not algorithms."}</p>
          <Button asChild><Link href={localizedPath(locale, "/about/contact")}>{copy.contactEyebrow} <FiArrowRight /></Link></Button>
        </div>
        <Image src="/hero-image-square.png" alt={copy.siteName} width={640} height={640} className="h-auto w-full max-w-md rounded-3xl" />
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        {features.map(([title, description], index) => { const Icon = icons[index]; return <Card key={title} className="rounded-2xl"><CardContent className="flex flex-col gap-3 p-6"><Icon className="text-2xl text-accent" /><h2 className="font-bold text-foreground">{title}</h2><p className="text-sm leading-6 text-muted">{description}</p></CardContent></Card>; })}
      </section>
      <section className="flex gap-4 flex-col items-center justify-center   p-6 text-center  sm:p-10">
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl">{locale === "ar" ? "قيمنا" : "Our ethos"}</h2>
        <p className="text-sm leading-6 text-muted">{locale === "ar" ? "في المكتبة الصغيرة، نحن نؤمن بأن الكتاب الجيد لا ينبغي أن يكون صعبًا في العثور عليه. فلسفتنا هي إنشاء مساحة صغيرة ومنسقة بعناية حيث يحصل كل عنوان على مكانه على الرف ويمكن للقراء أن يثقوا بأن أي شيء يلتقطونه يستحق وقتهم." : "At Tiny Library, we believe a good book shouldn’t be hard to find. Our ethos is to create a small, carefully curated space where every title earns its place on the shelf and readers can trust that anything they pick up is worth their time."}</p>
        <hr className=" border-t border-border w-50 my-5" />
        <p className="text-sm leading-6 text-muted">{locale === "ar" ? "بدلاً من إغراقك بالآلاف من الخيارات، تركز المكتبة الصغيرة على مجموعة متواضعة تشعر أنها شخصية وسهلة الوصول. نريد أن يشعر القراء وكأنهم دخلوا مكتبة مريحة ومحبوبة حيث قام شخص ما بالفعل بالعمل الشاق في فرز الضوضاء." : "Instead of overwhelming you with thousands of options, Tiny Library focuses on a modest collection that feels personal and approachable. We want readers to feel like they’ve stepped into a cosy, well‑loved library where someone has already done the hard work of sorting through the noise."}</p>
      </section>
    </main>
  );
}
