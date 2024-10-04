export enum GameCategory {

      QA = 'QA',

      ALTERNATIVE_QA = 'ALTERNATIVE_QA',

      ALTERNATIVE_QA_WITHOUT_TIMER = 'ALTERNATIVE_QA_WITHOUT_TIMER',

      NEW_ALTERNATIVE = 'NEW_ALTERNATIVE',

      ROULETTE = 'ROULETTE',

      MEMORY = 'MEMORY',

}

export type Game = {

      id: number;

      companyId: number;

      name: string;

      category: GameCategory;

      createdAt: Date;

      updatedAt: Date;

}