-- CreateTable
CREATE TABLE "Messages" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sender" TEXT,
    "receivers" TEXT,
    "subject" TEXT,
    "body" TEXT,
    "data" TEXT,
    "status" TEXT
);
