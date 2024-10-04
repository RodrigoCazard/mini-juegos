// hooks/useAudio.ts
import { useRef, useCallback, useEffect } from 'react';

export const useAudio = () => {
      const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);
      const correctSoundRef = useRef<HTMLAudioElement | null>(null);
      const incorrectSoundRef = useRef<HTMLAudioElement | null>(null);
      const lowTimeSoundRef = useRef<HTMLAudioElement | null>(null);
      const defeatSoundRef = useRef<HTMLAudioElement | null>(null);
      const rouletteSoundRef = useRef<HTMLAudioElement | null>(null);
      const winSoundRef = useRef<HTMLAudioElement | null>(null);

      useEffect(() => {
            backgroundMusicRef.current = new Audio('/audio/background-music.mp3');
            correctSoundRef.current = new Audio('/audio/correct-sound.mp3');
            incorrectSoundRef.current = new Audio('/audio/incorrect-sound.mp3');
            lowTimeSoundRef.current = new Audio('/audio/low-time-sound.mp3');
            defeatSoundRef.current = new Audio('/audio/defeat-sound.mp3');
            rouletteSoundRef.current = new Audio('/audio/roulette-sound.mp3');
            winSoundRef.current = new Audio('/audio/win-sound.mp3');


            if (backgroundMusicRef.current) {
                  backgroundMusicRef.current.loop = true;
                  backgroundMusicRef.current.volume = 0.05;
            }


            if (winSoundRef.current) {
                  winSoundRef.current.volume = 0.2;
            }

            if (defeatSoundRef.current) {
                  defeatSoundRef.current.volume = 0.05;
            }

            return () => {
                  [backgroundMusicRef, correctSoundRef, incorrectSoundRef, lowTimeSoundRef].forEach(ref => {
                        if (ref.current) {
                              ref.current.pause();
                              ref.current = null;
                        }
                  });
            };
      }, []);

      const fadeAudio = useCallback((audioElement: HTMLAudioElement, fadeType: 'in' | 'out', duration: number = 1000) => {
            const fade = setInterval(() => {
                  if (fadeType === 'in') {
                        if (audioElement.volume < 0.5) {
                              audioElement.volume = Math.min(audioElement.volume + 0.1, 0.5);
                        } else {
                              clearInterval(fade);
                        }
                  } else {
                        if (audioElement.volume > 0.01) {
                              audioElement.volume = Math.max(audioElement.volume - 0.1, 0);
                        } else {
                              clearInterval(fade);
                              audioElement.pause();
                        }
                  }
            }, duration / 10);
      }, []);

      const playBackgroundMusic = useCallback(() => {
            if (backgroundMusicRef.current) {
                  backgroundMusicRef.current.volume = 0;
                  backgroundMusicRef.current.play();
                  fadeAudio(backgroundMusicRef.current, 'in');
            }
      }, [fadeAudio]);


      const playCorrectSound = useCallback(() => {
            if (correctSoundRef.current) {
                  correctSoundRef.current.play();
            }
      }, []);

      const playIncorrectSound = useCallback(() => {
            if (incorrectSoundRef.current) {
                  incorrectSoundRef.current.play();
            }
      }, []);

      const playLowTimeSound = useCallback(() => {
            if (lowTimeSoundRef.current && !lowTimeSoundRef.current.paused) {
                  return;
            }
            if (backgroundMusicRef.current) {
                  backgroundMusicRef.current.volume = 0.2;
            }
            if (lowTimeSoundRef.current) {
                  lowTimeSoundRef.current.volume = 0.3;
                  lowTimeSoundRef.current.play();
            }
      }, []);

      const playRouletteSound = useCallback(() => {
            if (rouletteSoundRef.current) {
                  rouletteSoundRef.current.play();
            }


      }, []);

      const playDefeatSound = useCallback(() => {
            if (defeatSoundRef.current) {
                  defeatSoundRef.current.play();
            }
      }, []);

      const playWinSound = useCallback(() => {
            if (winSoundRef.current) {
                  winSoundRef.current.play();
            }
      }, []);

      const stopBackgroundMusic = useCallback(() => {
            if (backgroundMusicRef.current) {
                  fadeAudio(backgroundMusicRef.current, 'out');
            }
      }, [fadeAudio]);

      const stopLowTimeSound = useCallback(() => {
            if (lowTimeSoundRef.current) {
                  lowTimeSoundRef.current.pause();
                  lowTimeSoundRef.current.currentTime = 0;
            }
            if (backgroundMusicRef.current) {
                  fadeAudio(backgroundMusicRef.current, 'in');
            }
      }, [fadeAudio]);

      const stopDefeatSound = useCallback(() => {
            if (defeatSoundRef.current) {
                  defeatSoundRef.current.pause();
                  defeatSoundRef.current.currentTime = 0;
            }
      }, []);

      const stopWinSound = useCallback(() => {
            if (winSoundRef.current) {
                  winSoundRef.current.pause();
                  winSoundRef.current.currentTime = 0;
            }
      }, []);

      const stopRouletteSound = useCallback(() => {
            if (rouletteSoundRef.current) {
                  rouletteSoundRef.current.pause();
                  rouletteSoundRef.current.currentTime = 0;
            }
            if (backgroundMusicRef.current) {
                  fadeAudio(backgroundMusicRef.current, 'in');
            }
      }, [fadeAudio]);

      const stopAllSounds = useCallback(() => {
            [correctSoundRef, incorrectSoundRef, lowTimeSoundRef,
                  defeatSoundRef, winSoundRef, rouletteSoundRef
            ].forEach(ref => {
                  if (ref.current) {
                        ref.current.pause();
                        ref.current.currentTime = 0;
                  }
            });
            if (backgroundMusicRef.current) {
                  fadeAudio(backgroundMusicRef.current, 'out');
            }
      }, [fadeAudio]);



      return {
            playBackgroundMusic,
            playCorrectSound,
            playIncorrectSound,
            playLowTimeSound,
            playRouletteSound,
            playDefeatSound,
            playWinSound,
            stopBackgroundMusic,
            stopLowTimeSound,
            stopAllSounds,
            stopDefeatSound,
            stopWinSound,
            stopRouletteSound,
            fadeAudio,
      };
};