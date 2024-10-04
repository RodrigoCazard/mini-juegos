'use client'

import { useGlobalContext } from "@/app/context/GlobalContext"
import { motion } from "framer-motion"
import { useMemo } from "react"

export const CurtainAnimation = ({ isOpen }: { isOpen: boolean }) => {

      const { companyBg } = useGlobalContext()

      const bg = useMemo(() => {

            if (!companyBg) {
                  return localStorage.getItem('companyBg')!
            }

            console.log(companyBg)

            return companyBg
      }, [companyBg])

      const [firstBg, secondBg, thirdBg, fourthBg] = bg.split('-')

      return (
            <>
                  <motion.div
                        className={`fixed inset-y-0 left-0 w-1/2 z-10`}
                        style={{
                              background: `linear-gradient(135deg, ${secondBg}, ${fourthBg})` // De esquina superior izquierda hacia el centro a la derecha
                        }}
                        initial={{ x: 0 }}
                        animate={{ x: isOpen ? "-100%" : 0 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                  />
                  <motion.div
                        className={`fixed inset-y-0 right-0 w-1/2 z-10`}
                        style={{
                              background: `linear-gradient(225deg, ${firstBg}, ${thirdBg})` // De esquina superior derecha hacia el centro a la izquierda
                        }}
                        initial={{ x: 0 }}
                        animate={{ x: isOpen ? "100%" : 0 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                  />
            </>
      )
}