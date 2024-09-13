-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Department" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dept_name" TEXT NOT NULL
);
INSERT INTO "new_Department" ("dept_name", "id") SELECT "dept_name", "id" FROM "Department";
DROP TABLE "Department";
ALTER TABLE "new_Department" RENAME TO "Department";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
