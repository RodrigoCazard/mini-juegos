import { ServiceFactory } from "@/api/utils";
import { NextRequest, NextResponse } from "next/server";


const companiesService = ServiceFactory.getCompaniesService();

// Find a company by id. The id came from path parameter
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {

      const companyId = Number(params.id);

      console.log('Received companyId:', companyId);

      const company = await companiesService.findById(companyId);

      return NextResponse.json(company);

}
// NOTE: To use the PATCH method, uncomment the code below, the code in the services file and the code in the dao file
/* export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {

      const companyId = Number(params.id);

      const { body } = await req.json();

      const updatedCompany = await companiesService.update(companyId, body);

      return NextResponse.json(updatedCompany);

} */