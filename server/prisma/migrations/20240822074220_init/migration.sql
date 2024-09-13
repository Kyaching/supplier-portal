/*
  Warnings:

  - You are about to drop the column `domain_name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `firstname` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastname` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `middlename` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `org_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `org_id_column_name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `org_id_table_name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `org_type` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - Added the required column `first_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_type` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "JobTitle" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "JobTitle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "UserType_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_name" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "middle_name" TEXT,
    "last_name" TEXT NOT NULL,
    "job_title" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "conf_password" TEXT NOT NULL,
    "user_type" TEXT NOT NULL
);
INSERT INTO "new_User" ("conf_password", "email", "id", "job_title", "password") SELECT "conf_password", "email", "id", "job_title", "password" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_user_name_key" ON "User"("user_name");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "JobTitle_id_key" ON "JobTitle"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserType_id_key" ON "UserType"("id");
