import { ServiceFactory } from "@/api/utils";
import { NextRequest, NextResponse } from "next/server";


const gamesService = ServiceFactory.getGamesService();

export async function GET(req: NextRequest) {

      const searchParams = req.nextUrl.searchParams;

      const companyId = searchParams.get("companyId");

      if (!companyId) {
            return NextResponse.json({ message: "Missing companyId param" }, { status: 400 });
      }

      const page = searchParams.get("page") || 1;

      const limit = searchParams.get("limit") || 10;

      const games = await gamesService.findAllByCompanyId(
            {
                  page: Number(page),
                  limit: Number(limit)
            },
            Number(companyId)
      )

      return NextResponse.json(games);

}