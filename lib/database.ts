import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { DatabaseSync } from "node:sqlite";

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
  return database;
}

