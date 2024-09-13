-- CreateTable
CREATE TABLE "Department" (
    "id" INTEGER NOT NULL,
    "dept_name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Department_id_key" ON "Department"("id");
