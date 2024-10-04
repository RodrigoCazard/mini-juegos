

import GameSelector from "@/app/components/GameSelector/GameSelector";
import { fetchGame, fetchPrizes, fetchQuestions } from "@/app/utils/api";

interface IntroPageProps {
      params: {
            companyNameAndId: string;
            gameNameAndId: string;
      };
}

export default async function GameIntroPage({ params }: IntroPageProps) {
      const { companyNameAndId, gameNameAndId } = params;
      const [, companyId] = companyNameAndId.split("-");
      const [, gameId] = gameNameAndId.split("-");

      const [questions, prizes, game] = await Promise.all([
            fetchQuestions(gameId),
            fetchPrizes(companyId, gameId),
            fetchGame(gameId)
      ]);

      return (
            <div className="flex flex-col items-center justify-center h-screen">
                  <GameSelector
                        questions={questions}
                        prizes={prizes}
                        gameCategory={game.category}
                  />
            </div>
      );
}