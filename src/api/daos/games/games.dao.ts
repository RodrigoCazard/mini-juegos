
import { PrismaClient } from "@prisma/client";
import { CreateGame, Pagination } from "../../types";

export class GamesDao extends PrismaClient {

      constructor() {
            super();
      }

      async create(createGame: CreateGame) {

            const result = await this.game.create({
                  data: createGame
            })

            return result;

      }

      async findById(id: number) {

            const result = await this.game.findUnique({
                  where: {
                        id
                  },
                  include: {
                        questions: true,
                        playerProgresses: true
                  }
            })

            return result;

      }

      async countItems() {

            const result = await this.game.count();

            return result;

      }

      async countItemsByCompanyId(companyId: number) {

            const result = await this.game.count({
                  where: {
                        companyId
                  }
            })

            return result;

      }

      async findAll(pagination: Pagination) {

            const { page, limit } = pagination;

            const result = await this.game.findMany({
                  skip: (page - 1) * limit,
                  take: limit
            })

            return result;

      }

      async findAllByCompanyId(companyId: number, pagination: Pagination) {

            const { page, limit } = pagination;

            const result = await this.game.findMany({
                  where: {
                        companyId
                  },
                  skip: (page - 1) * limit,
                  take: limit
            })

            return result;

      }

      async findQuestionsIdsById(gameId: number) {

            const result = await this.game.findUnique({
                  where: {
                        id: gameId
                  },
                  select: {
                        questions: {
                              select: {
                                    id: true
                              }
                        }
                  }
            })

            return result;

      }

}