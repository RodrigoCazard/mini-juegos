'use client'

import { useGlobalContext } from "@/app/context/GlobalContext"
import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { FaTrophy, FaEnvelope, FaUser, FaPhone } from 'react-icons/fa'
import { Globe } from 'lucide-react';
import { useRouter } from "next/navigation"

export const PrizeClaimForm = ({
      prizeId,
      prizeName,
      isValidPrize // Nueva prop
}: {
      prizeId: number,
      prizeName: string,
      isValidPrize: boolean // Tipado de la nueva prop
}) => {
      const router = useRouter()
      const { companyId } = useGlobalContext()

      const [name, setName] = useState('')
      const [email, setEmail] = useState('')
      const [phone, setPhone] = useState('')
      const [loading, setLoading] = useState(false)
      const [message, setMessage] = useState<string | null>(null)
      const [showButton, setShowButton] = useState(true)

      const cId = useMemo(() => {
            if (!companyId) {
                  return localStorage.getItem('companyId')!;
            }
            return companyId
      }, [companyId])

      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            setLoading(true)
            setShowButton(false)

            const formData = {
                  name,
                  email,
                  phone,
                  companyId,
                  prizeId
            }

            try {
                  const res = await fetch(`https://mini-juegos-test-deploy.vercel.app/api/formDataPrize?companyId=${cId}`, {
                        method: 'POST',
                        headers: {
                              'Content-Type': 'application/json',
                        },
                        cache: 'no-store',
                        body: JSON.stringify(formData)
                  })

                  if (!res.ok) {
                        throw new Error('Failed to send prize form data')
                  }

                  const prizeFormData = await res.json()
                  console.log('Prize form data sent successfully:', prizeFormData)
                  setMessage("¡Premio reclamado con éxito! Volviendo a la página de selección de juegos...")

            } catch (error) {
                  console.error('Error enviando datos del formulario:', error)
                  setMessage('Hubo un error al reclamar tu premio. Volviendo a la página de selección de juegos...')
            } finally {
                  setLoading(false)
                  setTimeout(() => {
                        router.back()
                  }, 3000)
            }
      }

      return (
            <div className="fixed inset-0 bg-black flex flex-col items-center justify-center p-8">
                  {!isValidPrize ? (
                        <motion.form
                              onSubmit={handleSubmit}
                              className="bg-yellow-400 p-8 rounded-2xl shadow-2xl max-w-md w-full"
                              initial={{ scale: 0.9, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        >
                              <motion.h2
                                    className="text-4xl font-bold text-black mb-6 flex items-center justify-center"
                                    initial={{ y: -20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                              >
                                    <FaTrophy className="text-white mr-4" />
                                    ¡Felicidades!
                              </motion.h2>
                              <motion.p
                                    className="text-2xl text-center text-black mb-8"
                                    initial={{ y: -20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                              >
                                    Seguinos en redes y obtené tu <span className="font-bold text-3xl">{prizeName}</span>
                              </motion.p>

                              <motion.div
                                    className="mt-8 mb-8 space-y-2 flex flex-col items-center text-center w-full justify-center"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.7 }}
                              >
                                    <Globe className="w-10 h-10 font-bold text-white" />
                                    <p className="text-xl font-bold my-auto ml-2 mt-0">
                                          @laboratoriounimedical.com
                                    </p>
                              </motion.div>

                              {message && (
                                    <motion.p
                                          className="text-black rounded-lg border p-1 font-bold text-center mb-4"
                                          initial={{ opacity: 0 }}
                                          animate={{ opacity: 1 }}
                                    >
                                          {message}
                                    </motion.p>
                              )}

                              <motion.div
                                    className="mb-6"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                              >
                                    <label htmlFor="name" className="block text-black text-lg font-bold mb-2 flex items-center">
                                          <FaUser className="mr-2" /> Nombre:
                                    </label>
                                    <input
                                          type="text"
                                          id="name"
                                          value={name}
                                          onChange={(e) => setName(e.target.value)}
                                          className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg"
                                          required
                                    />
                              </motion.div>

                              <motion.div
                                    className="mb-8"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                              >
                                    <label htmlFor="phone" className="block text-black text-lg font-bold mb-2 flex items-center">
                                          <FaPhone className="mr-2" /> Teléfono:
                                    </label>
                                    <input
                                          type="phone"
                                          id="phone"
                                          value={phone}
                                          onChange={(e) => setPhone(e.target.value)}
                                          className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg"
                                          required
                                    />
                              </motion.div>

                              <motion.div
                                    className="mb-8"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                              >
                                    <label htmlFor="email" className="block text-black text-lg font-bold mb-2 flex items-center">
                                          <FaEnvelope className="mr-2" /> Email:
                                    </label>
                                    <input
                                          type="email"
                                          id="email"
                                          value={email}
                                          onChange={(e) => setEmail(e.target.value)}
                                          className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg"
                                          required
                                    />
                              </motion.div>

                              {showButton && (
                                    <motion.button
                                          type="submit"
                                          className="w-full bg-black text-yellow-400 font-bold py-4 px-6 rounded-full text-xl focus:outline-none focus:shadow-outline transition-all duration-300 hover:bg-gray-800"
                                          disabled={loading}
                                          whileHover={{ scale: 1.05 }}
                                          whileTap={{ scale: 0.95 }}
                                          initial={{ y: 20, opacity: 0 }}
                                          animate={{ y: 0, opacity: 1 }}
                                          transition={{ delay: 0.6 }}
                                    >
                                          {'Reclamar Premio'}
                                    </motion.button>
                              )}
                              {loading && <p className="text-black text-center mt-4">Reclamando tu premio...</p>}
                        </motion.form>
                  ) : (
                        <motion.div
                              className="bg-yellow-400 p-8 rounded-2xl shadow-2xl max-w-md w-full flex flex-col items-center"
                              initial={{ scale: 0.9, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        >
                              <h2 className="text-4xl font-bold text-black mb-6 flex items-center justify-center">
                                    <FaTrophy className="text-white mr-4" />
                                    ¡Lo sentimos!
                              </h2>
                              <p className="text-2xl text-center text-black mb-8">
                                    No pudiste reclamar un premio. ¡Gracias por participar!
                              </p>
                              <motion.div
                                    className="mt-4 mb-8 space-y-2 flex flex-col items-center text-center w-full justify-center"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.7 }}
                              >
                                    <Globe className="w-10 h-10 font-bold text-white" />
                                    <p className="text-xl font-bold my-auto ml-2 mt-0">
                                          @laboratoriounimedical.com
                                    </p>
                              </motion.div>
                              <button
                                    onClick={() => router.refresh()}
                                    className="bg-black text-yellow-400 font-bold py-4 px-6 rounded-full text-xl transition-all duration-300 hover:bg-gray-800"
                              >
                                    Volver
                              </button>
                        </motion.div>
                  )}
            </div>
      )
}
