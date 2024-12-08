import { Prize } from '../types/prizes';

export function selectRandomPrize(prizes: Prize[]): Prize {
  // Sort prizes by probability (highest to lowest)
  const sortedPrizes = [...prizes].sort((a, b) => b.probability - a.probability);
  
  // Generate random number (1-100)
  const random = Math.floor(Math.random() * 100) + 1;
  console.log('🎲 Random number:', random);

  // Calculate and log probability ranges
  let rangeStart = 1;
  console.log('\nPrize Ranges:');
  sortedPrizes.forEach(prize => {
    const rangeEnd = rangeStart + prize.probability - 1;
    console.log(`${prize.rarity.toUpperCase()}: ${prize.name} (${rangeStart}-${rangeEnd}) - ${prize.probability}%`);
    rangeStart += prize.probability;
  });

  // Select prize based on random number
  let currentRange = 0;
  for (const prize of sortedPrizes) {
    currentRange += prize.probability;
    if (random <= currentRange) {
      console.log(`\n🎯 Selected: ${prize.rarity.toUpperCase()} - ${prize.name} ($${prize.value} USDC)`);
      return prize;
    }
  }

  // Fallback (shouldn't happen)
  console.error('⚠️ Prize selection failed - using fallback');
  return sortedPrizes[0];
} 