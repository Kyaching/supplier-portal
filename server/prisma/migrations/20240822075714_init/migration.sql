/*
  Warnings:

  - You are about to drop the column `job_title` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `user_type` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_name" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "middle_name" TEXT,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "conf_password" TEXT NOT NULL
);
INSERT INTO "new_User" ("conf_password", "email", "first_name", "id", "last_name", "middle_name", "password", "user_name") SELECT "conf_password", "email", "first_name", "id", "last_name", "middle_name", "password", "user_name" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_user_name_key" ON "User"("user_name");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
