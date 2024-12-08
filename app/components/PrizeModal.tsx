import React from 'react';
import Image from 'next/image';

interface PrizeModalProps {
  stage: 'payment' | 'selecting' | 'distributing' | 'complete';
  prize: {
    name: string;
    value: number;
    rarity: string;
  } | null;
  txHash: string;
  onClose: () => void;
}

export default function PrizeModal({ stage, prize, txHash, onClose }: PrizeModalProps) {
  // Show spinning logo while waiting for prize
  if (stage === 'selecting') {
    return (
      <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
        <div className="bg-csgo-darker p-8 rounded-lg max-w-md w-full mx-4 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-white text-xl"
          >
            ×
          </button>

          <div className="text-center py-8">
            <div className="animate-spin mb-4">
              <Image
                src="/images/base-logo.png"
                alt="Opening crate..."
                width={64}
                height={64}
                className="mx-auto"
              />
            </div>
            <div className="text-csgo-blue-light font-bold">
              Opening Your Crate...
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show prize result when we have it
  if (stage === 'complete' && prize) {
    return (
      <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
        <div className="bg-csgo-darker p-8 rounded-lg max-w-md w-full mx-4 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-white text-xl"
          >
            ×
          </button>

          <div className="text-center animate-fade-in">
            <div className={`text-4xl font-bold text-${prize.rarity} mb-4`}>
              {prize.rarity.toUpperCase()}
            </div>
            <div className="text-6xl font-bold text-csgo-gold mb-4">
              ${prize.value.toFixed(2)}
            </div>
            <div className="text-gray-400 mb-8">
              {prize.name} sent to your wallet!
            </div>
            <div className="space-y-4">
              <a
                href={`${process.env.NEXT_PUBLIC_BASE_EXPLORER_URL}${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-csgo-blue-light hover:text-csgo-blue"
              >
                View Transaction →
              </a>
              <button
                onClick={onClose}
                className="w-full bg-gradient-to-r from-csgo-blue to-csgo-purple-light
                         py-3 px-6 rounded
                         text-white font-bold uppercase text-sm tracking-wider
                         hover:brightness-110 transition-all"
              >
                Open Another Crate
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
} 