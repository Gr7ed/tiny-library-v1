import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { DatabaseSync } from "node:sqlite";
import booksData from "./data/books.json";

const dataDirectory = join(process.cwd(), "lib", "data");
const databasePath = join(dataDirectory, "books.sqlite");


export function getDatabase(): DatabaseSync {
  mkdirSync(dataDirectory, { recursive: true });

  const database = new DatabaseSync(databasePath);
  database.exec("PRAGMA busy_timeout = 5000");
  database.exec(`
    CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      author TEXT NOT NULL,
      likes INTEGER NOT NULL CHECK (likes >= 0),
      image TEXT NOT NULL,
      category TEXT NOT NULL,
      date_added TEXT NOT NULL
    ) STRICT
  `);
  database.exec("CREATE INDEX IF NOT EXISTS books_category_idx ON books (category)");

  seedBooks(database);
  return database;
}

function seedBooks(database: DatabaseSync): void {
  const insertBook = database.prepare(`
    INSERT OR IGNORE INTO books
      (id, name, author, likes, image, category, date_added)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  database.exec("BEGIN");

  try {
    for (const book of booksData) {
      insertBook.run(
        book.id,
        book.name,
        book.author,
        book.likes,
        book.image,
        book.category,
        book.dateAdded,
      );
    }

    database.exec("COMMIT");
  } catch (error) {
    database.exec("ROLLBACK");
    throw error;
  }

//   const seededCount = Number(
//     database.prepare("SELECT COUNT(*) AS count FROM books").get()?.count,
//   );
//   console.log(
//     `[books] SQLite database ready: ${seededCount} books (${insertedCount} seeded).`,
//   );
}