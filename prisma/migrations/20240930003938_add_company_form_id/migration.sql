/*
  Warnings:

  - Made the column `logo` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `backgroundColor` on table `Company` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "companyFormId" TEXT,
ALTER COLUMN "logo" SET NOT NULL,
ALTER COLUMN "backgroundColor" SET NOT NULL;
