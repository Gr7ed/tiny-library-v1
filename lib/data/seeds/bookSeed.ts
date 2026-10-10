
import { DatabaseSync } from "node:sqlite";
import books from "../books.json";
import { getDatabase } from "@/lib/database";



function seedBooks(database: DatabaseSync): void {
  const initialCount = Number(
    database.prepare("SELECT COUNT(*) AS count FROM books").get()?.count,
  );
  const insertBook = database.prepare(`
    INSERT OR IGNORE INTO books
      (id, name, author, likes, image, category, date_added)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  database.exec("BEGIN");

  try {
    for (const book of books) {
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

  const seededCount = Number(
    database.prepare("SELECT COUNT(*) AS count FROM books").get()?.count,
  );
  const insertedCount = seededCount - initialCount;
  console.log(
    `[books] SQLite database ready: ${seededCount} books (${insertedCount} seeded).`,
  );
}

seedBooks(getDatabase());