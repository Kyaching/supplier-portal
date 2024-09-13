/*
  Warnings:

  - You are about to drop the column `org_id_cloumn_name` on the `User` table. All the data in the column will be lost.
  - Added the required column `org_id_column_name` to the `User` table without a default value. This is not possible if the table is not empty.

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
    "org_type" TEXT NOT NULL,
    "org_id" INTEGER NOT NULL,
    "org_id_column_name" TEXT NOT NULL,
    "org_id_table_name" TEXT NOT NULL,
    "domain_name" TEXT NOT NULL
);
INSERT INTO "new_User" ("domain_name", "email", "firstname", "id", "job_title", "lastname", "middlename", "org_id", "org_id_table_name", "org_type", "password", "username") SELECT "domain_name", "email", "firstname", "id", "job_title", "lastname", "middlename", "org_id", "org_id_table_name", "org_type", "password", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
