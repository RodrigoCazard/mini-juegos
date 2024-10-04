'use client'

import React, { useState, useEffect, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from 'next/image'
import { QuestionWithOptions } from "@/app/types"
import { useGlobalContext } from "@/app/context/GlobalContext"
import { Timer } from "./Timer/Timer"
import { ProgressBar } from "./ProgressBar/ProgressBar"
import { useAudio } from "@/app/hooks/useAudio"
import { RefreshCw } from 'lucide-react'


type QuestionsProps = {
    question: QuestionWithOptions
    onOptionClick: (isCorrect: boolean) => void
    isCorrect: boolean
    answered: boolean
    handleTimeout?: () => void
    handleLowTime?: (time: number) => void
    handleRestart: () => void
    consecutiveCorrectCount: number
    incorrectCount: number
    isTimerEnabled?: boolean
}

export default function Questions({
    question,
    onOptionClick,
    answered,
    isCorrect,
    handleTimeout,
    handleLowTime,
    handleRestart,
    consecutiveCorrectCount,
    incorrectCount,
    isTimerEnabled = true
}: QuestionsProps) {
    const [timeLeft, setTimeLeft] = useState(20)
    const { companyBg, companyLogo, gameCategory } = useGlobalContext()
    const background = useMemo(() => companyBg || localStorage.getItem('companyBg')!, [companyBg])
    const [, secondBg] = background.split("-")
    const logo = useMemo(() => companyLogo || localStorage.getItem('companyLogo')!, [companyLogo])
    const { stopLowTimeSound, stopAllSounds } = useAudio()

    // Nuevo estado para almacenar las opciones mezcladas
    const [shuffledOptions, setShuffledOptions] = useState(question.options)

    // Función para mezclar el array (Fisher-Yates) con tipado genérico
    const shuffleArray = <T,>(array: T[]): T[] => {
        const newArray = [...array]; // Hacemos una copia para no mutar el array original
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };

    // Efecto para mezclar las opciones solo cuando la pregunta cambia
    useEffect(() => {
        setShuffledOptions(shuffleArray(question.options))
    }, [question])

    useEffect(() => {
        if (isTimerEnabled && !answered && timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000)
            return () => clearTimeout(timer)
        } else if (isTimerEnabled && timeLeft === 0 && !answered && handleTimeout) {
            handleTimeout()
        }
    }, [timeLeft, answered, handleTimeout, isTimerEnabled])

    useEffect(() => {
        stopAllSounds()
        if (isTimerEnabled) {
            setTimeLeft(20)
        }
    }, [question, stopAllSounds, isTimerEnabled])

    const handleOptionClick = useCallback((isCorrect: boolean) => {
        if (isTimerEnabled) {
            stopLowTimeSound()
        }
        onOptionClick(isCorrect)
    }, [onOptionClick, stopLowTimeSound, isTimerEnabled])

    const handleLowTimeWrapper = useCallback((time: number) => {
        if (handleLowTime) {
            handleLowTime(time)
        }
    }, [handleLowTime])

    const handleTimeoutWrapper = useCallback(() => {
        if (isTimerEnabled && handleTimeout) {
            stopLowTimeSound()
            // handleTimeout()
        }
    }, [handleTimeout, stopLowTimeSound, isTimerEnabled])

    return (
        <div className="relative h-full w-full flex flex-col items-center justify-between p-2 sm:p-4 md:p-6 overflow-hidden">
            {/* Background logo for small and medium screens */}
            <div className="absolute inset-0 z-0 flex lg:hidden block items-center justify-center pointer-events-none">
                <div className="w-screen h-screen relative opacity-80 mx-2">
                    <Image
                        src={logo}
                        alt={'Logo de la empresa'}
                        layout="fill"
                        objectFit="contain"
                        priority
                    />
                </div>
            </div>

            <div className="z-10 w-full max-w-6xl mx-auto flex flex-col items-center justify-between h-full">
                {/* Top logo for larger screens */}
                <div className="w-40 sm:w-48 md:w-56 hidden lg:block lg:w-64 xl:w-72 h-auto relative mx-auto mb-2 sm:mb-4">
                    <Image
                        src={logo}
                        alt={'Logo de la empresa'}
                        layout="responsive"
                        width={400}
                        height={100}
                        objectFit="contain"
                        priority
                    />
                </div>

                <main className="flex-grow flex flex-col items-center justify-center w-full px-2 sm:px-4 md:px-6 py-2 sm:py-4">
                    <AnimatePresence mode="wait">
                        <motion.h2
                            key={question.id}
                            className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-10 sm:mb-4 md:mb-6 text-center"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.5 }}
                            style={{ textShadow: "0 0 10px rgba(0, 0, 0, 0.5)" }}
                        >
                            {question.questionText}
                        </motion.h2>
                    </AnimatePresence>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4 w-full max-w-4xl">
                        <AnimatePresence>
                            {shuffledOptions.map((option) => {
                                const isOptionCorrect = option.isCorrect;
                                const buttonClass = answered
                                    ? isOptionCorrect
                                        ? "bg-green-400 text-white"
                                        : "bg-red-400 text-white"
                                    : `bg-white text-${secondBg} hover:bg-purple-200`;

                                return (
                                    <motion.button
                                        key={option.id}
                                        onClick={() => handleOptionClick(option.isCorrect)}
                                        className={`p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl shadow-lg font-semibold text-xl lg:text-2xl ${buttonClass} relative overflow-hidden  ease-in-out`}
                                        disabled={answered}
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        {option.optionText}
                                    </motion.button>
                                );
                            })}
                        </AnimatePresence>

                    </div>
                    <footer className="z-10 mt-2 w-full text-white text-xs sm:text-sm md:text-base lg:text-lg text-center mt-2 sm:mt-4">
                        <AnimatePresence mode="wait">
                            {answered ? (
                                <motion.div
                                    key="answer"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5 }}
                                    className="font-bold"
                                >
                                    {isCorrect ? "¡Respuesta correcta!" : "Respuesta incorrecta. ¡Inténtalo de nuevo!"}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="instruction"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5 }}
                                    className="w-full flex flex-col items-center"
                                >
                                    <h3 className="text-xs sm:text-sm md:text-base font-semibold" style={{
                                        textShadow: "0 0 10px rgba(0, 0, 0, 0.5)"
                                    }}>Tocá la opción que creas correcta</h3>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {isTimerEnabled && (
                            <div className="mt-2 sm:mt-3 md:mt-4">
                                <Timer
                                    duration={20}
                                    onTimeout={handleTimeoutWrapper}
                                    onLowTime={handleLowTimeWrapper}
                                    key={question.id}
                                />
                            </div>
                        )}
                    </footer>
                </main>

                <div className="mt-2 sm:mt-3 md:mt-4 w-full">
                    <ProgressBar category={gameCategory} correctAnswers={consecutiveCorrectCount} incorrectAnswers={incorrectCount} />
                </div>
            </div>

            {/* Restart Game button (escape key) */}
            <motion.button
                className="fixed top-2 left-2 sm:top-4 sm:left-4 p-1 sm:p-2 rounded-full bg-gray-800 bg-opacity-50 text-white hover:bg-opacity-75 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                onClick={handleRestart}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Reiniciar Juego"
            >
                <RefreshCw size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </motion.button>
        </div>
    )
}