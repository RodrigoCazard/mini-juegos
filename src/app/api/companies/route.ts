import { ServiceFactory } from "@/api/utils";
import { NextRequest, NextResponse } from "next/server";


const companiesService = ServiceFactory.getCompaniesService();

export async function GET(req: NextRequest) {

      const searchParams = req.nextUrl.searchParams;

      const page = searchParams.get("page") || 1;

      const limit = searchParams.get("limit") || 10;

      const companies = await companiesService.findAll(
            {
                  page: Number(page),
                  limit: Number(limit)
            }
      )

      return NextResponse.json(companies);

}