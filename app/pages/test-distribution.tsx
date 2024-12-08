'use client';

import { useState } from 'react';
import { selectRandomPrize } from '../utils/prizeSelection';
import { STANDARD_PRIZES, PREMIUM_PRIZES } from '../constants/prizes';

export default function TestDistribution() {
  const [results, setResults] = useState<{[key: string]: number}>({});
  const [totalRolls, setTotalRolls] = useState(0);

  const runTest = (iterations: number = 10000) => {
    const counts: {[key: string]: number} = {};
    
    // Initialize counts
    STANDARD_PRIZES.forEach(prize => {
      counts[prize.name] = 0;
    });

    // Run simulations
    for (let i = 0; i < iterations; i++) {
      const prize = selectRandomPrize(STANDARD_PRIZES);
      counts[prize.name]++;
    }

    setTotalRolls(iterations);
    setResults(counts);
  };

  const calculatePercentage = (count: number) => {
    return ((count / totalRolls) * 100).toFixed(2);
  };

  const getExpectedProbability = (prizeName: string) => {
    const prize = STANDARD_PRIZES.find(p => p.name === prizeName);
    return prize ? prize.probability : 0;
  };

  return (
    <div className="min-h-screen bg-[#1b2838] text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Prize Distribution Test</h1>
        
        <div className="space-y-4 mb-8">
          <button
            onClick={() => runTest(1000)}
            className="bg-[#4b69ff] px-4 py-2 rounded mr-4"
          >
            Run 1,000 Tests
          </button>
          <button
            onClick={() => runTest(10000)}
            className="bg-[#4b69ff] px-4 py-2 rounded"
          >
            Run 10,000 Tests
          </button>
        </div>

        {totalRolls > 0 && (
          <div>
            <h2 className="text-xl mb-4">Results from {totalRolls.toLocaleString()} rolls:</h2>
            <div className="space-y-4">
              {Object.entries(results).map(([name, count]) => {
                const actualPercentage = parseFloat(calculatePercentage(count));
                const expectedPercentage = getExpectedProbability(name);
                const difference = (actualPercentage - expectedPercentage).toFixed(2);
                const isClose = Math.abs(actualPercentage - expectedPercentage) < 1;

                return (
                  <div key={name} className="bg-[#2a475e] p-4 rounded">
                    <div className="flex justify-between mb-2">
                      <span className="font-bold">{name}</span>
                      <span>{count.toLocaleString()} rolls</span>
                    </div>
                    <div className="text-sm">
                      <div className="flex justify-between text-[#66c0f4]">
                        <span>Actual: {actualPercentage}%</span>
                        <span>Expected: {expectedPercentage}%</span>
                      </div>
                      <div className={`text-right ${isClose ? 'text-green-400' : 'text-yellow-400'}`}>
                        Difference: {difference}%
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 