import { describe, expect, it } from "vitest";
import { getBookById, getBooks, getBooksByCategory, getBooksPage } from "./books";

describe("book data access", () => {
  it("returns defensive copies of the complete collection", () => {
    const books = getBooks();
    const originalName = books[0].name;

    books[0].name = "Changed locally";

    expect(getBooks()[0].name).toBe(originalName);
    expect(books).toHaveLength(52);
  });

  it("accepts numeric ids and rejects partially numeric strings", () => {
    expect(getBookById(1)?.id).toBe(1);
    expect(getBookById("1")?.id).toBe(1);
    expect(getBookById("1abc")).toBeUndefined();
    expect(getBookById("")).toBeUndefined();
    expect(getBookById("1.5")).toBeUndefined();
  });

  it("filters books by supported category", () => {
    const fiction = getBooksByCategory("fiction");

    expect(fiction.length).toBeGreaterThan(0);
    expect(fiction.every((book) => book.category === "fiction")).toBe(true);
  });

  it("returns bounded pages and total counts from the database", () => {
    const firstPage = getBooksPage({ locale: "en", page: 1, pageSize: 10 });
    const lastPage = getBooksPage({ locale: "en", page: 99, pageSize: 10 });

    expect(firstPage.items).toHaveLength(10);
    expect(firstPage.total).toBe(52);
    expect(firstPage.totalPages).toBe(6);
    expect(lastPage.page).toBe(6);
    expect(lastPage.items).toHaveLength(2);
  });

  it("applies category and search filters before pagination", () => {
    const page = getBooksPage({
      category: "fiction",
      locale: "en",
      pageSize: 2,
      query: "fiction",
    });

    expect(page.total).toBeGreaterThan(0);
    expect(page.items).toHaveLength(Math.min(2, page.total));
    expect(page.items.every((book) => book.category === "fiction")).toBe(true);
  });
});
