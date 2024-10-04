'use client';

import { useState, useEffect, useRef, useMemo } from "react";
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalContext } from "@/app/context/GlobalContext";

interface MediaItem {
      type: 'image' | 'video';
      src: string;
}

function shuffleArray<T>(array: T[]): T[] {
      const shuffledArray = [...array];
      for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
      }
      return shuffledArray;
}

export const Slideshow = () => {
      const [currentIndex, setCurrentIndex] = useState<number>(0);
      const [shuffledItems, setShuffledItems] = useState<MediaItem[]>([]);
      const videoRef = useRef<HTMLVideoElement>(null);
      const [intervalDuration, setIntervalDuration] = useState<number>(5000);
      const [isVertical, setIsVertical] = useState<boolean>(false);

      const { companyImgsScreenSavers, companyVidsScreenSavers } = useGlobalContext();

      const images = useMemo(() => companyImgsScreenSavers || JSON.parse(localStorage.getItem('companyImgsScreenSavers') || '[]'), [companyImgsScreenSavers]);
      const videos = useMemo(() => companyVidsScreenSavers || JSON.parse(localStorage.getItem('companyVidsScreenSavers') || '[]'), [companyVidsScreenSavers]);

      useEffect(() => {
            const items: MediaItem[] = [
                  ...images.map(image => ({ type: 'image' as const, src: image })),
                  ...videos.map(video => ({ type: 'video' as const, src: video })),
            ];

            setShuffledItems(shuffleArray(items));
            setCurrentIndex(0);
      }, [images, videos]);

      useEffect(() => {
            if (shuffledItems.length === 0) return;

            const interval = setInterval(() => {
                  setCurrentIndex((prevIndex) => (prevIndex + 1) % shuffledItems.length);
            }, intervalDuration);

            return () => clearInterval(interval);
      }, [shuffledItems, intervalDuration]);

      useEffect(() => {
            const currentItem = shuffledItems[currentIndex];

            if (currentItem?.type === 'video' && videoRef.current) {
                  const videoElement = videoRef.current;

                  const handleLoadedMetadata = () => {
                        setIntervalDuration(videoElement.duration * 1000);
                        videoElement.volume = 0.6;
                        setIsVertical(videoElement.videoHeight > videoElement.videoWidth);
                  };

                  const handleEnded = () => {
                        setCurrentIndex((prevIndex) => (prevIndex + 1) % shuffledItems.length);
                  };

                  videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);
                  videoElement.addEventListener('ended', handleEnded);

                  return () => {
                        videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
                        videoElement.removeEventListener('ended', handleEnded);
                  };
            } else {
                  setIntervalDuration(5000);
                  setIsVertical(false);
            }
      }, [shuffledItems, currentIndex]);

      if (shuffledItems.length === 0) {
            return null;
      }

      const currentItem = shuffledItems[currentIndex];

      return (
            <AnimatePresence>
                  <div className="fixed inset-0 bg-black overflow-hidden flex items-center justify-center z-150">
                        <motion.div
                              key={currentItem.src}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.8 }}
                              className="absolute inset-0 flex items-center justify-center"
                        >
                              {currentItem.type === 'image' ? (
                                    <div className="relative w-full h-full">
                                          <Image
                                                src={currentItem.src}
                                                alt="Slideshow"
                                                fill
                                                style={{ objectFit: 'contain' }}
                                                quality={100}
                                                priority
                                          />
                                    </div>
                              ) : (
                                    <div className={`relative ${isVertical ? 'w-auto h-full' : 'w-full h-auto'}`}>
                                          <video
                                                ref={videoRef}
                                                src={currentItem.src}
                                                autoPlay
                                                loop={false}
                                                playsInline
                                                className={`max-w-full max-h-full ${isVertical ? 'h-full' : 'w-full'} object-contain`}
                                          />
                                    </div>
                              )}
                        </motion.div>
                  </div>
                  <footer className="w-full text-white text-base flex items-center font-bold justify-center fixed bottom-0 p-1 bg-black bg-opacity-50 z-155">
                        Tocá la pantalla para comenzar
                  </footer>
            </AnimatePresence>
      );
};