import { CreateFormDataPrize } from "@/api/types";
import { PrismaClient } from "@prisma/client";


export class FormDataPrizesDao extends PrismaClient {

      constructor() {
            super()
      }

      async create(createFormDataPrize: CreateFormDataPrize) {

            const result = await this.formDataPrize.create({
                  data: createFormDataPrize
            })

            return result;

      }

      async findAllByCompanyId(companyId: number) {

            const result = await this.formDataPrize.findMany({
                  where: {
                        companyId
                  }
            })

            return result;

      }

}