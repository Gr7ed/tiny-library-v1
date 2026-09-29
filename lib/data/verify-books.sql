-- SQLite verification queries for the local books database.

.headers on
.mode table

-- List all user tables.
SELECT name AS table_name
FROM sqlite_master
WHERE type = 'table'
  AND name NOT LIKE 'sqlite_%'
ORDER BY name;

-- Show the schema for every user table.
SELECT name AS table_name, sql
FROM sqlite_master
WHERE type = 'table'
  AND name NOT LIKE 'sqlite_%'
ORDER BY name;

-- Show all rows from the books table.
SELECT *
FROM books
ORDER BY id;

-- Confirm the seeded row count.
SELECT COUNT(*) AS book_count
FROM books;
