'use client';

import { useRouter } from "next/navigation";

export const ClearMemoryButton = () => {

      const router = useRouter();

      const handleClick = () => {
            localStorage.clear();
            router.push('/')
      };

      return (

            <div className="flex justify-center items-center h-screen">

                  <button
                        onClick={handleClick}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                        Resetear memoria
                  </button>

            </div>

      );

}