import { FormDataPrizesDao } from "@/api/daos";
import { CreateFormDataPrizeDto } from "@/api/dtos";
import { CreateFormDataPrize } from "@/api/types";


export class FormDataPrizesService {

      constructor(private formDataPrizeDao: FormDataPrizesDao) { }

      async create(createFormDataPrize: CreateFormDataPrize) {

            const createFormDataPrizeDto = new CreateFormDataPrizeDto(createFormDataPrize).validate();

            const result = await this.formDataPrizeDao.create(createFormDataPrizeDto);

            return result

      }

      async findAllByCompanyId(companyId: number) {

            const result = await this.formDataPrizeDao.findAllByCompanyId(companyId);

            return result;

      }

}