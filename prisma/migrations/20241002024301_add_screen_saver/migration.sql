-- CreateTable
CREATE TABLE "ScreenSaver" (
    "id" SERIAL NOT NULL,
    "companyId" INTEGER NOT NULL,
    "path" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ScreenSaver_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ScreenSaver" ADD CONSTRAINT "ScreenSaver_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
