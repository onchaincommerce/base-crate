import React, { useState, useEffect } from 'react';
import { PRICES } from '../constants/prizes';
import { Checkout, CheckoutButton } from '@coinbase/onchainkit/checkout';
import { getUSDCBalance } from '../utils/getUSDCBalance';
import type { CheckoutProps, CheckoutRenderProps } from '../types/onchain';

interface CrateCardProps {
  type: 'standard' | 'premium';
  isSelected: boolean;
  onClick: () => void;
  productId: string;
  onStatus: (status: any) => void;
}

export default function CrateCard({ type, isSelected, onClick, productId, onStatus }: CrateCardProps) {
  const isStandard = type === 'standard';
  const isPremium = type === 'premium';
  const price = PRICES[type].display;
  const [walletBalance, setWalletBalance] = useState(0);

  // Balance requirements
  const STANDARD_MIN_BALANCE = 15;
  const PREMIUM_MIN_BALANCE = 150;
  const PREMIUM_UNLOCK_THRESHOLD = 2000;

  const isLocked = isPremium && walletBalance < PREMIUM_UNLOCK_THRESHOLD;
  const hasMinBalance = isStandard 
    ? walletBalance >= STANDARD_MIN_BALANCE
    : walletBalance >= PREMIUM_MIN_BALANCE;

  const unlockProgress = isPremium 
    ? Math.min((walletBalance / PREMIUM_UNLOCK_THRESHOLD) * 100, 100)
    : 100;

  // Calculate house edge
  const houseEdge = isStandard ? 17 : 15;

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const balance = await getUSDCBalance('0xc17c78C007FC5C01d796a30334fa12b025426652');
        setWalletBalance(balance);
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    };

    fetchBalance();
    const interval = setInterval(fetchBalance, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      onClick={(!isLocked && hasMinBalance) ? (!isSelected ? onClick : undefined) : undefined}
      className={`
        group relative w-[320px]
        bg-csgo-gradient rounded-lg
        border border-csgo-gray-dark/50 p-6
        ${(!isLocked && hasMinBalance) ? 'cursor-pointer' : 'opacity-80'}
        transition-all duration-300
        ${isSelected ? 'ring-2 ring-csgo-gold shadow-csgo-selected' : ''}
        ${(!isLocked && hasMinBalance && !isSelected) ? 'hover:shadow-csgo hover:ring-1 hover:ring-csgo-blue-light' : ''}
      `}
    >
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-2">
          <span className="bg-gradient-to-r from-white to-csgo-gray-light bg-clip-text text-transparent">
            {isStandard ? 'Standard' : 'Premium'} Crate
          </span>
        </h3>
        <div className="text-csgo-gold text-2xl font-bold">
          ${price.toFixed(2)} USDC
        </div>
        <div className="text-csgo-gray-light text-sm mt-1">
          Win ${isStandard ? '0.40' : '4.00'} - ${isStandard ? '10.00' : '140.00'} USDC
        </div>
        <div className="text-csgo-blue-light text-xs mt-1">
          {houseEdge}% House Edge
        </div>
      </div>

      <div className="relative w-48 h-48 mx-auto mb-6">
        <img
          src="/images/base-crate.png"
          alt={`${isStandard ? 'Standard' : 'Premium'} Crate`}
          className={`
            w-full h-full object-contain
            ${isLocked ? 'opacity-50 grayscale' : ''}
            transition-all duration-300
          `}
        />
      </div>

      {isPremium && (
        <div className="mt-4">
          <div className="text-center text-csgo-gray-light text-sm mb-2">
            Unlock Progress
          </div>
          <div className="flex justify-between text-xs text-csgo-gray-light mb-1">
            <span>${walletBalance.toFixed(2)} USDC</span>
            <span>${PREMIUM_UNLOCK_THRESHOLD} USDC</span>
          </div>
          <div className="h-2 bg-csgo-darker rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-csgo-blue to-csgo-purple-light transition-all duration-300"
              style={{ width: `${unlockProgress}%` }}
            />
          </div>
          {isLocked && (
            <div className="text-center text-csgo-gray-light text-xs mt-1">
              Need ${(PREMIUM_UNLOCK_THRESHOLD - walletBalance).toFixed(2)} more USDC to unlock
            </div>
          )}
        </div>
      )}

      {!hasMinBalance && !isPremium && (
        <div className="text-center text-red-500 text-sm mt-4">
          Insufficient USDC Balance
          <div className="text-csgo-gray-light text-xs">
            Need ${STANDARD_MIN_BALANCE} USDC minimum
            <br />
            Current: ${walletBalance.toFixed(2)} USDC
          </div>
        </div>
      )}

      {isSelected && hasMinBalance ? (
        <Checkout 
          productId={productId} 
          onStatus={(status) => {
            console.log('💳 Payment Status:', status);
            console.log('🔑 Product ID:', productId);
            onStatus(status);
          }}
        >
          <CheckoutButton
            coinbaseBranded
            className="w-full bg-gradient-to-r from-csgo-blue to-csgo-purple-light
                     py-3 px-6 rounded
                     text-white font-bold uppercase text-sm tracking-wider
                     hover:brightness-110 transition-all"
          />
        </Checkout>
      ) : (
        <button
          type="button"
          disabled={!hasMinBalance || isLocked}
          className={`
            w-full py-3 px-6 rounded
            text-white font-bold uppercase text-sm tracking-wider
            ${!hasMinBalance || isLocked
              ? 'bg-csgo-darker text-csgo-gray-light cursor-not-allowed'
              : 'bg-gradient-to-r from-csgo-blue to-csgo-purple-light hover:brightness-110'}
            transition-all
          `}
        >
          {isLocked ? 'Locked' : hasMinBalance ? 'Select Crate' : 'Need USDC'}
        </button>
      )}
    </div>
  );
} 