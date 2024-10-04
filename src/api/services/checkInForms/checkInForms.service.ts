import { CheckinFormsDao } from "@/api/daos";
import { CreateCheckInFormDto } from "@/api/dtos";
import { CreateCheckInForm } from "@/api/types";


export class CheckInFormsService {

      constructor(private checkInFormsDao: CheckinFormsDao) { }

      async create(createCheckInForm: CreateCheckInForm) {

            const createCheckInFormDto = new CreateCheckInFormDto(createCheckInForm).validate();

            const result = await this.checkInFormsDao.create(createCheckInFormDto);

            return result;

      }

      async findAllByCompanyId(companyId: number) {

            const result = await this.checkInFormsDao.findAllByCompanyId(companyId);

            return result;

      }

}