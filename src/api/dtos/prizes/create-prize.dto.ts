import { DtoValidations } from "@/api/utils";


export class CreatePrizeDto extends DtoValidations {

      gameId: number = 0;
      companyId: number = 0;
      name: string = '';
      stock: number = 0;

      protected _allowedProperties: Array<keyof this> = ['gameId', 'companyId', 'name', 'stock'];

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

            this._validateRequiredFields(['companyId', 'name', 'stock']);

            this._validateMinLength('name', 3);

            return {
                  gameId: this.gameId,
                  companyId: this.companyId,
                  name: this.name,
                  stock: this.stock
            }

      }


}