import { DtoValidations } from "@/api/utils";


export class CreateCheckInFormDto extends DtoValidations {

      companyId: number = 0;
      first_name: string = '';
      last_name: string = '';
      email: string = '';
      age: number = 0;

      protected _allowedProperties: Array<keyof this> = ['companyId', 'first_name', 'last_name', 'email', 'age',];

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

            this._validateRequiredFields(['companyId', 'first_name', 'last_name', 'email', 'age',]);

            this._validateMinLength('first_name', 3);

            this._validateMinLength('last_name', 3);

            this._validateEmail('email');

            this._validateMinValue('age', 18);

            return {
                  companyId: this.companyId,
                  first_name: this.first_name,
                  last_name: this.last_name,
                  email: this.email,
                  age: this.age
            }

      }

}