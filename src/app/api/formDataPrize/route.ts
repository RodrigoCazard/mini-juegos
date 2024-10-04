import { ServiceFactory } from "@/api/utils";
import { NextRequest, NextResponse } from "next/server";


const formDataPrizeService = ServiceFactory.getFormDataPrizesService();
const prizeService = ServiceFactory.getPrizesService();

export async function POST(req: NextRequest) {

      const { name, email, phone, prizeId } = await req.json();

      const searchParams = req.nextUrl.searchParams;

      const companyId = searchParams.get("companyId");

      if (!companyId) {
            return NextResponse.json({ message: "Missing companyId param" }, { status: 400 });
      }

      const formDataPrize = await formDataPrizeService.create({
            companyId: Number(companyId),
            name: name,
            email: email,
            phone: phone,
            prizeId: Number(prizeId)
      })



      await prizeService.restUnitStock(Number(prizeId));

      return NextResponse.json(formDataPrize);

}

export async function GET(req: NextRequest) {

      const searchParams = req.nextUrl.searchParams;

      const companyId = searchParams.get("companyId");

      if (!companyId) {
            return NextResponse.json({ message: "Missing companyId param" }, { status: 400 });
      }

      const formDataPrizes = await formDataPrizeService.findAllByCompanyId(
            Number(companyId)
      )

      return NextResponse.json(formDataPrizes);

}