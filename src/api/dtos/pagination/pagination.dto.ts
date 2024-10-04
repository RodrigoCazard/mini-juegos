import { DtoValidations } from "@/api/utils";


export class PaginationDto extends DtoValidations {

      public page: number = 1;
      public limit: number = 10;

      protected _allowedProperties: Array<keyof this> = ['page', 'limit'];

      constructor(query: any) {

            super()

            for (const key in query) {

                  if (this._allowedProperties.includes(key as keyof this)) {

                        this[key as keyof PaginationDto] = query[key];

                  }

            }

      }

      validate() {

            this._validateNoAdditionalProperties();

            this._validateRequiredFields(['page', 'limit']);

            this._validateMinValue('page', 1);

            this._validateMinValue('limit', 1);

            return {
                  page: this.page,
                  limit: this.limit
            };

      }

}