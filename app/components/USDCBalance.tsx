'use client';

import { useState, useEffect } from 'react';
import { getUSDCBalance } from '../utils/getUSDCBalance';

export default function USDCBalance() {
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBalance = async () => {
      const result = await getUSDCBalance('0xc17c78C007FC5C01d796a30334fa12b025426652');
      setBalance(result);
      setLoading(false);
    };

    fetchBalance();
    // Refresh every 30 seconds
    const interval = setInterval(fetchBalance, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="bg-[#1b2838] px-4 py-2 rounded border border-[#355069]/50">
        <div className="animate-pulse bg-[#355069] h-6 w-24 rounded" />
      </div>
    );
  }

  if (balance === null) return null;

  return (
    <div className="bg-[#1b2838] px-4 py-2 rounded border border-[#355069]/50">
      <div className="flex items-center space-x-2">
        <span className="text-[#66c0f4]">Balance:</span>
        <span className="text-[#ffd700] font-bold">${balance.toFixed(2)}</span>
        <span className="text-[#b8b6b4]">USDC</span>
      </div>
    </div>
  );
} 