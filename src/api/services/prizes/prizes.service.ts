import { PrizesDao } from "@/api/daos";
import { CreatePrizeDto } from "@/api/dtos";
import { CreatePrize } from "@/api/types";
import { CustomError } from "@/api/utils";
import { Prize } from "@prisma/client";


export class PrizesService {

      constructor(private prizesDao: PrizesDao) { }

      private async _returnOnlyPrizesWithStock(prizes: Prize[]) {

            const prizesWithStock = prizes.filter(prize => prize.stock > 0);

            if (prizesWithStock.length === 0) {

                  throw new CustomError(404, 'No prizes with stock found');

            }

            return prizesWithStock;

      }

      private async _validateStock(prize: Prize, quantity: number) {

            if (prize.stock < quantity) {

                  throw new CustomError(400, 'Not enough stock');

            }

            return true;

      }

      private async _getByCompanyOrCompanyAndGame(companyId: number, gameId?: number) {


            if (gameId) {

                  const prizes = await this.prizesDao.findAllByGameAndCompanyIds(gameId, companyId);

                  const response = await this._returnOnlyPrizesWithStock(prizes);

                  return response;

            }

            const result = await this.prizesDao.findAllByCompanyId(companyId);

            const response = await this._returnOnlyPrizesWithStock(result);

            return response;


      }

      private async _restStock(prize: Prize, quantity: number) {

            const newStock = prize.stock - quantity;

            return newStock;

      }

      private async _redistributeProbability(prize: Prize, companyId: number) {
            // Obtener todos los premios de la compañía
            const prizes = await this.prizesDao.findAllByCompanyId(companyId);

            // Filtrar los premios que tienen stock
            const prizesWithStock = await this._returnOnlyPrizesWithStock(prizes);

            // Eliminar el premio agotado de la lista de premios con stock
            const remainingPrizes = prizesWithStock.filter(p => p.id !== prize.id);

            if (remainingPrizes.length === 0) {
                  throw new CustomError(400, 'No prizes left to redistribute probability');
            }

            // Calcular la probabilidad a redistribuir
            const probabilityToRedistribute = prize.probability ?? 0;
            const sharePerPrize = probabilityToRedistribute / remainingPrizes.length;

            // Actualizar la probabilidad de cada premio restante
            for (const p of remainingPrizes) {
                  const newProbability = (p.probability ?? 0) + sharePerPrize;
                  await this.prizesDao.updateProbability(p.id, newProbability);
            }
      }

      async create(createPrize: CreatePrize) {

            const createPrizeDto = new CreatePrizeDto(createPrize).validate();

            const result = await this.prizesDao.create(createPrizeDto);

            return result;

      }

      async findAll(companyId: number, gameId?: number) {

            const result = await this._getByCompanyOrCompanyAndGame(companyId, gameId);

            return result;

      }

      async findById(prizeId: number) {

            const result = await this.prizesDao.findById(prizeId);

            if (!result) {

                  throw new CustomError(404, 'Prize not found');

            }

            return result;

      }

      async restUnitStock(prizeId: number) {
            const prize = await this.findById(prizeId);

            // Validar si hay suficiente stock
            await this._validateStock(prize, 1);

            // Restar 1 al stock
            const newStock = await this._restStock(prize, 1);

            // Actualizar el stock en la base de datos
            const result = await this.prizesDao.updateStock(prizeId, newStock);

            if (result.stock === prize.stock) {
                  throw new CustomError(500, 'Error updating stock');
            }

            // Si el stock llega a 0, redistribuir las probabilidades
            if (newStock === 0) {
                  await this._redistributeProbability(prize, prize.companyId);
            }

            return result;
      }

}