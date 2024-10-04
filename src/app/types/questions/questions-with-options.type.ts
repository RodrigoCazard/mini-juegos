export type Option = {

      id: number;

      questionId: number;

      optionText: string;

      isCorrect: boolean;

      createdAt: Date;

      updatedAt: Date;

}


export type QuestionWithOptions = {

      id: number;

      gameId: number;

      questionText: string;

      questionType: string;

      options: Option[];

      createdAt: Date;

      updatedAt: Date;

}