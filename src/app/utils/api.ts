// utils/api.ts
import { envs } from "@/api/config/envs";
import { Company, Game, Prize, QuestionWithOptions } from "@/app/types";

async function fetchData<T>(url: string): Promise<T> {
      const res = await fetch(url, {
            method: 'GET',
            headers: {
                  'Content-Type': 'application/json',
            },
            cache: 'no-store',
      });

      if (!res.ok) {
            console.error(`Failed to fetch data from ${url}:`, res.statusText);
            throw new Error(`Failed to fetch data from ${url}`);
      }

      return res.json();
}

export async function fetchCompanies(): Promise<Company[]> {
      const data = await fetchData<{ data: Company[] }>(`${envs.API_URL}/companies?page=1&limit=100`);
      return data.data;
}

export async function fetchGames(companyId: string): Promise<Game[]> {
      const data = await fetchData<{ data: Game[] }>(`${envs.API_URL}/games?companyId=${companyId}&page=1&limit=100`);
      return data.data;
}

export async function fetchQuestions(gameId: string): Promise<QuestionWithOptions[]> {
      const data = await fetchData<{ data: QuestionWithOptions[] }>(`${envs.API_URL}/questions?gameId=${gameId}&page=1&limit=100`);
      return data.data;
}

export async function fetchPrizes(companyId: string, gameId: string): Promise<Prize[]> {
      return fetchData<Prize[]>(`${envs.API_URL}/prizes?companyId=${companyId}&gameId=${gameId}`);
}

export async function fetchGame(gameId: string): Promise<Game> {
      return fetchData<Game>(`${envs.API_URL}/games/${gameId}`);
}