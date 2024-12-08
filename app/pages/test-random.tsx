'use client';

import { useState } from 'react';
import { selectRandomPrize } from '../utils/prizeSelection';
import { STANDARD_PRIZES } from '../constants/prizes';

export default function TestRandom() {
  const [results, setResults] = useState<Record<string, number>>({});

  const runTest = (iterations: number = 1000) => {
    const counts: Record<string, number> = {};
    
    for (let i = 0; i < iterations; i++) {
      const prize = selectRandomPrize(STANDARD_PRIZES);
      counts[prize.name] = (counts[prize.name] || 0) + 1;
    }

    setResults(counts);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Test Prize Distribution</h1>
      <button
        onClick={() => runTest()}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Run 1000 Tests
      </button>
      
      {Object.entries(results).length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl mb-2">Results:</h2>
          {Object.entries(results).map(([prize, count]) => (
            <div key={prize} className="mb-2">
              {prize}: {count} times ({(count / 1000 * 100).toFixed(1)}%)
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 