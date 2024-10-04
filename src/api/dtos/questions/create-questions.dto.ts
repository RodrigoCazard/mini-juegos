import { QuestionType } from "@/api/enums";
import { DtoValidations } from "@/api/utils";


export class CreateQuestionDto extends DtoValidations {

      public gameId: number = 0;
      public questionText: string = '';
      public questionType: QuestionType = QuestionType.MULTIPLE_CHOICE;

      protected _allowedProperties: Array<keyof this> = ['gameId', 'questionText', 'questionType'];

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

            this._validateRequiredFields(['gameId', 'questionText', 'questionType']);

            this._validateMinLength('questionText', 3);

            return {
                  gameId: this.gameId,
                  questionText: this.questionText,
                  questionType: this.questionType
            }

      }

}