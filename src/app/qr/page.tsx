'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// TODO: Separar el estado, el useEffect y el motion.div a un componente QRCode. Además, en esta página se debe consultar el companyId o el companyFormId para generar el QR.
export default function QRLanding() {
      const [mounted, setMounted] = useState(false)

      useEffect(() => {
            setMounted(true)
      }, [])

      return (
            <div className="min-h-screen w-full  flex flex-wrap justify-center p-4 items-center relative overflow-hidden" style={{
                  background: `linear-gradient(135deg, #1d301a, #638f69)`
            }}>
                  <div className='lg:mr-[5vw] mr-0 w-[400px] md:w-[550px] h-auto'>
                        <img src="https://i.postimg.cc/6QfJFQL2/Logos-Bionatural-logo-branco.png" alt="Logo Bionatural Super Premium Natural" className="object-contain" />
                  </div>
                  <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="bg-white bg-opacity-90 backdrop-blur-md rounded-2xl shadow-2xl p-8 max-w-md w-full relative z-10"
                  >

                        <h1 className={`text-4xl font-bold text-center mb-6`} style={{
                              color: '#638f69'
                        }}>¡Bienvenido!</h1>
                        <p className="text-center text-gray-700 mb-8 text-lg">
                              Escanea el código QR para registrar tu visita
                        </p>
                        <motion.div
                              className="flex justify-center mb-8"
                              initial={{ scale: 0.8 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.3, duration: 0.5 }}
                        >
                              {mounted && (
                                    <img src="https://i.postimg.cc/Fz1D1V34/qr-code.png" alt="" />
                              )}
                        </motion.div>
                  </motion.div>
            </div >
      )
}