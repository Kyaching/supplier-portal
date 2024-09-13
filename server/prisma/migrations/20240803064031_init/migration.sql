/*
  Warnings:

  - You are about to drop the column `domain_name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `job_title` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastname` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `middlename` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `org_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `org_id_column_name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `org_id_table_name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `org_type` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "firstname" TEXT NOT NULL
);
INSERT INTO "new_User" ("firstname", "id", "username") SELECT "firstname", "id", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
