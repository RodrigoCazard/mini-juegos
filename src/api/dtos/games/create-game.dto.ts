import { DtoValidations } from "@/api/utils";


export class CreateGameDto extends DtoValidations {

      companyId: number = 0;
      name: string = '';

      protected _allowedProperties: Array<keyof this> = ['companyId', 'name'];

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

            this._validateRequiredFields(['companyId', 'name']);

            this._validateMinLength('name', 3);

            return {
                  companyId: this.companyId,
                  name: this.name
            }

      }

}