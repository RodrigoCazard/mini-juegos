"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CurtainAnimation } from "./CurtainAnimation";

type CountdownProps = {

  onComplete: () => void;

}

export const Countdown = (
  { onComplete }: CountdownProps
) => {
  const [count, setCount] = useState(3);
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount === 1) {
          clearInterval(timer)

          setIsOpen(true)
          setTimeout(onComplete, 1000)

        }
        return prevCount - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-transparent z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <CurtainAnimation isOpen={isOpen}></CurtainAnimation>
      {count !== 0 && <motion.div
        className="text-[240px] font-bold text-white z-40"
        initial={{ scale: 0.5, opacity: 0, rotate: -180 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        exit={{ scale: 1.5, opacity: 0, rotate: 180 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        key={count}
        style={{
          textShadow: `0 2px 4px rgba(0, 0, 0, 0.2)`
        }}
      >
        {count}
      </motion.div>}
    </motion.div>
  );
};
