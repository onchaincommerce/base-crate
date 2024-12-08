// Simple in-memory store for processed transactions
const processedTransactions = new Set<string>();

export function isTransactionProcessed(chargeId: string): boolean {
  return processedTransactions.has(chargeId);
}

export function markTransactionProcessed(chargeId: string): void {
  processedTransactions.add(chargeId);
} 