/*
  Warnings:

  - You are about to drop the column `data` on the `Messages` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Messages" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sender" TEXT,
    "receivers" TEXT,
    "subject" TEXT,
    "body" TEXT,
    "date" TEXT,
    "status" TEXT
);
INSERT INTO "new_Messages" ("body", "id", "receivers", "sender", "status", "subject") SELECT "body", "id", "receivers", "sender", "status", "subject" FROM "Messages";
DROP TABLE "Messages";
ALTER TABLE "new_Messages" RENAME TO "Messages";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
