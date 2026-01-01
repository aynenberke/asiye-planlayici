'use client';

import React, { useEffect, useState } from 'react';

export function Confetti({ trigger }: { trigger: boolean }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (trigger) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  if (!show) return null;

  const confettiPieces = Array.from({ length: 50 });

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {confettiPieces.map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 2;
        const duration = 2 + Math.random() * 2;
        const colors = [
          '#ff6b6b',
          '#4ecdc4',
          '#45b7d1',
          '#ffe66d',
          '#ff9ff3',
          '#54a0ff',
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];

        return (
          <div
            key={i}
            className="absolute w-3 h-3 rounded-full"
            style={{
              left: `${left}%`,
              top: '-10px',
              backgroundColor: color,
              animation: `fall ${duration}s ${delay}s ease-in forwards`,
            }}
          />
        );
      })}
    </div>
  );
}

