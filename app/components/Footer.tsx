export function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-200 text-2xl text-center dark:border-zinc-800">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 text-sm text-zinc-600 sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} Tiny Books</p>
      </div>
    </footer>
  );
}
