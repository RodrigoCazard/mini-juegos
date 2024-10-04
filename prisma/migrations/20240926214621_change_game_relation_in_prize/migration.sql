-- DropForeignKey
ALTER TABLE "Prize" DROP CONSTRAINT "Prize_gameId_fkey";

-- AlterTable
ALTER TABLE "Prize" ALTER COLUMN "gameId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Prize" ADD CONSTRAINT "Prize_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE SET NULL ON UPDATE CASCADE;
