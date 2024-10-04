import { GameCategory } from "@/app/types"

type ProgressBarProps = {
      category: string
      correctAnswers: number
      incorrectAnswers: number
}

export const ProgressBar = ({ category, correctAnswers, incorrectAnswers }: ProgressBarProps) => {
      return (
            <>
                  {category === GameCategory.ALTERNATIVE_QA || GameCategory.ALTERNATIVE_QA_WITHOUT_TIMER ? (
                        <div className="">
                              <div className="flex space-x-2 my-4 mt-12 justify-center">
                                    {[...Array(5)].map((_, index) => (
                                          <div
                                                key={index}
                                                className={`w-12 h-12 sm:w-13 sm:h-13 md:w-15 md:h-15 rounded-full transition-colors duration-300 ${index < correctAnswers
                                                      ? 'bg-green-400'
                                                      : index < correctAnswers + incorrectAnswers
                                                            ? 'bg-red-400'
                                                            : 'bg-gray-300'
                                                      }`}
                                          ></div>
                                    ))}
                              </div>
                              <h2 className="text-white text-xl font-bold text-center" style={{
                                    textShadow: `0 2px 4px rgba(0, 0, 0, 0.2)`
                              }}>Responde 3 de 5 preguntas correctamente para ganar un premio.</h2>
                        </div>
                  ) :
                        (
                              <div className="">
                                    <div className="flex space-x-2 my-4 mt-12 justify-center">
                                          {
                                                [...Array(4)].map((_, index) => (
                                                      <div
                                                            key={index}
                                                            className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full transition-colors duration-300 ${index < correctAnswers ? 'bg-green-400' : 'bg-gray-300'
                                                                  }`}
                                                      ></div>
                                                ))}
                                    </div>
                                    <h2 className="text-white text-lg">Responde 4 preguntas seguidas correctamente y ganate un premio.</h2>
                              </div>
                        )
                  }
            </>

      )
}
