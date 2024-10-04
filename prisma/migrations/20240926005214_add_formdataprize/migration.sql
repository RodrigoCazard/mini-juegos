-- CreateTable
CREATE TABLE "FormDataPrize" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "companyId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FormDataPrize_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FormDataPrize" ADD CONSTRAINT "FormDataPrize_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
