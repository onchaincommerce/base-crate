import { NextResponse } from 'next/server';
import { STANDARD_PRIZES, PREMIUM_PRIZES } from '../../constants/prizes';
import { selectRandomPrize } from '../../utils/prizeSelection';
import { transferUSDC } from '../../utils/usdcTransfer';
import { storePrize } from '../../utils/prizeStore';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log('📨 Webhook received:', data.event.type);

    if (data.event.type === 'charge:pending') {
      // In production, get userId from payment metadata
      const userId = 'test-user';
      
      // Process prize
      const isStandard = data.event.data.pricing.local.amount === '1.00';
      const prizes = isStandard ? STANDARD_PRIZES : PREMIUM_PRIZES;
      const selectedPrize = selectRandomPrize(prizes);
      
      // Send USDC
      const payerAddress = data.event.data.payments?.[0]?.payer_addresses?.[0];
      const tx = await transferUSDC(payerAddress, selectedPrize.value);

      // Store the prize result
      const result = {
        prize: {
          name: selectedPrize.name,
          value: selectedPrize.value,
          rarity: selectedPrize.rarity
        },
        txHash: tx.hash
      };

      storePrize(userId, result);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ Webhook error:', error);
    return NextResponse.json({ success: false });
  }
} 