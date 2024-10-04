/*
  Warnings:

  - Added the required column `prize` to the `FormDataPrize` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FormDataPrize" ADD COLUMN     "prize" TEXT NOT NULL;
