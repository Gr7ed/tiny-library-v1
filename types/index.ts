export const bookCategories = [
  "fiction",
  "non-fiction",
  "romance",
  "fantasy",
  "thriller",
  "horror",
  "historical",
  "biography",
  "self-help",
] as const;

export const locales = ["en", "ar"] as const;
export type BookCategory = (typeof bookCategories)[number];
export const bookSorts = ["default", "alpha", "likes", "newest"] as const;
export type Locale = (typeof locales)[number];
export type BookSort = (typeof bookSorts)[number];

export type BooksSearchParams = {
  page?: string;
  q?: string;
  sort?: string;
};

export type BooksRouteSearchParams = BooksSearchParams & {
  totalPages?: number;
};

export type BooksPageOptions = {
  category?: BookCategory;
  locale: Locale;
  page?: number;
  pageSize?: number;
  query?: string;
  sort?: BookSort;
};

export type Book = {
  id: number;
  name: string;
  author: string;
  likes: number;
  image: string;
  category: BookCategory;
  dateAdded: string;
};

export type BooksPage = {
  items: Book[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};
