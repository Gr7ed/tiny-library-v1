type BookPageProps = {
  params: Promise<{ id: string }>;
};

export default async function BookPage({ params }: BookPageProps) {
  const { id } = await params;

  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-4 px-6 py-16">
      <h1 className="text-4xl font-bold">Book details</h1>
      <p className="text-lg text-zinc-600">Book ID: {id}</p>
    </main>
  );
}
