
import { DtoValidations } from "@/api/utils";


export class CreateCompanyDto extends DtoValidations {

      public name: string = '';
      public expiresAt: Date = new Date();
      public logo: string = '';
      public backgroundColor: string = '';

      protected _allowedProperties: Array<keyof this> = ['name', 'expiresAt', 'logo', 'backgroundColor'];

      constructor(body: any) {

            super();

            for (const key in body) {

                  if (this._allowedProperties.includes(key as keyof this)) {

                        this[key as keyof this] = body[key];

                  }

            }

      }

      validate() {

            this._validateNoAdditionalProperties();

            this._validateRequiredFields(['name', 'expiresAt', 'logo', 'backgroundColor']);

            this._validateMinLength('name', 3);

            if (this.logo) {

                  this._validateMinLength('logo', 3);

            }

            if (this.backgroundColor) {

                  this._validateMinLength('backgroundColor', 3);

            }

            return {
                  name: this.name,
                  expiresAt: this.expiresAt,
                  logo: this.logo,
                  backgroundColor: this.backgroundColor
            };
      }

}
