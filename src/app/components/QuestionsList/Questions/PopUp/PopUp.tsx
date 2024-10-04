import { motion } from "framer-motion"

interface PopUpProps {
    message: string;
    isCorrect: boolean;
}

export const PopUp = (
    { message, isCorrect }: PopUpProps
) => (
    <motion.div
        className="absolute inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 px-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
    >
        <motion.div
            className={`p-6 lg:p-8 rounded-2xl shadow-2xl text-xl md:text-3xl font-bold ${isCorrect ? 'bg-green-400 text-white' : 'bg-red-400 text-white'
                }`}
            initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.5, opacity: 0, rotate: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            {message}
        </motion.div>
    </motion.div>
)