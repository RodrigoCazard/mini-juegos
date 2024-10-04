import { UsersDao } from "@/api/daos";
import { CreateUser, LoginUser } from "@/api/types";
import { CustomError } from "@/api/utils";
import { ExpirationUnits } from "@/api/enums";

import * as bcrypt from 'bcrypt';


export class UsersService {

      constructor(private usersDao: UsersDao) { }

      private _validateHashedPassword(password: string, hashedPassword: string) {

            return bcrypt.compareSync(password, hashedPassword);

      }

      private _createExpiresAt(expiresInUnit: ExpirationUnits, expiresInValue: number) {

            const expiresAt = new Date();

            switch (expiresInUnit) {

                  case ExpirationUnits.SECONDS:
                        expiresAt.setSeconds(expiresAt.getSeconds() + expiresInValue);
                        break;

                  case ExpirationUnits.MINUTES:
                        expiresAt.setMinutes(expiresAt.getMinutes() + expiresInValue);
                        break;

                  case ExpirationUnits.HOURS:
                        expiresAt.setHours(expiresAt.getHours() + expiresInValue);
                        break;

                  case ExpirationUnits.DAYS:
                        expiresAt.setDate(expiresAt.getDate() + expiresInValue);
                        break;

            }

            return expiresAt;

      }

      private async _checkNotExpired(id: number, expiresAt: Date, isExpired: boolean) {

            if (isExpired) {

                  throw new CustomError(400, 'The user has expired');

            }

            if (expiresAt < new Date()) {

                  await this.usersDao.update(id, { isExpired: true });

                  throw new CustomError(400, 'The user has expired');

            }

      }

      private async _checkExistingEmail(email: string) {

            const user = await this.usersDao.findByEmail(email);

            if (user) {

                  throw new CustomError(400, 'Invalid email');

            }

      }

      // TODO: Delete this method from here and delete the same method from the users.dao.ts file
      async create(createUser: CreateUser) {

            await this._checkExistingEmail(createUser.email);

            const expiresAt = this._createExpiresAt(createUser.expiresInUnit, parseInt(createUser.expiresInValue));

            /*  const result = await this.usersDao.create(createUser.email, createUser.hashedPassword, expiresAt); */

            return { email: createUser.email, expiresAt };

      }

      async findByEmail(email: string) {

            const result = await this.usersDao.findByEmail(email);

            if (!result) {

                  throw new CustomError(404, 'User not found');

            }

            return result;

      }

      async login(loginUser: LoginUser) {

            const user = await this.findByEmail(loginUser.email);

            await this._checkNotExpired(user.id, user.expiresAt, user.isExpired);

            if (!this._validateHashedPassword(loginUser.password, user.passwordHash)) {

                  throw new CustomError(400, 'Invalid credentials');

            }

            return user;

      }

}