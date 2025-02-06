/*
  Warnings:

  - You are about to drop the column `averageTestScore` on the `Test` table. All the data in the column will be lost.
  - Added the required column `accuracy` to the `Test` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Test_name_key";

-- AlterTable
ALTER TABLE "Test" DROP COLUMN "averageTestScore",
ADD COLUMN     "accuracy" DOUBLE PRECISION NOT NULL;
