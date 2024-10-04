import { CreatePrize } from "@/api/types";
import { PrismaClient } from "@prisma/client";

export class PrizesDao extends PrismaClient {

      constructor() {
            super();
      }

      async create(createPrize: CreatePrize) {

            const result = await this.prize.create({
                  data: createPrize
            });

            return result;

      }

      async findAllByCompanyId(companyId: number) {

            const result = await this.prize.findMany({
                  where: {
                        companyId
                  }
            });

            return result;

      }

      async findAllByGameAndCompanyIds(gameId: number, companyId: number) {

            const result = await this.prize.findMany({
                  where: {
                        companyId,
                        OR: [
                              { gameId: null },
                              { gameId: gameId }
                        ]
                  }
            });

            return result;

      }

      async findById(prizeId: number) {

            const result = await this.prize.findUnique({
                  where: {
                        id: prizeId
                  }
            });

            return result;

      }

      async updateStock(prizeId: number, stock: number) {

            const result = await this.prize.update({
                  where: {
                        id: prizeId
                  },
                  data: {
                        stock
                  }
            });

            return result;

      }

      async updateProbability(prizeId: number, probability: number) {
            const result = await this.prize.update({
                  where: {
                        id: prizeId
                  },
                  data: {
                        probability
                  }
            });

            return result;
      }

}
