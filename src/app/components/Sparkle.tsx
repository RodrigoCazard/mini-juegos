import { motion } from "framer-motion"

type SparkleProps = {

      style: React.CSSProperties;

}

export const Sparkle = (
      { style }: SparkleProps
) => (
      <motion.div
            className="absolute rounded-full bg-yellow-300"
            style={style}
            initial={{ scale: 0, opacity: 1 }}
            animate={{
                  scale: [0, 1, 0],
                  opacity: [1, 1, 0],
            }}
            transition={{ duration: 0.5 }}
      />
)