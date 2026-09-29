import { Card, CardContent } from "@/components/ui/card";
import { getMessages, type Locale } from "@/lib/i18n";

type BookCollectionHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  count: number;
  locale?: Locale;
};

export function BookCollectionHeader({
  eyebrow,
  title,
  description,
  count,
  locale = "en",
}: BookCollectionHeaderProps) {
  const copy = getMessages(locale);

  return (
    <Card className="overflow-hidden rounded-[1.75rem]">
      <CardContent className="relative isolate overflow-hidden bg-surface-muted px-5 py-7 sm:px-8 sm:py-10">
        <div
          aria-hidden="true"
          className="absolute -right-20 -top-24 -z-10 h-64 w-64 rounded-full bg-accent/10 blur-3xl"
        />
        <div className="flex max-w-3xl flex-col gap-4">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
            {eyebrow}
          </span>
          <h1 className="max-w-2xl text-3xl font-bold capitalize leading-[1.08] tracking-tight text-foreground sm:text-5xl">
            {title}
          </h1>
          <p className="max-w-2xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
            {description}
          </p>
          <p className="text-sm font-bold text-brand-green">
            {copy.readyToExplore(count)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
