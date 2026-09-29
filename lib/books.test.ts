import { describe, expect, it } from "vitest";
import { getBookById, getBooks, getBooksByCategory } from "./books";

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
});
