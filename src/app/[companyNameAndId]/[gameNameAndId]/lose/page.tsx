'use client'

import { useRouter } from 'next/navigation';
import React from 'react';

const YouLost = () => {
  const router = useRouter();

  const handleRestart = () => {
    // Redirect to the quiz page to restart the quiz
    router.back();
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Sorry, You Lost!</h1>
      <p>You made too many incorrect attempts.</p>
      <button onClick={handleRestart} style={{ padding: '10px 20px', marginTop: '20px' }}>
        Try Again
      </button>
    </div>
  );
};

export default YouLost;
