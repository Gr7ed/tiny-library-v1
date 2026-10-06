import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
type NotFoundStateProps = {
  title: string;
  subtitle: string;
  linkText: string;
  linkHref: string;
  locale?: string;
};

export function NotFoundState({
  title,
  subtitle,
  linkText,
  linkHref,
  locale
}: NotFoundStateProps) {
  return (
    <main className={`mx-auto flex min-h-[50vh] max-w-3xl flex-col items-start justify-center gap-5 px-4 py-16 sm:px-6 lg:px-8 ${locale === "ar" ? "font-arabic" : "font-sans"}`}>
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">404</p>
      <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
        {title}
      </h1>
      <p className="max-w-prose text-lg leading-8 text-muted">{subtitle}</p>
      <Link
        href={linkHref}
        className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-accent px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-accent-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <FiArrowLeft aria-hidden="true" className="rtl:rotate-180" />
        {linkText}
      </Link>
    </main>
  );
}
