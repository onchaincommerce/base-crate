'use client';

import { useState } from 'react';

export default function TestPage() {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('0.1');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testTransfer = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/test-transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address, amount: parseFloat(amount) })
      });
      
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setResult(error instanceof Error ? error.message : 'Failed to transfer');
    }
    setLoading(false);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Test USDC Transfer</h1>
      <div className="space-y-4">
        <div>
          <label className="block mb-2">Recipient Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-2 border rounded text-black"
          />
        </div>
        <div>
          <label className="block mb-2">Amount (USDC):</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border rounded text-black"
            step="0.01"
          />
        </div>
        <button
          onClick={testTransfer}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          {loading ? 'Testing...' : 'Test Transfer'}
        </button>
        {result && (
          <pre className="mt-4 p-4 bg-gray-100 rounded whitespace-pre-wrap">
            {result}
          </pre>
        )}
      </div>
    </div>
  );
} 