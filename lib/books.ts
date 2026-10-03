import {
  bookCategories,
  type Book,
  type BookCategory,
  type BookSort,
  type BooksPage,
} from "../types";
import { getDatabase } from "./database";
import { categoryLabel, type Locale } from "./i18n";

const categories = new Set<string>(bookCategories);
const database = getDatabase();
export const BOOKS_PAGE_SIZE = 12;

type BooksPageOptions = {
  category?: BookCategory;
  locale: Locale;
  page?: number;
  pageSize?: number;
  query?: string;
  sort?: BookSort;
};

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

function toBook(value: unknown): Book {
  if (!isBook(value)) {
    throw new Error("The database returned invalid book data.");
  }

  return value;
}

function escapeLikePattern(value: string): string {
  return value.replace(/[\\%_]/g, "\\$&");
}

function normalizePage(value: number | undefined): number {
  return Number.isInteger(value) && value && value > 0 ? value : 1;
}

function normalizePageSize(value: number | undefined): number {
  return Number.isInteger(value) && value && value > 0
    ? Math.min(value, 48)
    : BOOKS_PAGE_SIZE;
}

function orderByFor(sort: BookSort = "default"): string {
  switch (sort) {
    case "alpha":
      return "name ASC";
    case "likes":
      return "likes DESC, id ASC";
    case "newest":
      return "date_added DESC, id DESC";
    default:
      return "id ASC";
  }
}

function buildBookFilters({ category, locale, query }: BooksPageOptions) {
  const filters: string[] = [];
  const parameters: (string | number)[] = [];

  if (category) {
    filters.push("category = ?");
    parameters.push(category);
  }

  const normalizedQuery = query?.trim().toLocaleLowerCase();
  if (normalizedQuery) {
    const searchPattern = `%${escapeLikePattern(normalizedQuery)}%`;
    const matchingCategories = bookCategories.filter((bookCategory) =>
      [bookCategory, categoryLabel(locale, bookCategory)].some((label) =>
        label.toLocaleLowerCase().includes(normalizedQuery),
      ),
    );
    const categorySearch = matchingCategories.length
      ? ` OR category IN (${matchingCategories.map(() => "?").join(", ")})`
      : "";

    filters.push(
      `(lower(name) LIKE ? ESCAPE '\\' OR lower(author) LIKE ? ESCAPE '\\'${categorySearch})`,
    );
    parameters.push(searchPattern, searchPattern, ...matchingCategories);
  }

  return {
    clause: filters.length ? ` WHERE ${filters.join(" AND ")}` : "",
    parameters,
  };
}

export function getBooksPage(options: BooksPageOptions): BooksPage {
  const page = normalizePage(options.page);
  const pageSize = normalizePageSize(options.pageSize);
  const { clause, parameters } = buildBookFilters(options);
  const total = Number(
    database.prepare(`SELECT COUNT(*) AS count FROM books${clause}`).get(...parameters)?.count ?? 0,
  );
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(page, totalPages);
  const offset = (currentPage - 1) * pageSize;
  const rows = database
    .prepare(
      `SELECT id, name, author, likes, image, category, date_added AS dateAdded
      FROM books${clause} ORDER BY ${orderByFor(options.sort)} LIMIT ? OFFSET ?`,
    )
    .all(...parameters, pageSize, offset);

  return {
    items: rows.map(toBook),
    page: currentPage,
    pageSize,
    total,
    totalPages,
  };
}

export function getBooks(): Book[] {
  const rows = database
    .prepare(
      "SELECT id, name, author, likes, image, category, date_added AS dateAdded FROM books ORDER BY id",
    )
    .all();

  return rows.map(toBook);
}

export function getBookById(id: number | string): Book | undefined {
  const numericId = typeof id === "number" ? id : Number(id.trim());

  if (!Number.isInteger(numericId)) {
    return undefined;
  }

  const row = database
    .prepare(
      "SELECT id, name, author, likes, image, category, date_added AS dateAdded FROM books WHERE id = ?",
    )
    .get(numericId);

  return row ? toBook(row) : undefined;
}

export function getBooksByCategory(category: BookCategory): Book[] {
  const rows = database
    .prepare(
      "SELECT id, name, author, likes, image, category, date_added AS dateAdded FROM books WHERE category = ? ORDER BY id",
    )
    .all(category);

  return rows.map(toBook);
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