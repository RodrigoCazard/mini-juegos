import { CompaniesDao } from "@/api/daos";
import { CreateCompanyDto, PaginationDto } from "@/api/dtos";
import { CreateCompany, Pagination, PaginationResult } from "@/api/types";
import { CustomError } from "@/api/utils";


export class CompaniesService {

      constructor(private companiesDao: CompaniesDao) {

      }

      async create(createCompany: CreateCompany) {

            const createCompanyDto = new CreateCompanyDto(createCompany).validate();

            const result = await this.companiesDao.create(createCompanyDto);

            return result;

      }

      async findById(id: number) {
            const result = await this.companiesDao.findById(id);

            if (!result) {
                  throw new CustomError(404, `Company with id ${id} not found`);
            }

            if (result.socialMedias && Array.isArray(result.socialMedias)) {
                  result.socialMedias = result.socialMedias.map(socialMedia => {
                        // Filtrar los valores nulos pero manteniendo las propiedades existentes
                        return {
                              facebook: socialMedia.facebook ?? null,
                              twitter: socialMedia.twitter ?? null,
                              linkedin: socialMedia.linkedin ?? null,
                              web: socialMedia.web ?? null,
                              whatsapp: socialMedia.whatsapp ?? null,
                              instagram: socialMedia.instagram ?? null
                        };
                  });
            }

            return result;
      }


      async findAll(pagination: Pagination) {

            const paginationDto = new PaginationDto(pagination).validate();

            const { page, limit } = paginationDto;

            const totalItems = await this.companiesDao.countItems();

            const lastPage = Math.ceil(totalItems / limit);

            if (page > lastPage) {
                  throw new CustomError(400, `Page ${page} out of range`);
            }

            const result = await this.companiesDao.findAll(pagination);

            const response: PaginationResult<typeof result> = {
                  data: result,
                  meta: {
                        totalItems,
                        itemCount: result.length,
                        itemsPerPage: limit,
                        currentPage: page,
                        totalPages: lastPage
                  }
            }

            return response;

      }

      // TODO: Delete this method from here and from the CompaniesDao
      /* async update(id: number, updateCompany: any) {

            const result = await this.companiesDao.update(id, updateCompany);

            return result;

      } */

}