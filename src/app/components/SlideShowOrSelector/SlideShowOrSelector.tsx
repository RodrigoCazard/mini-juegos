'use client';

import { useState, useEffect, useCallback } from 'react';
import { useGlobalContext } from "@/app/context/GlobalContext";
import { Game } from "@/app/types";
import { Slideshow } from '../QuestionsList/Questions/Slideshow/Slideshow';
import { Selector } from '../Selector/Selector';

interface SlideShowOrSelectorProps {
      games: Game[];
      basePath: string;
}

export default function SlideShowOrSelector({ games, basePath }: SlideShowOrSelectorProps) {
      const [showSlideshow, setShowSlideshow] = useState(false);
      const [lastInteraction, setLastInteraction] = useState(Date.now());
      const { companyImgsScreenSavers, companyVidsScreenSavers, companyName, companyId, companyLogo, companyBg } = useGlobalContext();

      const handleInteraction = useCallback(() => {
            if (showSlideshow) {
                  setLastInteraction(Date.now());
                  setShowSlideshow(false);
            }
      }, [showSlideshow]);

      useEffect(() => {
            const checkInactivity = () => {
                  if (Date.now() - lastInteraction > 10000) {
                        setShowSlideshow(true);
                  }
            };

            const interval = setInterval(checkInactivity, 1000);
            return () => clearInterval(interval);
      }, [lastInteraction]);

      useEffect(() => {
            const events = ['touchstart', 'mousedown', 'mousemove', 'click', 'keydown'];
            events.forEach(event => window.addEventListener(event, handleInteraction));
            return () => events.forEach(event => window.removeEventListener(event, handleInteraction));
      }, [handleInteraction]);

      useEffect(() => {
            if (!companyId) return;

            if (localStorage.getItem('companyLogo')) {
                  localStorage.setItem('companyBg', companyBg);
                  localStorage.setItem('companyLogo', companyLogo);
                  localStorage.setItem('companyName', companyName);
                  localStorage.setItem('companyId', companyId.toString());
                  localStorage.setItem('companyImgsScreenSavers', JSON.stringify(companyImgsScreenSavers));
                  localStorage.setItem('companyVidsScreenSavers', JSON.stringify(companyVidsScreenSavers));
            }
      }, [companyId, companyBg, companyLogo, companyName, companyImgsScreenSavers, companyVidsScreenSavers]);

      if (showSlideshow) {
            return <Slideshow />;
      }

      return (
            <Selector<Game>
                  items={games}
                  label="un juego"
                  basePath={basePath}
            />
      );
}