import { Game } from "../games/game.type";


export type Company = {

      id: number;
      name: string;
      logo?: string;
      backgroundColor?: string;
      createdAt: Date;
      updatedAt: Date;
      games: Game[];
      screenSavers: {
            path: string
      }[]

}