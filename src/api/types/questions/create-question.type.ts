import { QuestionType } from "@/api/enums";


export type CreateQuestion = {

      gameId: number;

      questionText: string;

      questionType: QuestionType;

}