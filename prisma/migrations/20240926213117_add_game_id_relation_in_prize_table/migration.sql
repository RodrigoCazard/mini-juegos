/*
  Warnings:

  - Added the required column `gameId` to the `Prize` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Prize" ADD COLUMN     "gameId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Prize" ADD CONSTRAINT "Prize_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
