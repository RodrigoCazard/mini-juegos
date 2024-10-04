import { OptionsDao } from "@/api/daos";
import { CreateOptionDto, PaginationDto } from "@/api/dtos";
import { CreateOption, Pagination } from "@/api/types";
import { CustomError } from "@/api/utils";


export class OptionsService {

      constructor(private optionsDao: OptionsDao) { }

      async create(createOption: CreateOption) {

            const createOptionDto = new CreateOptionDto(createOption).validate();

            const result = await this.optionsDao.create(createOptionDto);

            return result;

      }

      async findById(id: number) {

            const result = await this.optionsDao.findById(id);

            if (!result) {
                  throw new CustomError(404, `Option with id ${id} not found`);
            }

            return result;

      }

      async findAll(pagination: Pagination) {

            const paginationDto = new PaginationDto(pagination).validate();

            const { page, limit } = paginationDto;

            const totalItems = await this.optionsDao.countItems();

            const lastPage = Math.ceil(totalItems / limit);

            if (page > lastPage) {
                  throw new CustomError(400, `Page ${page} out of range`);
            }

            const result = await this.optionsDao.findAll(pagination);

            return result;

      }

      async findByQuestionId(questionId: number) {

            const result = await this.optionsDao.findByQuestionId(questionId);

            return result;

      }

      async findCorrectOption(optionId: number, questionId: number) {

            const result = await this.optionsDao.findCorrectOption(optionId, questionId);

            if (!result) {
                  throw new CustomError(404, `Option with id ${optionId} not found for question with id ${questionId}`);
            }

            return result;

      }

}