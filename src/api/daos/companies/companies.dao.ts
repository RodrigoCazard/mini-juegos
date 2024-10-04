
import { PrismaClient } from "@prisma/client";
import { CreateCompany, Pagination } from "../../types";


export class CompaniesDao extends PrismaClient {

      constructor() {
            super();
      }

      async create(createCompany: CreateCompany) {

            const result = await this.company.create({
                  data: createCompany
            })

            return result;

      }

      async findById(id: number) {

            const result = await this.company.findUnique({
                  where: {
                        id
                  },
                  include: {
                        games: true,
                        screenSavers: {
                              select: {
                                    path: true
                              }
                        },
                        socialMedias: {
                              select: {
                                    facebook: true,
                                    instagram: true,
                                    whatsapp: true,
                                    twitter: true,
                                    linkedin: true,
                                    web: true,
                              }
                        }
                  }

            })

            return result;

      }

      async countItems() {

            const result = await this.company.count();

            return result;

      }

      async findAll(pagination: Pagination) {

            const { page, limit } = pagination;

            const result = await this.company.findMany({
                  skip: (page - 1) * limit,
                  take: limit,
                  include: {
                        games: {
                              select: {
                                    id: true,
                              }
                        },
                        screenSavers: {
                              select: {
                                    path: true
                              }
                        },
                        socialMedias: {
                              select: {
                                    facebook: true,
                                    instagram: true,
                                    whatsapp: true,
                                    twitter: true,
                                    linkedin: true,
                                    web: true,
                              }
                        }
                  }
            })

            return result;

      }

      //TODO: Delete this method from here and from the service
      /* async update(id: number, updateCompany: any) {

            const result = await this.company.update({
                  where: {
                        id
                  },
                  data: updateCompany
            })

            return result;

      } */

}