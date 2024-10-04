'use client';

import { useRouter } from "next/navigation";

export const ClearMemoryButton = () => {

      const router = useRouter();

      const handleClick = () => {
            localStorage.clear();
            router.push('/reiniciar/cookies')
      };

      return (
            <button onClick={handleClick}>Reiniciar aplicacion</button>
      );

}