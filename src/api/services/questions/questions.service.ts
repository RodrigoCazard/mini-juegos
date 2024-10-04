import { QuestionsDao } from "@/api/daos";
import { CreateQuestionDto, PaginationDto } from "@/api/dtos";
import { CreateQuestion, Pagination, PaginationResult } from "@/api/types";
import { CustomError } from "@/api/utils";
import { GamesService } from "../games/games.service";


export class QuestionsService {

      constructor(
            private questionsDao: QuestionsDao,
            private gamesService: GamesService
      ) {

      }

      async create(createQuestion: CreateQuestion) {

            const createQuestionDto = new CreateQuestionDto(createQuestion).validate();

            const result = await this.questionsDao.create(createQuestionDto);

            return result;

      }

      async findById(id: number) {

            const result = await this.questionsDao.findById(id);

            if (!result) {
                  throw new CustomError(404, `Question with id ${id} not found`);
            }

            return result;

      }

      async findByIdAndGame(id: number, gameId: number) {

            const result = await this.questionsDao.findByIdAndGame(id, gameId);

            if (!result) {
                  throw new CustomError(404, `Question with id ${id} not found for game with id ${gameId}`);
            }

            return result;

      }

      async countItems() {

            const totalItems = await this.questionsDao.countItems();

            if (totalItems === 0) {
                  throw new CustomError(404, `No questions found`);
            }

            return totalItems;

      }


      async findAll(pagination: Pagination) {

            const paginationDto = new PaginationDto(pagination).validate();

            const { page, limit } = paginationDto;

            const totalItems = await this.questionsDao.countItems();

            const lastPage = Math.ceil(totalItems / limit);

            if (page > lastPage) {
                  throw new CustomError(400, `Page ${page} out of range`);
            }

            const result = await this.questionsDao.findAll(paginationDto);

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

      async findAllByGame(pagination: Pagination, gameId: number) {

            await this.gamesService.findById(gameId);

            const paginationDto = new PaginationDto(pagination).validate();

            const { page, limit } = paginationDto;

            const totalItems = await this.questionsDao.countItems();

            const lastPage = Math.ceil(totalItems / limit);

            if (page > lastPage) {
                  throw new CustomError(400, `Page ${page} out of range`);
            }

            const result = await this.questionsDao.findAllByGame(paginationDto, gameId);

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

}