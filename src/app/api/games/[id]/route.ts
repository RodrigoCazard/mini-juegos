import { ServiceFactory } from "@/api/utils";
import { NextRequest, NextResponse } from "next/server";


const gamesService = ServiceFactory.getGamesService();

// Find a company by id. The id came from path parameter
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {

      const gameId = Number(params.id);

      console.log('Received companyId:', gameId);

      const company = await gamesService.findById(gameId);

      return NextResponse.json(company);

}