-- CreateEnum
CREATE TYPE "GameCategory" AS ENUM ('QA', 'ROULETTE', 'MEMORY');

-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "category" "GameCategory" NOT NULL DEFAULT 'QA';
