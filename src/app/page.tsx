

import { envs } from "@/api/config/envs";
import { Selector } from "./components/Selector/Selector";
import { Company } from "./types";


export default async function Home() {

  const res = await fetch(`${envs.API_URL}/companies?page=1&limit=100`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    })

  if (!res.ok) {
    console.error('Failed to load companies' + res);
    return <div>Failed to load companies</div>;
  }

  const paginatedCompanies = await res.json();

  const companies: Company[] = paginatedCompanies.data;



  return (
    <>

      <Selector<Company> items={companies} label="una empresa" basePath="" />


    </>

  );

}
