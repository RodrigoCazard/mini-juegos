'use client'

import { AnimatePresence, motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import { useGlobalContext } from "@/app/context/GlobalContext"
import { FaHandPointer, FaQuestion, FaDice, FaBrain } from 'react-icons/fa'
import { Game, GameCategory } from "@/app/types"
import { SocialMedia } from "@prisma/client"

interface SelectableItem {
      id: number
      name: string
      logo?: string
      backgroundColor?: string
      category?: GameCategory
      rouletteColors?: string,
      screenSavers?: {
            path: string
      }[],
      games?: Game[]
      socialMedias?: SocialMedia[]
}

interface SelectorProps<T extends SelectableItem> {
      items: T[]
      label: string
      basePath: string
}

export const Selector = <T extends SelectableItem>({
      items,
      label,
      basePath,
}: SelectorProps<T>) => {

      const router = useRouter();

      const { setCompanyId, setCompanyName, setGameId, setGameName, setGameCategory, setCompanyLogo, setCompanyBg, companyBg, companyLogo, setCompanyImgsScreenSavers, setCompanyVidsScreenSavers } = useGlobalContext()

      const [firstBg, secondBg] = companyBg.split("-")
      const [cName, companyId] = basePath.split('-')

      const [, setShowSlideshow] = useState(false)
      const [lastInteraction, setLastInteraction] = useState(Date.now())

      const handleClick = (item: T) => {
            router.push(`${basePath}/${item.name}-${item.id}`)

            if (!('logo' in item)) {
                  localStorage.setItem('gameId', item.id.toString())
                  localStorage.setItem('gameName', item.name)
                  localStorage.setItem('gameCategory', item.category || 'QA')
                  setGameId(item.id)
                  setGameName(item.name)
                  setGameCategory(item.category || 'QA')
            }

            if ('logo' in item) {
                  const screenSavers = item.screenSavers?.map(ss => ss.path) || [];
                  const imgsScreenSavers = screenSavers.filter(ss =>
                        ss.endsWith('.jpg') || ss.endsWith('.jpeg') || ss.endsWith('.png') || ss.endsWith('.webp')
                  );
                  const vidsScreenSavers = screenSavers.filter(ss =>
                        ss.endsWith('.mp4') || ss.endsWith('.webm')
                  );

                  localStorage.setItem('companyImgsScreenSavers', JSON.stringify(imgsScreenSavers))
                  localStorage.setItem('companyVidsScreenSavers', JSON.stringify(vidsScreenSavers))
                  localStorage.setItem('companyId', item.id.toString() || '')
                  localStorage.setItem('companyBg', item.backgroundColor || '')
                  localStorage.setItem('companyName', item.name)
                  localStorage.setItem('companyLogo', item.logo || '')
                  setCompanyBg(item.backgroundColor || '')
                  setCompanyLogo(item.logo || '')
                  setCompanyName(item.name)
                  setCompanyImgsScreenSavers(imgsScreenSavers)
                  setCompanyVidsScreenSavers(vidsScreenSavers)
            }
      }

      useEffect(() => {
            if (!companyId) return
            setCompanyId(+companyId)
            if (localStorage.getItem('gameId')) {
                  setGameId(+localStorage.getItem('gameId')!)
                  setGameName(localStorage.getItem('gameName')!)
                  setGameCategory(localStorage.getItem('gameCategory')!)
            }

            if (localStorage.getItem('companyLogo')) {
                  setCompanyBg(localStorage.getItem('companyBg')!)
                  setCompanyLogo(localStorage.getItem('companyLogo')!)
                  setCompanyName(localStorage.getItem('companyName')!)
                  setCompanyId(+localStorage.getItem('companyId')!)
                  setCompanyImgsScreenSavers(JSON.parse(localStorage.getItem('companyImgsScreenSavers')!))
                  setCompanyVidsScreenSavers(JSON.parse(localStorage.getItem('companyVidsScreenSavers')!))
            }
      }, [companyId, setCompanyId, setGameId, setGameName, setCompanyBg, setCompanyLogo, setCompanyName, setGameCategory, setCompanyImgsScreenSavers, setCompanyVidsScreenSavers])

      const handleInteraction = useCallback(() => {
            setLastInteraction(Date.now())
            setShowSlideshow(false)
      }, [])

      useEffect(() => {
            const checkInactivity = () => {
                  if (Date.now() - lastInteraction > 10000) {
                        setShowSlideshow(true)
                  }
            }

            const interval = setInterval(checkInactivity, 1000)
            return () => clearInterval(interval)
      }, [lastInteraction])

      useEffect(() => {
            const events = ['touchstart', 'mousedown', 'mousemove', 'click', 'keydown']
            events.forEach(event => window.addEventListener(event, handleInteraction))
            return () => events.forEach(event => window.removeEventListener(event, handleInteraction))
      }, [handleInteraction])

      const defaultBgColor = '#A65E2E'
      const defaultSecondBgColor = '#1F8A4D'

      const firstBgColor = companyId ? firstBg : defaultBgColor
      const secondBgColor = companyId ? secondBg : defaultSecondBgColor

      const getIcon = (category?: GameCategory) => {
            switch (category) {
                  case GameCategory.QA:
                        return <FaBrain className="text-6xl mb-4 text-yellow-400" />
                  case GameCategory.ROULETTE:
                        return <FaDice className="text-6xl mb-4 text-yellow-400" />
                  case GameCategory.MEMORY:
                        return <FaBrain className="text-6xl mb-4 text-yellow-400" />
                  default:
                        return <FaQuestion className="text-6xl mb-4 text-yellow-400" />
            }
      }

      return (
            <AnimatePresence>

                  <motion.div
                        className="fixed inset-0 flex flex-col items-center justify-center overflow-y-auto" // Aquí añadí overflow-y: auto
                        style={{
                              background: `linear-gradient(240deg, ${secondBgColor} ,  ${firstBgColor})`
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                  >
                        {cName && (
                              <motion.div
                                    className="mb-8 text-center mx-4"
                                    initial={{ y: -50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                              >
                                    <Image
                                          src={`${companyLogo}`}
                                          alt={`${decodeURIComponent(cName)} logo`}
                                          width={500}
                                          height={500}
                                          className="mx-auto drop-shadow-2xl"
                                    />
                              </motion.div>
                        )}

                        <motion.h2
                              className="text-4xl md:text-6xl font-extrabold text-white mb-12 mx-2 text-center drop-shadow-2xl"
                              initial={{ y: -50, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.4 }}
                        >
                              {`Selecciona ${label}`}
                        </motion.h2>

                        <motion.div
                              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 px-4 mx w-full max-w-6xl"
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                        >
                              {items.map((item) =>
                                    item.games?.length === 0 ? null : (
                                          <motion.button
                                                key={item.id}
                                                onClick={() => handleClick(item)}
                                                className="bg-black bg-opacity-70 backdrop-blur-md p-2 md:p-8 rounded-2xl shadow-lg transition ease-in-out transform hover:shadow-xl flex flex-col items-center justify-center"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                initial={{ opacity: 0, y: 50 }}
                                                animate={{ opacity: 1, y: 0 }}
                                          >
                                                {'logo' in item ? (
                                                      <>
                                                            <Image
                                                                  src={item.logo!}
                                                                  alt={item.name}
                                                                  width={200}
                                                                  height={200}
                                                                  className="object-cover"
                                                            />
                                                      </>
                                                ) : (
                                                      <>
                                                            {getIcon(item.category)}
                                                            <h3 className="text-2xl font-bold text-white">
                                                                  {item.name}
                                                            </h3>
                                                      </>
                                                )}
                                          </motion.button>
                                    )
                              )}
                        </motion.div>

                        <motion.footer
                              className="w-full text-white text-xl flex items-center justify-center fixed bottom-8"
                              initial={{ y: 50, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.8 }}
                        >
                              <FaHandPointer className="text-yellow-400 text-3xl mr-4" />
                              <p>{`Selecciona  ${label}`}</p>
                        </motion.footer>
                  </motion.div>
            </AnimatePresence>
      )
}
