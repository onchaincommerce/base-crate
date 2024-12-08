// Simple in-memory store for purchase counts
let standardPurchaseCount = 0;
const PREMIUM_UNLOCK_THRESHOLD = 100;

export const purchaseTracker = {
  incrementStandardPurchases: () => {
    standardPurchaseCount++;
    return standardPurchaseCount;
  },
  getStandardPurchaseCount: () => standardPurchaseCount,
  isPremiumUnlocked: () => standardPurchaseCount >= PREMIUM_UNLOCK_THRESHOLD,
  getProgressToUnlock: () => (standardPurchaseCount / PREMIUM_UNLOCK_THRESHOLD) * 100
}; 