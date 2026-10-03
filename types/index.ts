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

export type BookCategory = (typeof bookCategories)[number];
export const bookSorts = ["default", "alpha", "likes", "newest"] as const;
export type BookSort = (typeof bookSorts)[number];
export type CategoryPageProps = {
  params: Promise<{ category: string }>;
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
