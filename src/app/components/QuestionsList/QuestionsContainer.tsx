// components/QuestionContainer.tsx
'use client';

import { useState, useCallback, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QuestionWithOptions, GameCategory, Prize } from "@/app/types";
import { useGlobalContext } from "@/app/context/GlobalContext";
import { useAudio } from "@/app/hooks/useAudio";
import { useQuestions } from "@/app/hooks/useQuestions";
import { PrizeClaimForm } from "./Questions/PrizeClaimForm";
import PrizeWheel from "./Questions/PrizeWheel";
import { GameOverMessage } from "../GameOverMessage";
import { PopUp } from "./Questions/PopUp/PopUp";
import { Countdown } from "./Questions/Countdown/Countdown";
import StartGame from "./StartGame/StartGame";
import { useRouter } from "next/navigation";
import Questions from "./Questions/Questions";

interface QuestionContainerProps {
      questions: QuestionWithOptions[];
      requiredCorrectAnswers: number;
      gameCategory: GameCategory;
      prizes?: Prize[];
}

export function QuestionContainer({
      questions,
      requiredCorrectAnswers,
      gameCategory,
      prizes = [],
}: QuestionContainerProps) {
      const { companyBg, companyName } = useGlobalContext();


      const router = useRouter();

      const firstBg = useMemo(() => {

            if (!companyBg) {
                  return localStorage.getItem("companyBg")!.split("-")[0];
            }
            return companyBg.split("-")[0];

      }, [companyBg]);

      const secondBg = useMemo(() => {
            if (!companyBg) {
                  return localStorage.getItem("companyBg")!.split("-")[1];
            }
            return companyBg.split("-")[1];
      }, [companyBg]);

      const cName = useMemo(() => {
            if (!companyName) {
                  return localStorage.getItem("companyName")!;
            }
            return companyName;
      }, [companyName]);

      const {
            shuffledQuestions,
            currentQuestionIndex,
            correctCount,
            incorrectCount,
            answered,
            handleNextQuestion,
            handleOptionClick,
            handleRestart,
            isGameOver,
      } = useQuestions(questions, requiredCorrectAnswers, gameCategory);

      const {
            playBackgroundMusic,
            playCorrectSound,
            playIncorrectSound,
            playLowTimeSound,
            stopLowTimeSound,
            stopAllSounds,
      } = useAudio();

      const [message, setMessage] = useState<string | null>(null);
      const [isCorrect, setIsCorrect] = useState<boolean>(false);
      const [showPopUp, setShowPopUp] = useState(false);
      const [startedGame, setStartedGame] = useState(false);
      const [isCountdownOver, setIsCountdownOver] = useState(false);
      const [showPrizeWheel, setShowPrizeWheel] = useState(false);
      const [selectedPrize, setSelectedPrize] = useState<Prize | null>(null);
      const [showPrizeForm, setShowPrizeForm] = useState(false);
      const [isValidPrize, setIsValidPrize] = useState(false);

      const handleLowTime = useCallback(() => {
            playLowTimeSound();
      }, [playLowTimeSound]);

      const handleTimeout = useCallback(() => {
            setShowPopUp(true);
            setMessage("¡Se acabó el tiempo! Pasando a la siguiente pregunta...");
            stopLowTimeSound();
            handleOptionClick(false);
            setTimeout(() => {
                  stopLowTimeSound();
                  if (!isGameOver()) {
                        handleNextQuestion();
                  }
                  setShowPopUp(false);
            }, 1500);
      }, [handleNextQuestion, stopLowTimeSound, handleOptionClick, isGameOver]);

      const handleOptionClickWrapper = useCallback((isCorrectOption: boolean) => {
            if (showPopUp || answered) return;

            handleOptionClick(isCorrectOption);
            setShowPopUp(true);

            if (isCorrectOption) {
                  setIsCorrect(true);
                  setMessage("¡Correcto! ¡Buen trabajo!");
                  stopLowTimeSound();
                  playCorrectSound();
            } else {
                  setIsCorrect(false);
                  setMessage("¡Ups! Eso no es correcto.");
                  stopLowTimeSound();
                  playIncorrectSound();
            }

            setTimeout(() => {
                  setShowPopUp(false);
                  if (isGameOver()) {
                        stopAllSounds();
                        if (gameCategory === GameCategory.ROULETTE) {
                              setShowPrizeWheel(true);
                        }
                  } else {
                        handleNextQuestion();
                  }
            }, 1500);
      }, [showPopUp, answered, handleOptionClick, playCorrectSound, playIncorrectSound, isGameOver, gameCategory, handleNextQuestion, stopAllSounds, stopLowTimeSound]);

      const handleRestartWrapper = useCallback(() => {
            setStartedGame(false);
            setIsCountdownOver(false);
            setShowPrizeWheel(false);
            setSelectedPrize(null);
            setShowPrizeForm(false);
            stopAllSounds();
            handleRestart();
            setTimeout(() => {
                  router.refresh();
            }, 800)
      }, [handleRestart, stopAllSounds, router]);

      const handleSelectPrize = useCallback((prize: Prize) => {
            setSelectedPrize(prize);
            setShowPrizeForm(true);
      }, []);

      const handleStartGame = useCallback(() => {
            setStartedGame(true);
            playBackgroundMusic();
      }, [playBackgroundMusic]);

      const handleCountdownComplete = useCallback(() => {
            setIsCountdownOver(true);
      }, []);

      const currentQuestion = shuffledQuestions[currentQuestionIndex];

      const questionVariants = {
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -50 },
      };

      useEffect(() => {

            if (isGameOver()) {
                  stopAllSounds();
            }
      }, [isGameOver, stopAllSounds,]);

      return (
            <div className="h-screen w-screen flex items-center justify-center relative">
                  {!startedGame ? (
                        <StartGame handleStartGame={handleStartGame} />
                  ) : (
                        <>
                              <AnimatePresence>
                                    {!isCountdownOver && (
                                          <Countdown onComplete={handleCountdownComplete} />
                                    )}
                              </AnimatePresence>
                              <AnimatePresence>
                                    {!showPrizeWheel && !isGameOver() && (
                                          <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.5 }}
                                                className="w-full h-full overflow-hidden"
                                          >
                                                {currentQuestion && (
                                                      <motion.div
                                                            key={currentQuestionIndex}
                                                            initial="hidden"
                                                            animate="visible"
                                                            exit="exit"
                                                            variants={questionVariants}
                                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                            className="h-screen w-screen"
                                                            style={{
                                                                  background: `linear-gradient(to top left, ${firstBg}, ${secondBg})`,
                                                            }}
                                                      >
                                                            <Questions
                                                                  handleLowTime={handleLowTime}
                                                                  handleTimeout={handleTimeout}
                                                                  question={currentQuestion}
                                                                  onOptionClick={handleOptionClickWrapper}
                                                                  isCorrect={isCorrect}
                                                                  answered={answered}
                                                                  handleRestart={handleRestartWrapper}
                                                                  consecutiveCorrectCount={correctCount}
                                                                  incorrectCount={incorrectCount}
                                                                  isTimerEnabled={gameCategory !== GameCategory.ALTERNATIVE_QA_WITHOUT_TIMER}
                                                            />
                                                      </motion.div>
                                                )}

                                                <AnimatePresence>
                                                      {showPopUp && message && <PopUp message={message} isCorrect={isCorrect} />}
                                                </AnimatePresence>
                                          </motion.div>
                                    )}
                              </AnimatePresence>
                              <AnimatePresence>
                                    {isGameOver() && !showPrizeWheel && (
                                          <GameOverMessage
                                                message={correctCount >= requiredCorrectAnswers ? "¡Has ganado un premio!" : "¡Ups! Vuelve a intentarlo."}
                                                onRestart={handleRestartWrapper}
                                                correctCount={correctCount}
                                                totalQuestions={shuffledQuestions.length}
                                                isWinner={correctCount >= requiredCorrectAnswers}
                                          />
                                    )}
                              </AnimatePresence>
                              {showPrizeWheel && !showPrizeForm && (
                                    <PrizeWheel
                                          onSelectPrize={handleSelectPrize}
                                          companyName={cName}
                                          prizes={prizes}
                                          setIsValidPrize={setIsValidPrize}
                                    />
                              )}
                              {showPrizeForm && selectedPrize && (
                                    <PrizeClaimForm prizeId={selectedPrize.id} prizeName={selectedPrize.name} isValidPrize={isValidPrize} />
                              )}
                        </>
                  )}
            </div>
      );
}