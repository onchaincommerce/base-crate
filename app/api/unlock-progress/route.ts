import { NextResponse } from 'next/server';
import { purchaseTracker } from '../../utils/purchaseTracker';

export async function GET() {
  return NextResponse.json({
    standardPurchases: purchaseTracker.getStandardPurchaseCount(),
    isPremiumUnlocked: purchaseTracker.isPremiumUnlocked(),
    progressPercentage: purchaseTracker.getProgressToUnlock()
  });
} 