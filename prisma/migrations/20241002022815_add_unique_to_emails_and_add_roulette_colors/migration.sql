/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `CheckInForm` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `FormDataPrize` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "rouletteColors" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "CheckInForm_email_key" ON "CheckInForm"("email");

-- CreateIndex
CREATE UNIQUE INDEX "FormDataPrize_email_key" ON "FormDataPrize"("email");
