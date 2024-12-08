'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet';
import {
  Address,
  Avatar,
  Name,
  Identity,
  EthBalance,
} from '@coinbase/onchainkit/identity';
import { Checkout, CheckoutButton, CheckoutStatus, LifecycleStatus } from '@coinbase/onchainkit/checkout';
import { PRODUCT_IDS, PRICES } from './constants/prizes';
import USDCBalance from './components/USDCBalance';
import CrateCard from './components/CrateCard';
import SimulationButton from './components/SimulationButton';
import FloatingIcons from './components/FloatingIcons';
import PrizeModal from './components/PrizeModal';
import { PrizeResult } from './types/prizes';

type CrateType = 'standard' | 'premium' | null;

export default function App() {
  const [selectedCrate, setSelectedCrate] = useState<CrateType>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [prizeResult, setPrizeResult] = useState<PrizeResult | null>(null);

  // Poll for prize result
  useEffect(() => {
    if (!isLoading) return;

    const checkPrize = async () => {
      try {
        const response = await fetch('/api/check-prize');
        const data = await response.json();
        
        if (data.prize) {
          setPrizeResult(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error checking prize:', error);
      }
    };

    const interval = setInterval(checkPrize, 1000);
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleStatusChange = async (status: LifecycleStatus) => {
    if (status.statusName === 'pending') {
      setIsLoading(true);
    }
  };

  return (
    <div className="min-h-screen bg-csgo-dark">
      <FloatingIcons />
      <header className="fixed top-0 right-0 p-4 z-50 flex items-center gap-4">
        <SimulationButton />
        <div className="bg-csgo-darker border border-csgo-gray-dark/50 rounded">
          <Wallet>
            <ConnectWallet className="!transition-none">
              <div className="flex items-center px-4 py-2">
                <Avatar className="h-6 w-6 mr-2" />
                <Name className="text-csgo-gray-light" />
              </div>
            </ConnectWallet>
            <WalletDropdown>
              <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                <Avatar />
                <Name />
                <Address />
                <EthBalance />
              </Identity>
              <WalletDropdownDisconnect />
            </WalletDropdown>
          </Wallet>
        </div>
      </header>

      <main className="container mx-auto px-4 pt-20 pb-8">
        <h1 className="text-6xl font-bold text-center mb-8">
          <span className="bg-gradient-to-r from-csgo-blue to-csgo-purple-light bg-clip-text text-transparent">
            Base Crates
          </span>
        </h1>

        <div className="flex flex-wrap justify-center gap-8 mb-12">
          <CrateCard
            type="standard"
            isSelected={selectedCrate === 'standard'}
            onClick={() => setSelectedCrate('standard')}
            productId={PRODUCT_IDS.standard}
            onStatus={handleStatusChange}
          />
          <CrateCard
            type="premium"
            isSelected={selectedCrate === 'premium'}
            onClick={() => setSelectedCrate('premium')}
            productId={PRODUCT_IDS.premium}
            onStatus={handleStatusChange}
          />
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
            <div className="bg-csgo-darker p-8 rounded-lg max-w-md w-full mx-4">
              <div className="text-center">
                <div className="animate-spin mb-4">
                  <Image
                    src="/images/base-logo.png"
                    alt="Opening crate..."
                    width={64}
                    height={64}
                    className="mx-auto"
                    priority
                  />
                </div>
                <div className="text-csgo-blue-light font-bold">
                  Opening Your Crate...
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Prize Result */}
        {prizeResult && (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
            <div className="bg-csgo-darker p-8 rounded-lg max-w-md w-full mx-4">
              <button
                onClick={() => setPrizeResult(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-white text-xl"
              >
                ×
              </button>

              <div className="text-center">
                <div className={`text-4xl font-bold text-${prizeResult.prize.rarity} mb-4`}>
                  {prizeResult.prize.rarity.toUpperCase()}
                </div>
                <div className="text-6xl font-bold text-csgo-gold mb-4">
                  ${prizeResult.prize.value.toFixed(2)}
                </div>
                <div className="text-gray-400 mb-8">
                  {prizeResult.prize.name} sent to your wallet!
                </div>

                <div className="space-y-4">
                  <a
                    href={`${process.env.NEXT_PUBLIC_BASE_EXPLORER_URL}${prizeResult.txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-csgo-blue-light hover:text-csgo-blue"
                  >
                    View Transaction →
                  </a>
                  <button
                    onClick={() => {
                      setPrizeResult(null);
                      setSelectedCrate(null);
                    }}
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
        )}
      </main>
    </div>
  );
}
