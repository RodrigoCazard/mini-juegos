import { ServiceFactory } from "@/api/utils";
import { NextRequest, NextResponse } from "next/server";


const checkInFormsService = ServiceFactory.getCheckInFormsService();

export async function POST(req: NextRequest) {

      const { companyId, first_name, last_name, email, age } = await req.json();

      const checkInForm = await checkInFormsService.create({
            companyId: Number(companyId),
            first_name: first_name,
            last_name: last_name,
            email: email,
            age: Number(age)
      })

      return NextResponse.json(checkInForm);

}

export async function GET(req: NextRequest) {

      const searchParams = req.nextUrl.searchParams;

      const companyId = searchParams.get("companyId");

      if (!companyId) {
            return NextResponse.json({ message: "Missing companyId param" }, { status: 400 });
      }

      const checkInForms = await checkInFormsService.findAllByCompanyId(
            Number(companyId)
      )

      return NextResponse.json(checkInForms);

}