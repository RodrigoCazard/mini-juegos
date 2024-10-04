import { CheckinFormsDao, CompaniesDao, FormDataPrizesDao, GamesDao, OptionsDao, PrizesDao, QuestionsDao, UsersDao } from "@/api/daos";
import { CheckInFormsService, CompaniesService, FormDataPrizesService, GamesService, OptionsService, PrizesService, QuestionsService, UsersService } from "@/api/services";


export class ServiceFactory {

      static getCompaniesService(): CompaniesService {

            return new CompaniesService(new CompaniesDao());

      }

      static getGamesService(): GamesService {

            return new GamesService(new GamesDao());

      }

      static getQuestionsService(): QuestionsService {

            return new QuestionsService(
                  new QuestionsDao(),
                  new GamesService(new GamesDao())
            );

      }

      static getOptionsService(): OptionsService {

            return new OptionsService(new OptionsDao());

      }

      static getUsersService(): UsersService {

            return new UsersService(new UsersDao())

      }

      static getFormDataPrizesService(): FormDataPrizesService {

            return new FormDataPrizesService(new FormDataPrizesDao())

      }

      static getPrizesService(): PrizesService {

            return new PrizesService(new PrizesDao())

      }

      static getCheckInFormsService(): CheckInFormsService {

            return new CheckInFormsService(new CheckinFormsDao())

      }

}