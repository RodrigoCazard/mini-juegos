import SlideShowOrSelector from "../components/SlideShowOrSelector/SlideShowOrSelector";
import { Game } from "../types";
import { fetchGames } from "../utils/api";


type Props = {
      params: {
            companyNameAndId: string;
      };
};

export default async function CompanyPage({ params }: Props) {
      const { companyNameAndId } = params;
      const [, companyId] = companyNameAndId.split('-');

      const games: Game[] = await fetchGames(companyId);

      return (
            <SlideShowOrSelector
                  games={games}
                  basePath={companyNameAndId}
            />
      );
}