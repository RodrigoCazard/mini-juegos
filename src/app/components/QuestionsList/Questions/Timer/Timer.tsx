'use client'

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FaClock } from 'react-icons/fa'

type TimerProps = {
    duration: number
    onTimeout: () => void
    onLowTime: (time: number) => void
    key: number
}

export const Timer = ({ duration, onTimeout, onLowTime, key }: TimerProps) => {
    const [timeLeft, setTimeLeft] = useState(duration)

    useEffect(() => {
        setTimeLeft(duration)
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timer)
                    onTimeout()
                    return 0
                }
                if (prevTime <= 5) {
                    onLowTime(prevTime - 1)
                }
                return prevTime - 1
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [duration, onTimeout, onLowTime, key])

    const percentage = (timeLeft / duration) * 100
    let color = '#10B981'
    if (percentage < 60) color = '#FBBF24'
    if (percentage < 30) color = '#EF4444'

    return (
        <div className="flex items-center space-x-2 absolute top-10 right-10" role="timer" aria-live="polite">
            <FaClock className="text-white text-4xl" aria-hidden="true" style={{
                filter: `drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))`
            }} />
            <div className="relative w-24 h-24 md:h-32 md:w-32">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#4B5563"
                        strokeWidth="10"
                    />
                    <motion.circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke={color}
                        strokeWidth="10"
                        strokeDasharray={283}
                        strokeDashoffset={283 - (283 * percentage) / 100}
                        strokeLinecap="round"
                        transform="rotate(-90 50 50)"
                        initial={false}
                        animate={{ strokeDashoffset: 283 - (283 * percentage) / 100 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.span
                        className="text-white text-3xl  md:text-5xl font-bold"
                        key={timeLeft}
                        initial={{ scale: 1.2, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            textShadow: `0 2px 4px rgba(0, 0, 0, 0.2)`
                        }}
                    >
                        {timeLeft}
                    </motion.span>
                </div>
            </div>
        </div>
    )
}