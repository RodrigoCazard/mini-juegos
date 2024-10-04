/*
  Warnings:

  - A unique constraint covering the columns `[email,companyId]` on the table `FormDataPrize` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `companyId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "FormDataPrize_email_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "companyId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "FormDataPrize_email_companyId_key" ON "FormDataPrize"("email", "companyId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
