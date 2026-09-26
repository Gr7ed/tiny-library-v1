import { describe, expect, it } from "vitest";
import {
  alternateLocale,
  categoryLabel,
  directionFor,
  isLocale,
  localizedPath,
} from "./i18n";

describe("internationalization helpers", () => {
  it("validates supported locales and directions", () => {
    expect(isLocale("en")).toBe(true);
    expect(isLocale("ar")).toBe(true);
    expect(isLocale("fr")).toBe(false);
    expect(directionFor("en")).toBe("ltr");
    expect(directionFor("ar")).toBe("rtl");
  });

  it("builds localized paths without a trailing root slash", () => {
    expect(localizedPath("en")).toBe("/en");
    expect(localizedPath("ar", "/books")).toBe("/ar/books");
    expect(alternateLocale("en")).toBe("ar");
  });

  it("uses translated category labels", () => {
    expect(categoryLabel("en", "non-fiction")).toBe("non fiction");
    expect(categoryLabel("ar", "self-help")).toBe("تطوير الذات");
  });
});
