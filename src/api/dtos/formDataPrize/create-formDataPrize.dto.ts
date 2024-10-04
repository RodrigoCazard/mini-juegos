import { DtoValidations } from "@/api/utils";


export class CreateFormDataPrizeDto extends DtoValidations {

      companyId: number = 0;
      prizeId: number = 0;
      name: string = '';
      email: string = '';
      phone: string = '';

      protected _allowedProperties: Array<keyof this> = ['companyId', 'prizeId', 'name', 'email', 'phone'];

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

            this._validateRequiredFields(['companyId', 'prizeId', 'name', 'email', 'phone']);

            this._validateMinLength('name', 3);

            this._validateMinLength('phone', 7);

            this._validateEmail('email');

            return {
                  companyId: this.companyId,
                  prizeId: this.prizeId,
                  name: this.name,
                  email: this.email,
                  phone: this.phone
            }

      }

}