import { ServiceFactory } from "@/api/utils";
import { NextRequest, NextResponse } from "next/server";


const prizesService = ServiceFactory.getPrizesService();

export async function GET(req: NextRequest) {

      const searchParams = req.nextUrl.searchParams;

      const companyId = searchParams.get("companyId");

      const gameId = searchParams.get("gameId");

      if (!companyId) {
            return NextResponse.json({ message: "Missing companyId param" }, { status: 400 });
      }

      const prizes = await prizesService.findAll(Number(companyId), gameId ? Number(gameId) : undefined);

      return NextResponse.json(prizes);

}