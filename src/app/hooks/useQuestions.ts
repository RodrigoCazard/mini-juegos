// hooks/useQuestions.ts
import { useState, useCallback, useMemo } from 'react';
import { QuestionWithOptions, GameCategory } from '../types';

export const useQuestions = (initialQuestions: QuestionWithOptions[], requiredCorrectAnswers: number, gameCategory: GameCategory) => {
      const [questions, setQuestions] = useState<QuestionWithOptions[]>(initialQuestions);
      const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
      const [correctCount, setCorrectCount] = useState(0);
      const [incorrectCount, setIncorrectCount] = useState(0);
      const [answered, setAnswered] = useState(false);

      const shuffleQuestions = useCallback((array: QuestionWithOptions[]) => {
            return [...array].sort(() => Math.random() - 0.5);
      }, []);

      const shuffledQuestions = useMemo(() => shuffleQuestions(questions).slice(0, 5), [questions, shuffleQuestions]);

      const handleNextQuestion = useCallback(() => {
            if (currentQuestionIndex < shuffledQuestions.length - 1) {
                  setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
            }
            setAnswered(false);
      }, [currentQuestionIndex, shuffledQuestions.length]);

      const handleOptionClick = useCallback((isCorrect: boolean) => {
            if (answered) return;

            setAnswered(true);
            if (isCorrect) {
                  setCorrectCount((prev) => prev + 1);
            } else {
                  setIncorrectCount((prev) => prev + 1);
            }
      }, [answered]);

      const handleRestart = useCallback(() => {
            setQuestions(shuffleQuestions(initialQuestions));
            setCurrentQuestionIndex(0);
            setCorrectCount(0);
            setIncorrectCount(0);
            setAnswered(false);
      }, [initialQuestions, shuffleQuestions]);

      const isGameOver = useCallback(() => {
            switch (gameCategory) {
                  case GameCategory.ALTERNATIVE_QA:
                  case GameCategory.ALTERNATIVE_QA_WITHOUT_TIMER:

                        return correctCount >= 3 || incorrectCount >= 3 || (correctCount + incorrectCount) >= 5;

                  case GameCategory.NEW_ALTERNATIVE: // Nueva opción/src/app/login
                        // Condición 2: Game over solo si ha respondido 3 o más preguntas incorrectamente
                        return incorrectCount >= 3 || (correctCount + incorrectCount) >= 5;;

                  default:
                        // Condición para las demás categorías: Game over si se alcanzaron las respuestas correctas requeridas o se llegó a la última pregunta
                        return correctCount >= requiredCorrectAnswers || (currentQuestionIndex === shuffledQuestions.length - 1 && answered);
            }
      }, [correctCount, incorrectCount, requiredCorrectAnswers, currentQuestionIndex, shuffledQuestions.length, answered, gameCategory]);

      return {
            shuffledQuestions,
            currentQuestionIndex,
            correctCount,
            incorrectCount,
            answered,
            handleNextQuestion,
            handleOptionClick,
            handleRestart,
            isGameOver,
      };
};