'use client'

import { motion } from "framer-motion"
import { FaTrophy, FaTimesCircle, FaLightbulb } from 'react-icons/fa'

type ScoreboardProps = {
    correctCount: number
    incorrectCount: number
    questionNumber: number
}

export const Scoreboard = ({ correctCount, incorrectCount, questionNumber }: ScoreboardProps) => {
    const totalQuestions = correctCount + incorrectCount
    const correctPercentage = totalQuestions > 0 ? (correctCount / totalQuestions) * 100 : 0

    return (
        <motion.div
            className="bg-white bg-opacity-10 backdrop-blur-md px-4 py-3 rounded-2xl shadow-lg text-white"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
            <div className="flex items-center mb-2">
                <FaLightbulb className="text-yellow-400 text-xl mr-2" />
                <span className="text-3xl font-semibold ">Pregunta {questionNumber}</span>
            </div>

            <div className="flex justify-between items-center mb-1">
                <div className="flex items-center">
                    <FaTrophy className="text-yellow-400 text-1xl mr-2" />
                    <span className="text-1xl font-semibold">Correctas</span>
                </div>
                <span className="text-2xl font-bold text-green-400">{correctCount}</span>
            </div>
            <div className="flex justify-between items-center mb-1">
                <div className="flex items-center">
                    <FaTimesCircle className="text-red-400 text-1xl mr-2" />
                    <span className="text-1xl font-semibold">Incorrectas </span>
                </div>
                <span className="text-2xl font-bold text-red-400">{incorrectCount}</span>
            </div>
            <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                    <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-white bg-green-500">
                            Precisión
                        </span>
                    </div>
                    <div className="text-right">
                        <span className="text-xs font-semibold inline-block text-white">
                            {correctPercentage.toFixed(0)}%
                        </span>
                    </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-300">
                    <motion.div
                        style={{ width: `${correctPercentage}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${correctPercentage}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
            </div>
        </motion.div>
    )
}