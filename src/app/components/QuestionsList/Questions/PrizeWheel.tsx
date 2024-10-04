'use client';

import { useState, useCallback, useMemo } from "react";
import { Wheel } from "react-custom-roulette";
import Image from 'next/image';
import { useGlobalContext } from "@/app/context/GlobalContext";
import { Prize } from "@/app/types";
import { useAudio } from "@/app/hooks/useAudio";

type PrizeWheelProps = {
      onSelectPrize: (prize: Prize) => void;
      companyName: string;
      prizes: Prize[]
      setIsValidPrize: (boolean: boolean) => void;
};

export type PrizeForWheel = {

      option: string;
      prizeData: Prize;
      id: number;
      name: string;

};


export default function PrizeWheel({
      prizes,
      onSelectPrize,
      companyName,
      setIsValidPrize }: PrizeWheelProps) {

      const [mustSpin, setMustSpin] = useState(false);
      const [prizeNumber, setPrizeNumber] = useState(0);
      const { companyLogo } = useGlobalContext();

      const { playRouletteSound, stopRouletteSound } = useAudio();

      const logo = useMemo(() => {

            if (!companyLogo) {
                  return localStorage.getItem('companyLogo');
            }

            return companyLogo;
      }, [companyLogo]);

      const wheelData = useMemo(() => {

            const totalSegments = 8;  // Ruleta con 8 particiones en total

            const prizesWithProbabilities: PrizeForWheel[] = prizes.flatMap(prize => {
                  const partitions = Math.round((prize.probability / 100) * totalSegments);
                  return Array(partitions).fill({
                        option: prize.name,
                        prizeData: prize,  // Guardamos la información completa del premio,
                        id: prize.id,
                        name: prize.name
                  });

            });

            // Función para distribuir los premios sin adyacencias con el mismo id
            const orderPrizes = (arr: PrizeForWheel[]): PrizeForWheel[] => {
                  const result: PrizeForWheel[] = new Array(arr.length);
                  const prizeMap = new Map<number, PrizeForWheel[]>();

                  // Agrupamos los premios por su id en un Map
                  arr.forEach(prize => {
                        if (!prizeMap.has(prize.id)) {
                              prizeMap.set(prize.id, []);
                        }
                        prizeMap.get(prize.id)?.push(prize);
                  });

                  // Convertimos el Map a una lista, ordenando por la cantidad de premios en cada grupo
                  const prizeGroups: PrizeForWheel[][] = Array.from(prizeMap.values()).sort((a, b) => b.length - a.length);

                  let index = 0;

                  // Primero llenamos los índices pares
                  for (let i = 0; i < result.length; i += 2) {
                        if (prizeGroups.length === 0) break;

                        // Tomamos el primer premio del grupo más grande
                        const prizeGroup = prizeGroups[0];
                        result[i] = prizeGroup.shift()!;  // Asignamos el premio

                        // Si el grupo queda vacío, lo eliminamos
                        if (prizeGroup.length === 0) {
                              prizeGroups.shift();
                        }

                        index++;
                        console.log(index)
                  }

                  // Luego llenamos los índices impares
                  for (let i = 1; i < result.length; i += 2) {
                        if (prizeGroups.length === 0) break;

                        const prizeGroup = prizeGroups[0];
                        result[i] = prizeGroup.shift()!;  // Asignamos el premio

                        if (prizeGroup.length === 0) {
                              prizeGroups.shift();
                        }

                        index++;

                        console.log(index)
                  }

                  return result;
            };

            const returnArray = orderPrizes(prizesWithProbabilities);

            return returnArray;

      }, [prizes]);

      const handleSpinClick = useCallback(() => {
            if (!mustSpin) {
                  const newPrizeNumber = Math.floor(Math.random() * wheelData.length);
                  setPrizeNumber(newPrizeNumber);
                  setMustSpin(true);
                  // Hacer que la duración del sonido sea proporcional a la velocidad de la ruleta y que dure el tiempo que la ruleta gira
                  playRouletteSound();

            }
      }, [mustSpin, wheelData.length, playRouletteSound]);

      const handleStopSpinning = useCallback(() => {
            setMustSpin(false);
            const selectedPrize = wheelData[prizeNumber];
            const selectedPrizeWithoutOption = selectedPrize.prizeData;

            const name = selectedPrizeWithoutOption.name.split(" ").join("").toLowerCase(); // Eliminamos los espacios y convertimos a minúsculas para comparar
            console.log('name' + name)

            if (name === "seguíparticipando") {
                  setIsValidPrize(true);
            }

            if (selectedPrize) {
                  setTimeout(() => {
                        onSelectPrize(selectedPrizeWithoutOption);
                  }, 1000);
            } else {
                  console.error('Error: No se pudo encontrar el premio seleccionado.');
            }
            stopRouletteSound();
      }, [onSelectPrize, prizeNumber, wheelData, setIsValidPrize, stopRouletteSound]);

      return (
            <div className="fixed inset-0 bg-black flex flex-col items-center justify-center p-8 bg-black "

            >
                  <div className="mb-4">
                        <div >
                              <Image
                                    src={`${logo} `}
                                    alt="Logo"
                                    width={600}
                                    height={150}
                              />
                        </div>
                  </div>
                  {/*  */}
                  <div className="mb-4 relative 
                w-[315px] 
                sm:w-[450px] 
                md:w-[500px] 
                lg:w-[580px] 
                xl:w-[580px] 
                2xl:w-[580px] ">
                        <Wheel
                              mustStartSpinning={mustSpin}
                              prizeNumber={prizeNumber}
                              data={wheelData}
                              onStopSpinning={handleStopSpinning}
                              backgroundColors={['#FFD700', '#FFDB4D', '#FFE066', '#FFE680', '#FFEB99', '#FFF0B3', '#FFF5CC']}
                              textColors={['#000000']}
                              outerBorderColor="#FFFFFF"
                              outerBorderWidth={10}
                              radiusLineColor="#FFFFFF"
                              radiusLineWidth={6}
                              fontSize={16}
                              fontWeight={700}
                              spinDuration={0.61}
                              textDistance={57}
                              pointerProps={{
                                    src: `https://i.postimg.cc/VkPyVNSf/play-solid.png`,
                                    style: {
                                          rotate: '140deg',
                                          filter: 'brightness(0) saturate(100%) invert(80%) sepia(75%) saturate(552%) hue-rotate(359deg) brightness(103%) contrast(107%)',
                                    }
                              }}
                        />
                        {/* Punto central */}
                        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 ${decodeURIComponent(companyName).toLowerCase() === 'unimedical' ? 'bg-black' : 'bg-whit'} rounded-full border-4 border-white z-10 flex items-center justify-center overflow-hidden`}>
                              <Image
                                    src={`${logo}`}
                                    alt="Centro Logo"
                                    width={60}
                                    height={60}
                                    className="object-contain"
                              />
                        </div>
                  </div >

                  <button
                        className="px-8 py-4 bg-yellow-400 text-black rounded-full text-xl font-bold hover:bg-yellow-500 transition-all duration-300 shadow-lg"
                        onClick={handleSpinClick}
                        disabled={mustSpin}
                  >
                        {mustSpin ? 'Girando...' : 'Girar ruleta'}
                  </button>
            </div >
      );
}