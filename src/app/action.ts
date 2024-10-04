// app/actions.ts
'use server'

import { cookies } from 'next/headers'

export default async function deleteCookies() {
      const cookieStore = cookies()

      // Eliminar las cookies que necesites
      cookieStore.delete('companyId') // Reemplaza 'cookieName' con el nombre de tu cookie
      cookieStore.delete('companyName') // Si tienes más cookies por borrar

      console.log('Cookies eliminadas')
}