/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Test` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Solution" (
    "id" SERIAL NOT NULL,
    "testName" TEXT NOT NULL,
    "answer" INTEGER[],

    CONSTRAINT "Solution_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Solution_testName_key" ON "Solution"("testName");

-- CreateIndex
CREATE UNIQUE INDEX "Test_name_key" ON "Test"("name");
