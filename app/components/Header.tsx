import Link from "next/link";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/books", label: "Books" },
  { href: "/about", label: "About" },
  { href: "/about/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="w-full border-b border-zinc-200 bg-white">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-4 py-5 sm:px-6 lg:px-8">
        <Link
          className="font-sans text-xl font-bold tracking-tight text-[#252525] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          href="/"
        >
          Tiny Books
        </Link>
        <nav aria-label="Main navigation">
          <ul className="flex items-center gap-5 font-sans text-sm font-semibold text-[#454545] sm:gap-7">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  className="underline-offset-4 transition-colors hover:text-orange-600 hover:underline hover:decoration-orange-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
