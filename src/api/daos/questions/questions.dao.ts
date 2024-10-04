import { CreateQuestion, Pagination } from "@/api/types";
import { PrismaClient } from "@prisma/client";


export class QuestionsDao extends PrismaClient {

      constructor() {
            super();
      }

      async create(createQuestion: CreateQuestion) {

            const result = await this.question.create({
                  data: createQuestion
            })

            return result;

      }

      async findById(id: number) {

            const result = await this.question.findUnique({
                  where: {
                        id
                  },
                  include: {
                        options: true
                  }
            })

            return result;

      }

      async findByIdAndGame(id: number, gameId: number) {

            const result = await this.question.findUnique({

                  where: {

                        id: id,
                        gameId: gameId

                  },
                  include: {
                        options: true
                  }

            })

            return result;

      }

      async countItems() {

            const result = await this.question.count();

            return result;

      }

      async findAll(pagination: Pagination) {

            const { page, limit } = pagination;

            const result = await this.question.findMany({
                  skip: (page - 1) * limit,
                  take: limit,
                  include: {
                        options: true
                  }
            })

            return result;

      }

      async findAllByGame(pagination: Pagination, gameId: number) {

            const { page, limit } = pagination;

            const result = await this.question.findMany({
                  where: {
                        gameId: gameId
                  },
                  skip: (page - 1) * limit,
                  take: limit,
                  include: {
                        options: true,
                  }
            })

            return result;

      }

}