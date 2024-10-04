import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Trophy, Frown, Repeat, Facebook, Globe } from "lucide-react";
import { useGlobalContext } from "@/app/context/GlobalContext";
import { useEffect, useMemo } from "react";
import { useAudio } from "../hooks/useAudio";

interface GameOverMessageProps {
      message: string;
      onRestart: () => void;
      isWinner: boolean;
      correctCount: number;
      totalQuestions: number;
}

export function GameOverMessage({ message, onRestart, isWinner, correctCount }: GameOverMessageProps) {

      const { companyName, companyBg } = useGlobalContext()

      const { playWinSound, playDefeatSound, stopDefeatSound, stopWinSound, playBackgroundMusic, stopBackgroundMusic } = useAudio()

      const background = useMemo(() => companyBg || localStorage.getItem('companyBg')!, [companyBg])

      const [firstBg, secondBg,] = background.split("-")

      useEffect(() => {

            playBackgroundMusic();

            if (isWinner) {
                  playWinSound();
            } else {
                  playDefeatSound();
            }

            // Limpiar efectos cuando el componente se desmonta o cambie el estado
            return () => {
                  console.log('Cleaning up sounds');

                  // Retrasamos la limpieza para permitir la reproducción completa del sonido
                  setTimeout(() => {
                        stopBackgroundMusic();
                        stopDefeatSound();
                        stopWinSound();
                  }, 2000); // Retrasamos la limpieza por 2 segundos (o ajusta este valor según el tiempo del audio)
            };
      }, [isWinner, playWinSound, playDefeatSound, stopWinSound, stopDefeatSound, playBackgroundMusic, stopBackgroundMusic]);





      const cName = useMemo(() => {

            if (!companyName) {

                  return localStorage.getItem('companyName')!;

            }

            return companyName

      }, [companyName])

      let backgroundClass = "bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600"


      if (encodeURIComponent(cName).toLowerCase() == "unimedical") {

            backgroundClass = "bg-gradient-to-br from-[#000000] to-[#333333]"

      } else if (isWinner) {


            backgroundClass = "bg-gradient-to-br from-purple-400 to-orange-600"

      }

      const iconVariants = {
            hidden: { scale: 0, rotate: -180 },
            visible: { scale: 1, rotate: 0, transition: { type: "spring", stiffness: 260, damping: 20 } },
      };

      const containerVariants = {
            hidden: { opacity: 0, scale: 0.8 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.2 } },
      };

      const socialIcons = [
            { name: 'facebook', icon: Facebook, prefix: '@' },
            { name: 'web', icon: Globe, prefix: '' },
      ];

      return (
            <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={containerVariants}
                  className="fixed inset-0 flex items-center justify-center bg-opacity-70 z-50 px-4 sm:px-0"
                  style={{
                        background: `linear-gradient(to top left, ${firstBg}, ${secondBg})`,

                  }}
            >
                  <div className={`${backgroundClass} p-8 rounded-3xl text-center shadow-2xl max-w-md w-full mx-auto`}
                        style={{
                              // Add shadow to the background to make the text more readable
                              boxShadow: "0 0 20px 10px rgba(0, 0, 0, 0.5)",
                        }}
                  >
                        <motion.div
                              className="mb-6"
                              initial="hidden"
                              animate="visible"
                              variants={iconVariants}
                        >
                              {isWinner ? (
                                    <Trophy className="w-20 h-20 mx-auto text-yellow-100" />
                              ) : (
                                    <Frown className="w-20 h-20 mx-auto text-indigo-100" />
                              )}
                        </motion.div>
                        <h2 className="text-5xl font-bold mb-4 text-white">{isWinner ? "¡Felicidades!" : "¡Casi lo logras!"}</h2>
                        <p className="text-2xl text-white mb-8">{message}</p>


                        {encodeURIComponent(cName).toLowerCase() == "unimedical" && <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-6"><p className="text-2xl text-white">Has respondido <span className="font-bold text-3xl"> {correctCount} </span> de 5 preguntas</p>   </div>}






                        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
                              <Button
                                    onClick={onRestart}
                                    className="bg-white text-black font-bold text-lg hover:bg-gray-800 hover:text-white transition-colors duration-300"
                              >
                                    <Repeat className="text-2xl mr-2 h-6 w-6" />
                                    Volver a jugar
                              </Button>
                        </div>
                        <div className="flex flex-col items-center space-y-2">
                              {encodeURIComponent(cName).toLowerCase() === 'unimedical' && socialIcons.map((social) => {
                                    const username = 'laboratoriounimedical';
                                    if (username) {
                                          const IconComponent = social.icon;
                                          return (
                                                <div
                                                      key={social.name}
                                                      className="flex items-center text-white"
                                                >
                                                      <IconComponent className=" w-8 h-8 mr-2" />
                                                      <span className="text-xl font-bold" >{social.prefix}{username}</span>
                                                </div>
                                          );
                                    }
                                    return null;
                              })}
                        </div>
                  </div>
            </motion.div >
      );
}