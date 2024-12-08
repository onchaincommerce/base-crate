import React from 'react';
import Link from 'next/link';

export default function SimulationButton() {
  return (
    <Link 
      href="/simulate"
      className="bg-csgo-darker border border-csgo-gray-dark/50 rounded px-4 py-2 
                flex items-center gap-2 hover:bg-csgo-gray-dark/30 transition-colors"
    >
      <span className="text-csgo-blue-light">🎲</span>
      <span className="text-csgo-gray-light">Test Probabilities</span>
    </Link>
  );
} 