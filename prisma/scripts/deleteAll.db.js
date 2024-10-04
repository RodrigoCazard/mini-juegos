import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {

      await prisma.formDataPrize.deleteMany()
      await prisma.screenSaver.deleteMany()
      await prisma.socialMedia.deleteMany()
      await prisma.prize.deleteMany()
      await prisma.user.deleteMany()
      await prisma.option.deleteMany()
      await prisma.playerProgress.deleteMany()
      await prisma.question.deleteMany()
      await prisma.checkInForm.deleteMany()
      await prisma.game.deleteMany()
      await prisma.company.deleteMany()

      console.log('All data deleted')

}

main().catch(e => {
      console.error(e)
      process.exit(1)
}).finally(async () => {
      await prisma.$disconnect()
})