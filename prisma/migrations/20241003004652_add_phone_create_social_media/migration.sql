/*
  Warnings:

  - Added the required column `phone` to the `FormDataPrize` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FormDataPrize" ADD COLUMN     "phone" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "SocialMedia" (
    "id" SERIAL NOT NULL,
    "companyId" INTEGER NOT NULL,
    "facebook" TEXT,
    "instagram" TEXT,
    "whatsapp" TEXT,
    "twitter" TEXT,
    "linkedin" TEXT,
    "web" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SocialMedia_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SocialMedia" ADD CONSTRAINT "SocialMedia_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
