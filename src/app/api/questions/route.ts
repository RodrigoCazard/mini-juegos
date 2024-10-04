
import { ServiceFactory } from "@/api/utils";
import { NextRequest, NextResponse } from "next/server";

const questionsService = ServiceFactory.getQuestionsService();

export async function GET(req: NextRequest) {


      const searchParams = req.nextUrl.searchParams;

      const gameId = searchParams.get("gameId");

      if (!gameId) {
            return NextResponse.json({ message: "Missing gameId param" }, { status: 400 });
      }

      const page = searchParams.get("page") || 1;

      const limit = searchParams.get("limit") || 10;


      const questions = await questionsService.findAllByGame(
            {
                  page: Number(page),
                  limit: Number(limit)
            },
            Number(gameId)
      )

      if (!questions) {
            return NextResponse.json({ message: "No questions found" }, { status: 404 });
      }

      return NextResponse.json(questions, { status: 200 });



}