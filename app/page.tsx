import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-16 lg:px-8">
      <section className="grid items-center gap-10 rounded-3xl bg-[#f4f1ea] p-6 sm:p-8 md:grid-cols-2 md:p-12">
        <div className="flex flex-col items-start gap-5 text-left">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#315c48]">
            Your next great read
          </span>
          <h1 className="max-w-xl text-4xl font-bold leading-tight text-[#252525] sm:text-5xl lg:text-6xl">
            Stories worth keeping close.
          </h1>
          <p className="max-w-lg text-base leading-7 text-[#454545] sm:text-lg">
            Explore a thoughtful collection of books and find your next
            favorite story in the Tiny Library.
          </p>
          <Link
            className="rounded-full bg-[#315c48] px-6 py-3 font-bold text-white transition-colors hover:bg-[#244635] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            href="/books"
          >
            Browse the collection
          </Link>
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
      </section>
    </main>
  );
}
