import { describe, expect, it } from "vitest";
import { getDatabase } from "./database";

const SQLITE_READ = 20;

type Authorizer = (
  actionCode: number,
  firstArgument: string | null,
  secondArgument: string | null,
  databaseName: string | null,
  triggerName: string | null,
) => number;

describe("database table usage", () => {
  it("logs and verifies the tables used by read queries", () => {
    const database = getDatabase();
    const queriedTables = new Set<string>();

    database.setAuthorizer(((
      actionCode,
      firstArgument,
    ) => {
      if (actionCode === SQLITE_READ && firstArgument) {
        queriedTables.add(firstArgument);
      }

      return 0;
    }) as Authorizer);

    try {
      const countResult = database
        .prepare("SELECT COUNT(*) AS count FROM books")
        .get();
      const bookResults = database
        .prepare("SELECT id, name FROM books WHERE category = ? ORDER BY id")
        .all("fiction")
        .slice(0, 5);

      const tables = [...queriedTables].sort();
      console.log(`[database] tables queried: ${tables.join(", ")}`);
      console.table([
        { result: "count", value: countResult?.count },
        ...bookResults.map((book) => ({ result: "book", ...book })),
      ]);

      expect(tables).toEqual(["books"]);
    } finally {
      database.close();
    }
  });
});