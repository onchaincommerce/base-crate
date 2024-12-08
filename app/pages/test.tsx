'use client';

import { useState } from 'react';
import { transferUSDC } from '../utils/usdcTransfer';
import { selectRandomPrize } from '../utils/prizeSelection';
import { STANDARD_PRIZES, PREMIUM_PRIZES } from '../constants/prizes';

export default function TestPage() {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testStandardCrate = async () => {
    setLoading(true);
    try {
      // Test wallet address
      const testAddress = '0xYourTestWalletAddress';
      
      // Select random prize
      const prize = selectRandomPrize(STANDARD_PRIZES);
      
      // Transfer USDC
      const tx = await transferUSDC(testAddress, prize.value);
      
      setResult(`Success! Prize: ${prize.name}, TX: ${tx.hash}`);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setResult(`Error: ${errorMessage}`);
    }
    setLoading(false);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Test Crypto Crate</h1>
      <button
        onClick={testStandardCrate}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {loading ? 'Testing...' : 'Test Standard Crate'}
      </button>
      {result && (
        <pre className="mt-4 p-4 bg-gray-100 rounded">
          {result}
        </pre>
      )}
    </div>
  );
} 