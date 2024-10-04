import { PrismaClient } from "@prisma/client";


export class UsersDao extends PrismaClient {

      constructor() {

            super()

      }

      // //TODO: Delete this method from here and delete the same method from the users.service.ts file
      // async create(email: string, hashedPassword: string, expiresAt: Date) {

      //       const result = await this.user.create({

      //             data: {

      //                   email,
      //                   passwordHash: hashedPassword,
      //                   expiresAt

      //             }

      //       })

      //       return result;

      // }

      async findById(id: number) {

            const result = await this.user.findUnique({

                  where: {

                        id

                  }

            })

            return result;

      }

      async findByEmail(email: string) {


            const result = await this.user.findUnique({

                  where: {
                        email,
                  }

            })

            return result;

      }

      async update(id: number, data: any) {

            const result = await this.user.update({

                  where: {
                        id
                  },
                  data

            })

            return result;

      }

}