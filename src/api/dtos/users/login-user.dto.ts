import { DtoValidations } from "@/api/utils";


export class LoginUserDto extends DtoValidations {

      public email: string = '';
      public password: string = '';

      protected _allowedProperties: Array<keyof this> = ['email', 'password'];

      constructor(body: any) {

            super()

            for (const key in body) {

                  if (this._allowedProperties.includes(key as keyof this)) {

                        this[key as keyof this] = body[key];

                  }

            }

      }

      validate() {

            this._validateNoAdditionalProperties();

            this._validateRequiredFields(['email', 'password']);

            this._validateMinLength('password', 8);


            return {
                  email: this.email,
                  password: this.password
            }

      }




}