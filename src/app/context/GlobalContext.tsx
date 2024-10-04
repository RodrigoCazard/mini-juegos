
'use client';

import { createContext, useState, ReactNode, useContext } from 'react';

interface GlobalContextType {
      companyId: number;
      setCompanyId: (id: number) => void;
      companyName: string;
      setCompanyName: (name: string) => void;
      companyLogo: string;
      setCompanyLogo: (logo: string) => void;
      companyBg: string;
      setCompanyBg: (bg: string) => void;
      companyImgsScreenSavers: string[];
      setCompanyImgsScreenSavers: (screensavers: string[]) => void
      companyVidsScreenSavers: string[];
      setCompanyVidsScreenSavers: (screensavers: string[]) => void

      gameId: number;
      setGameId: (id: number) => void;
      gameName: string
      setGameName: (name: string) => void;
      gameCategory: string
      setGameCategory: (category: string) => void;

      companySocialMedias: Record<string, string | null>;
      setCompanySocialMedias: (socialMedias: Record<string, string | null>) => void;

}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const useGlobalContext = () => {
      const context = useContext(GlobalContext);
      if (!context) {
            throw new Error("useGlobalContext must be used within a GlobalProvider");
      }
      return context;
};

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
      const [companyId, setCompanyId] = useState<number>(0);
      const [companyName, setCompanyName] = useState<string>('');
      const [companyLogo, setCompanyLogo] = useState<string>('')
      const [companyBg, setCompanyBg] = useState<string>('')
      const [companyImgsScreenSavers, setCompanyImgsScreenSavers] = useState<string[]>([])
      const [companyVidsScreenSavers, setCompanyVidsScreenSavers] = useState<string[]>([])

      const [gameId, setGameId] = useState<number>(0);
      const [gameName, setGameName] = useState<string>("");
      const [gameCategory, setGameCategory] = useState<string>("");

      const [companySocialMedias, setCompanySocialMedias] = useState<Record<string, string | null>>({});


      return (
            <GlobalContext.Provider value={{
                  companyId,
                  setCompanyId,
                  companyName,
                  setCompanyName,
                  companyLogo,
                  setCompanyLogo,
                  companyBg,
                  setCompanyBg,
                  companyImgsScreenSavers,
                  setCompanyImgsScreenSavers,
                  companyVidsScreenSavers,
                  setCompanyVidsScreenSavers,

                  gameName,
                  setGameName,
                  gameId,
                  setGameId,
                  gameCategory,
                  setGameCategory,

                  companySocialMedias,
                  setCompanySocialMedias

            }}>
                  {children}
            </GlobalContext.Provider>
      );
};
