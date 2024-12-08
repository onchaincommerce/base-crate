'use client';

import { useState } from 'react';
import { selectRandomPrize } from '../utils/prizeSelection';
import { STANDARD_PRIZES, PREMIUM_PRIZES } from '../constants/prizes';
import Link from 'next/link';

export default function SimulatePage() {
  const [results, setResults] = useState<{[key: string]: number}>({});
  const [totalRolls, setTotalRolls] = useState(0);
  const [selectedType, setSelectedType] = useState<'standard' | 'premium'>('standard');

  const runTest = (iterations: number = 10000) => {
    const prizes = selectedType === 'standard' ? STANDARD_PRIZES : PREMIUM_PRIZES;
    const counts: {[key: string]: number} = {};
    
    // Initialize counts
    prizes.forEach(prize => {
      counts[prize.name] = 0;
    });

    // Run simulations
    for (let i = 0; i < iterations; i++) {
      const prize = selectRandomPrize(prizes);
      counts[prize.name]++;
    }

    setTotalRolls(iterations);
    setResults(counts);
  };

  const calculatePercentage = (count: number) => {
    return ((count / totalRolls) * 100).toFixed(2);
  };

  const getExpectedProbability = (prizeName: string) => {
    const prizes = selectedType === 'standard' ? STANDARD_PRIZES : PREMIUM_PRIZES;
    const prize = prizes.find(p => p.name === prizeName);
    return prize ? prize.probability : 0;
  };

  return (
    <div className="min-h-screen bg-csgo-dark text-white p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Prize Distribution Test</h1>
          <Link 
            href="/"
            className="text-csgo-blue-light hover:text-csgo-blue"
          >
            ← Back to Crates
          </Link>
        </div>

        {/* Case Type Selection */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setSelectedType('standard')}
            className={`px-4 py-2 rounded ${
              selectedType === 'standard' 
                ? 'bg-csgo-blue text-white' 
                : 'bg-csgo-darker text-csgo-gray-light hover:bg-csgo-gray-dark/30'
            }`}
          >
            Standard Case
          </button>
          <button
            onClick={() => setSelectedType('premium')}
            className={`px-4 py-2 rounded ${
              selectedType === 'premium' 
                ? 'bg-csgo-purple-light text-white' 
                : 'bg-csgo-darker text-csgo-gray-light hover:bg-csgo-gray-dark/30'
            }`}
          >
            Premium Case
          </button>
        </div>
        
        {/* Test Controls */}
        <div className="space-y-4 mb-8">
          <button
            onClick={() => runTest(1000)}
            className="bg-csgo-button px-4 py-2 rounded mr-4 hover:brightness-110"
          >
            Run 1,000 Tests
          </button>
          <button
            onClick={() => runTest(10000)}
            className="bg-csgo-button px-4 py-2 rounded hover:brightness-110"
          >
            Run 10,000 Tests
          </button>
        </div>

        {/* Results */}
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
                  <div key={name} className="bg-csgo-darker p-4 rounded">
                    <div className="flex justify-between mb-2">
                      <span className="font-bold">{name}</span>
                      <span>{count.toLocaleString()} rolls</span>
                    </div>
                    <div className="text-sm">
                      <div className="flex justify-between text-csgo-blue-light">
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