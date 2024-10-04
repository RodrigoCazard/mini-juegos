import { CreateOption, Pagination } from "@/api/types";
import { PrismaClient } from "@prisma/client";


export class OptionsDao extends PrismaClient {

      constructor() {
            super();
      }

      async create(createOption: CreateOption) {

            const result = await this.option.create({
                  data: createOption
            })

            return result;

      }

      async findById(id: number) {

            const result = await this.option.findUnique({
                  where: {
                        id
                  }
            })

            return result;

      }

      async countItems() {

            const result = await this.option.count();

            return result;

      }

      async findAll(pagination: Pagination) {

            const { page, limit } = pagination;

            const result = await this.option.findMany({
                  skip: (page - 1) * limit,
                  take: limit
            })

            return result;

      }

      async findByQuestionId(questionId: number) {

            const result = await this.option.findMany({
                  where: {
                        questionId
                  }
            })

            return result;

      }

      async findCorrectOption(optionId: number, questionId: number) {

            const result = await this.option.findFirst({
                  where: {
                        id: optionId,
                        questionId: questionId,
                        isCorrect: true
                  }
            })

            return result;

      }

}