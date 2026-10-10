import { describe, expect, it } from "vitest";
import { getSafeBooksQuery } from "./books-route";

describe("book route query normalization", () => {
  it("returns no redirect for valid query parameters", () => {
    expect(getSafeBooksQuery({ page: "2", q: "fantasy", sort: "likes" })).toBeNull();
  });

  it("removes invalid page and sort values while preserving search", () => {
    expect(getSafeBooksQuery({ page: "zero", q: "fantasy", sort: "unknown" })).toBe("q=fantasy");
  });

  it("keeps valid parameters when another parameter is invalid", () => {
    expect(getSafeBooksQuery({ page: "3", q: "", sort: "unknown" })).toBe("page=3");
  });

  it("redirects pages above the filtered result range to the last page", () => {
    expect(getSafeBooksQuery({ page: "99", totalPages: 4 })).toBe("page=4");
  });

  it("removes pages below one from the canonical query", () => {
    expect(getSafeBooksQuery({ page: "0", q: "fantasy", totalPages: 4 })).toBe("q=fantasy");
  });
});
