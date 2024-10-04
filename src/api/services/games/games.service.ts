import { GamesDao } from "@/api/daos";
import { CreateGameDto, PaginationDto } from "@/api/dtos";
import { CreateGame, Pagination, PaginationResult } from "@/api/types";
import { CustomError } from "@/api/utils";

export class GamesService {

      constructor(private gamesDao: GamesDao) { }

      async create(createGame: CreateGame) {

            const createOptionDto = new CreateGameDto(createGame).validate();

            const result = await this.gamesDao.create(createOptionDto);

            return result

      }

      async findById(id: number) {

            const result = await this.gamesDao.findById(id);

            if (!result) {
                  throw new CustomError(404, `Game with id ${id} not found`);
            }

            return result;

      }

      async findAll(pagination: Pagination) {

            const paginationDto = new PaginationDto(pagination).validate();

            const { page, limit } = paginationDto;

            const totalItems = await this.gamesDao.countItems();

            const lastPage = Math.ceil(totalItems / limit);

            if (page > lastPage) {
                  throw new CustomError(400, `Page ${page} out of range`);
            }

            const result = await this.gamesDao.findAll(pagination);

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

      async findAllByCompanyId(pagination: Pagination, companyId: number,) {

            const paginationDto = new PaginationDto(pagination).validate();

            const { page, limit } = paginationDto;

            const totalItems = await this.gamesDao.countItemsByCompanyId(companyId);

            const lastPage = Math.ceil(totalItems / limit);

            if (page > lastPage) {
                  throw new CustomError(400, `Page ${page} out of range`);
            }

            const result = await this.gamesDao.findAllByCompanyId(companyId, pagination);

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

      async findQuestionsIdsById(gameId: number) {

            const result = await this.gamesDao.findQuestionsIdsById(gameId);

            if (!result || result.questions.length === 0) {
                  throw new CustomError(404, `Questions ids for game with id ${gameId} not found`);
            }

            return result.questions.map((question: { id: number }) => question.id);

      }


}