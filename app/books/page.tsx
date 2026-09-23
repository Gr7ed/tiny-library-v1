const books = [
  { id: "1", title: "The Little Prince" },
  { id: "2", title: "Pride and Prejudice" },
];

export default function BooksPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-6 px-6 py-16">
      <h1 className="text-4xl font-bold">Books</h1>
      <ul className="list-disc space-y-2 pl-6">
        {books.map((book) => (
          <li key={book.id}>
            <a className="text-blue-600 underline" href={`/books/${book.id}`}>
              {book.title}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
