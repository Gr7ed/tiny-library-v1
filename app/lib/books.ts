import booksData from "../data/books.json";
import {
  bookCategories,
  type Book,
  type BookCategory,
} from "../types";
import { categoryLabel, type Locale } from "../i18n";

const categories = new Set<string>(bookCategories);

function isBook(value: unknown): value is Book {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const book = value as Record<string, unknown>;

  return (
    Number.isInteger(book.id) &&
    typeof book.name === "string" &&
    book.name.length > 0 &&
    typeof book.author === "string" &&
    book.author.length > 0 &&
    typeof book.likes === "number" &&
    Number.isFinite(book.likes) &&
    book.likes >= 0 &&
    typeof book.image === "string" &&
    book.image.length > 0 &&
    typeof book.category === "string" &&
    categories.has(book.category) &&
    typeof book.dateAdded === "string" &&
    !Number.isNaN(Date.parse(book.dateAdded))
  );
}

function loadBooks(): readonly Book[] {
  if (!Array.isArray(booksData)) {
    throw new Error("The books data must be an array.");
  }

  return booksData.map((book, index) => {
    if (!isBook(book)) {
      throw new Error(`Invalid book data at index ${index}.`);
    }

    return book;
  });
}

const books = loadBooks();
console.log(`Loaded ${books.length} books from the data source.`);

export function getBooks(): Book[] {
  return books.map((book) => ({ ...book }));
}

export function getBookById(id: number | string): Book | undefined {
  const numericId = typeof id === "number" ? id : Number(id.trim());

  if (!Number.isInteger(numericId)) {
    return undefined;
  }

  const book = books.find((item) => item.id === numericId);
  return book ? { ...book } : undefined;
}

export function getBooksByCategory(category: BookCategory): Book[] {
  return books
    .filter((book) => book.category === category)
    .map((book) => ({ ...book }));
}

export function searchBooks(items: Book[], query: string, locale: Locale): Book[] {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  if (!normalizedQuery) return items;

  return items.filter((book) =>
    [book.name, book.author, categoryLabel(locale, book.category)].some((value) =>
      value.toLocaleLowerCase().includes(normalizedQuery),
    ),
  );
}