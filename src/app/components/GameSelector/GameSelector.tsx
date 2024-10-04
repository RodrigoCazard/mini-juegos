'use client';

import { useState, useCallback } from 'react';
import { GameCategory, Prize, QuestionWithOptions } from "@/app/types";
import { QuestionContainer } from "../QuestionsList/QuestionsContainer";
import PrizeWheel from "../QuestionsList/Questions/PrizeWheel";
import { PrizeClaimForm } from '../QuestionsList/Questions/PrizeClaimForm';
import { motion } from "framer-motion";

interface GameSelectorProps {
      questions: QuestionWithOptions[];
      prizes: Prize[];
      gameCategory: GameCategory;
}

export default function GameSelector({ questions, prizes, gameCategory }: GameSelectorProps) {
      const requiredCorrectAnswers = gameCategory === GameCategory.QA ? 4 : 3;
      const [showPrizeForm, setShowPrizeForm] = useState(false);
      const [selectedPrize, setSelectedPrize] = useState<Prize | null>(null);
      const [isValidPrize, setIsValidPrize] = useState(false);

      const handleSelectPrize = useCallback((prize: Prize) => {
            setSelectedPrize(prize);
            setShowPrizeForm(true);
      }, []);

      return (
            <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
            >
                  {gameCategory === GameCategory.ROULETTE ? (
                        !showPrizeForm ? (
                              <PrizeWheel
                                    onSelectPrize={handleSelectPrize}
                                    companyName={"Unimedical"} // Reemplazar con la lógica correcta
                                    prizes={prizes}
                                    setIsValidPrize={setIsValidPrize}
                              />
                        ) : (
                              selectedPrize && (
                                    <PrizeClaimForm
                                          prizeId={selectedPrize.id}
                                          prizeName={selectedPrize.name}
                                          isValidPrize={isValidPrize}
                                    />
                              )
                        )
                  ) : (
                        <QuestionContainer
                              questions={questions}
                              requiredCorrectAnswers={requiredCorrectAnswers}
                              gameCategory={gameCategory}
                              prizes={prizes}
                        />
                  )}
            </motion.div>
      );
}