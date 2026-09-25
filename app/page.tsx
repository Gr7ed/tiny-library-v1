import Image from "next/image";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";

const highlights = [
  { value: "52", label: "books to discover" },
  { value: "9", label: "genres to explore" },
  { value: "1", label: "cosy reading corner" },
];

export default function HomePage() {
  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-8 sm:px-6 md:gap-16 md:py-16 lg:px-8">
      <Card className="overflow-hidden">
        <CardContent className="grid items-center gap-10 p-6 sm:p-8 md:grid-cols-[1fr_0.9fr] md:p-12">
          <div className="flex flex-col items-start gap-6 text-left">
            <span className="rounded-full bg-surface-muted px-4 py-2 text-sm font-bold uppercase tracking-[0.2em] text-accent">
              Browse books
            </span>
            <h1 className="max-w-xl text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              Find your next favourite book
            </h1>
            <p className="max-w-lg text-base leading-7 text-muted sm:text-lg">
              Tiny Library is a cosy corner of the web where readers discover
              hand-picked titles across every genre, from timeless classics to
              hidden indie gems.
            </p>
            <Button asChild>
              <Link href="/books">Browse books</Link>
            </Button>
          </div>
          <div className="relative flex items-center justify-center">
            <Image
              className="h-auto w-full max-w-xl"
              src="/hero-image.png"
              alt="A colorful stack of books beside a small plant"
              width={800}
              height={640}
              priority
            />
          </div>
        </CardContent>
      </Card>

      <section
        aria-label="Tiny Library highlights"
        className="grid gap-4 sm:grid-cols-3"
      >
        {highlights.map((highlight) => (
          <Card key={highlight.label} className="rounded-2xl">
            <CardContent className="flex flex-col gap-2">
              <span className="text-3xl font-bold text-accent">
                {highlight.value}
              </span>
              <span className="text-sm font-bold uppercase tracking-[0.12em] text-muted">
                {highlight.label}
              </span>
            </CardContent>
          </Card>
        ))}

      </section>
    </main>
  );
}
