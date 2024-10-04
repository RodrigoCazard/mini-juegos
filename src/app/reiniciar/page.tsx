// app/reiniciar/page.tsx
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import deleteCookies from '../action'

export default function ReiniciarPage() {
      const router = useRouter()

      useEffect(() => {
            const reiniciar = async () => {
                  // Llamar a la acción del servidor para eliminar cookies
                  await deleteCookies()

                  // Redirigir al usuario a la página de inicio después de eliminar las cookies
                  router.push('/')
            }

            reiniciar()
      }, [router])

      return (
            <div className="flex items-center justify-center h-screen bg-gray-400">
                  <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <p className="text-xl font-semibold text-gray-700 animate-pulse">Reiniciando aplicación...</p>
                  </div>
            </div>
      )

}
