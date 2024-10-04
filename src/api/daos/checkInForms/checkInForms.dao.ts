import { CreateCheckInForm } from "@/api/types";
import { PrismaClient } from "@prisma/client";


export class CheckinFormsDao extends PrismaClient {

      constructor() {
            super();
      }

      async create(createCheckInForm: CreateCheckInForm) {

            const result = await this.checkInForm.create({
                  data: createCheckInForm
            });

            return result;

      }

      async findAllByCompanyId(companyId: number) {

            const result = await this.checkInForm.findMany({
                  where: {
                        companyId
                  }
            });

            return result;

      }

}