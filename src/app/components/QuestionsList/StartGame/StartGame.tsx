'use client'

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useGlobalContext } from "@/app/context/GlobalContext"
import { FaBrain, FaPlay, FaTrophy, FaInfoCircle, FaArrowLeft } from 'react-icons/fa'
import ParticleBackground from "./Particles/ParticleBackground"
import { useRouter } from 'next/navigation'

interface StartGameProps {
      handleStartGame: () => void
}

export default function StartGame({ handleStartGame }: StartGameProps) {
      const [showInfo, setShowInfo] = useState(false)
      const router = useRouter()


      const { gameName, companyName, companyId, companyBg } = useGlobalContext()

      const gName = useMemo(() => gameName || localStorage.getItem('gameName'), [gameName])
      const cName = useMemo(() => companyName || localStorage.getItem('companyName'), [companyName])
      const cId = useMemo(() => companyId || localStorage.getItem('companyId'), [companyId])
      const background = useMemo(() => companyBg || localStorage.getItem('companyBg')!, [companyBg])

      const [firstBg, secondBg,] = background.split("-")

      const handleBackToSelector = () => {
            router.push(`/${cName}-${cId}`)
      }

      return (
            <div className="fixed inset-0 flex items-center justify-center overflow-hidden"
                  style={{
                        background: `linear-gradient(to top left, ${firstBg}, ${secondBg})`,
                  }}
            >
                  <ParticleBackground />
                  <motion.div
                        className="w-full h-full p-4 sm:p-8 bg-transparent shadow-2xl text-center flex flex-col items-center justify-between relative z-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                  >
                        <motion.button
                              className="absolute top-4 left-4 sm:top-10 sm:left-10 text-white text-3xl z-20"
                              onClick={handleBackToSelector}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              aria-label="Volver al selector de juegos"
                        >
                              <FaArrowLeft
                                    style={{
                                          filter: `drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))`,
                                    }}
                              />
                        </motion.button>
                        <motion.button
                              className="absolute top-4 right-4 sm:top-10 sm:right-10 text-white text-3xl z-20"
                              onClick={() => setShowInfo(!showInfo)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              aria-label="Mostrar información"
                              style={{
                                    textShadow: `0 2px 4px rgba(0, 0, 0, 0.2)`,
                              }}
                        >
                              <FaInfoCircle style={{
                                    filter: `drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))`,
                              }} />
                        </motion.button>
                        <main className="flex-grow flex flex-col items-center justify-center">
                              <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text mb-8"
                                    style={{
                                          color: `white`,
                                          // Agregar un sombreado para mejorar la legibilidad
                                          textShadow: `0 2px 4px rgba(0, 0, 0, 0.2)`
                                    }}
                              >
                                    {decodeURIComponent(gName || '')}
                              </h1>
                              <div className="flex justify-center space-x-6 sm:space-x-12 mb-8 sm:mb-12"
                                    style={{ textShadow: `0 2px 4px rgba(0, 0, 0, 0.2)` }}
                              >
                                    <FeatureIcon icon={<FaBrain />} text="Desafía tu mente" />
                                    <FeatureIcon icon={<FaTrophy />} text="Gana premios" />
                              </div>
                              <motion.button
                                    className="group relative px-8 sm:px-12 py-4 sm:py-6 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-2xl text-2xl sm:text-3xl font-bold hover:from-green-500 hover:to-blue-600 transition-all duration-300 shadow-lg"
                                    onClick={handleStartGame}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                              >
                                    <span className="relative z-10 flex items-center justify-center">
                                          Comenzar Juego
                                          <FaPlay className="ml-4" />
                                    </span>
                                    <span className="absolute inset-0 h-full w-full bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></span>
                              </motion.button>
                        </main>

                        <footer className="w-full text-white text-lg sm:text-xl mt-4 sm:mt-0" style={{
                              textShadow: `0 2px 4px rgba(0, 0, 0, 0.2)`
                        }}>
                              Tocá el botón para comenzar
                        </footer>

                        <AnimatePresence>
                              {showInfo && (
                                    <motion.div
                                          className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 sm:p-8 z-30"
                                          initial={{ opacity: 0 }}
                                          animate={{ opacity: 1 }}
                                          exit={{ opacity: 0 }}
                                    >
                                          <div className="bg-white p-6 sm:p-8 rounded-2xl max-w-2xl">
                                                <h2 className="text-2xl sm:text-3xl font-bold mb-4">Cómo jugar</h2>
                                                <p className="text-lg sm:text-xl mb-4">
                                                      Responde preguntas de trivia para ganar puntos y premios. ¡Demuestra tus conocimientos y diviértete!
                                                </p>
                                                <button
                                                      className="px-6 py-2 bg-purple-600 text-white rounded-full text-lg sm:text-xl font-semibold hover:bg-purple-700 transition-colors duration-300"
                                                      onClick={() => setShowInfo(false)}
                                                >
                                                      Cerrar
                                                </button>
                                          </div>
                                    </motion.div>
                              )}
                        </AnimatePresence>
                  </motion.div>
            </div >
      )
}

function FeatureIcon({ icon, text }: { icon: React.ReactNode; text: string }) {
      return (
            <div className="flex flex-col items-center">
                  <div className="text-4xl sm:text-5xl text-yellow-300 mb-2 sm:mb-3">{icon}</div>
                  <p className="text-white text-base sm:text-xl font-semibold">{text}</p>
            </div>
      )
}