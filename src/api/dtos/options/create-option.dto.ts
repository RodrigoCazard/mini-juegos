import { DtoValidations } from "@/api/utils";


export class CreateOptionDto extends DtoValidations {

      questionId: number = 0;
      optionText: string = '';
      isCorrect: boolean = false;

      protected _allowedProperties: Array<keyof this> = ['questionId', 'optionText', 'isCorrect'];

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

            this._validateRequiredFields(['questionId', 'optionText', 'isCorrect']);

            this._validateMinLength('optionText', 3);

            return {
                  questionId: this.questionId,
                  optionText: this.optionText,
                  isCorrect: this.isCorrect
            }

      }


}