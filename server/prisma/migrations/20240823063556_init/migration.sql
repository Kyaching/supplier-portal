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
    "password" TEXT,
    "conf_password" TEXT,
    "tenant_id" TEXT,
    "job_id" INTEGER NOT NULL,
    "user_type_id" INTEGER NOT NULL,
    CONSTRAINT "User_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "JobTitle" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "User_user_type_id_fkey" FOREIGN KEY ("user_type_id") REFERENCES "UserType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_User" ("conf_password", "email", "first_name", "id", "job_id", "last_name", "middle_name", "password", "tenant_id", "user_name", "user_type_id") SELECT "conf_password", "email", "first_name", "id", "job_id", "last_name", "middle_name", "password", "tenant_id", "user_name", "user_type_id" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_user_name_key" ON "User"("user_name");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
