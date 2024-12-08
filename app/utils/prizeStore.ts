interface PrizeResult {
  prize: {
    name: string;
    value: number;
    rarity: string;
  };
  txHash: string;
}

// Server-side store
const prizeStore = new Map<string, PrizeResult>();

export function storePrize(userId: string, result: PrizeResult) {
  console.log('💾 Storing prize for user:', userId, result);
  prizeStore.set(userId, result);
}

export function getPrize(userId: string): PrizeResult | null {
  return prizeStore.get(userId) || null;
}

export function clearPrize(userId: string) {
  prizeStore.delete(userId);
} 