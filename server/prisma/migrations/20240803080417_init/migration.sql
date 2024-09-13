-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "firstname" TEXT,
    "middlename" TEXT,
    "lastname" TEXT,
    "job_title" TEXT,
    "email" TEXT,
    "password" TEXT,
    "org_type" TEXT,
    "org_id" INTEGER,
    "org_id_column_name" TEXT,
    "org_id_table_name" TEXT,
    "domain_name" TEXT
);
INSERT INTO "new_User" ("firstname", "id", "username") SELECT "firstname", "id", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
