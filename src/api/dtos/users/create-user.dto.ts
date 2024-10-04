import { CustomError, DtoValidations } from "@/api/utils";
import * as bcript from 'bcrypt';
import { ExpirationUnits } from "@/api/enums";


export class CreateUserDto extends DtoValidations {

      public email: string = '';
      public password: string = '';
      public confirmPassword: string = '';
      public expiresInUnit: ExpirationUnits = ExpirationUnits.SECONDS;
      public expiresInValue: string = '';

      protected _allowedProperties: Array<keyof this> = ['email', 'password', 'confirmPassword', 'expiresInUnit', 'expiresInValue'];

      constructor(body: any) {

            super()

            for (const key in body) {

                  if (this._allowedProperties.includes(key as keyof this)) {

                        this[key as keyof this] = body[key];

                  }

            }

      }

      private _hashPassword() {

            return bcript.hashSync(this.password, 10);

      }

      private _validateSamePassword() {

            if (this.password !== this.confirmPassword) {

                  throw new CustomError(400, 'The passwords do not match');

            }

      }


      private _validateExpiresIn() {

            this.expiresInUnit = this.expiresInUnit.toUpperCase() as ExpirationUnits;

            if (!ExpirationUnits[this.expiresInUnit]) {

                  throw new CustomError(400, 'Invalid expiration unit');

            }

            if (isNaN(parseInt(this.expiresInValue.toString()))) {

                  throw new CustomError(400, 'Invalid expiration value');

            }



      }

      validate() {

            this._validateNoAdditionalProperties();

            this._validateRequiredFields(['email', 'password', 'confirmPassword', 'expiresInUnit', 'expiresInValue']);

            this._validateExpiresIn();

            this._validateMinLength('password', 8);

            this._validateSamePassword();

            return {
                  email: this.email,
                  hashedPassword: this._hashPassword(),
                  expiresInUnit: this.expiresInUnit,
                  expiresInValue: this.expiresInValue
            }

      }

}