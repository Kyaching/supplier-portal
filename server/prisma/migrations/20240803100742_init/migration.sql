/*
  Warnings:

  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "middlename" TEXT,
    "lastname" TEXT NOT NULL,
    "job_title" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "conf_password" TEXT NOT NULL,
    "org_type" TEXT NOT NULL,
    "org_id" INTEGER NOT NULL,
    "org_id_column_name" TEXT NOT NULL,
    "org_id_table_name" TEXT NOT NULL,
    "domain_name" TEXT NOT NULL
);
INSERT INTO "new_User" ("conf_password", "domain_name", "email", "firstname", "id", "job_title", "lastname", "middlename", "org_id", "org_id_column_name", "org_id_table_name", "org_type", "password", "username") SELECT "conf_password", "domain_name", "email", "firstname", "id", "job_title", "lastname", "middlename", "org_id", "org_id_column_name", "org_id_table_name", "org_type", "password", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_org_id_key" ON "User"("org_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
