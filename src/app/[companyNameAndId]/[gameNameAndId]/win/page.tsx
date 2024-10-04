'use client'

import { useRouter } from 'next/navigation';
import React from 'react';

const YouWon = () => {
  const router = useRouter();

  const handleRestart = () => {
    // Redirect to the quiz page to restart the quiz
    router.back();
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Congratulations, You Won!</h1>
      <p>You answered enough questions correctly.</p>
      <button onClick={handleRestart} style={{ padding: '10px 20px', marginTop: '20px' }}>
        Play Again
      </button>
    </div>
  );
};

export default YouWon;
