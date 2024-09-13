/*
  Warnings:

  - You are about to drop the column `userId` on the `JobTitle` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `UserType` table. All the data in the column will be lost.
  - Added the required column `job_id` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_type_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_JobTitle" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL
);
INSERT INTO "new_JobTitle" ("id", "title") SELECT "id", "title" FROM "JobTitle";
DROP TABLE "JobTitle";
ALTER TABLE "new_JobTitle" RENAME TO "JobTitle";
CREATE UNIQUE INDEX "JobTitle_id_key" ON "JobTitle"("id");
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_name" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "middle_name" TEXT,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "conf_password" TEXT NOT NULL,
    "tenant_id" TEXT,
    "job_id" INTEGER NOT NULL,
    "user_type_id" INTEGER NOT NULL,
    CONSTRAINT "User_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "JobTitle" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "User_user_type_id_fkey" FOREIGN KEY ("user_type_id") REFERENCES "UserType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_User" ("conf_password", "email", "first_name", "id", "last_name", "middle_name", "password", "tenant_id", "user_name") SELECT "conf_password", "email", "first_name", "id", "last_name", "middle_name", "password", "tenant_id", "user_name" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_user_name_key" ON "User"("user_name");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE TABLE "new_UserType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL
);
INSERT INTO "new_UserType" ("id", "type") SELECT "id", "type" FROM "UserType";
DROP TABLE "UserType";
ALTER TABLE "new_UserType" RENAME TO "UserType";
CREATE UNIQUE INDEX "UserType_id_key" ON "UserType"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
