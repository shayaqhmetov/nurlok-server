/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Currency` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `Currency` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."TransactionType" ALTER COLUMN "direction" SET DEFAULT 'INCOMING';

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "public"."Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Currency_name_key" ON "public"."Currency"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Currency_code_key" ON "public"."Currency"("code");
