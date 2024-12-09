import { NextResponse } from 'next/server';
import { storePrize } from '../../utils/prizeStore';
import { selectRandomPrize } from '../../utils/prizeSelection';
import { STANDARD_PRIZES, PREMIUM_PRIZES } from '../../constants/prizes';
import { transferUSDC } from '../../utils/usdcTransfer';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log('📦 Webhook received:', data);

    // Verify it's a charge:pending event
    if (data.event.type === 'charge:pending') {
      // Get payer's wallet address
      const payerAddress = data.event.data.payments?.[0]?.payer_addresses?.[0];
      if (!payerAddress) {
        throw new Error('No payer address found');
      }

      // Select prize based on crate type
      const isStandard = data.event.data.pricing.local.amount === '1.00';
      const prizes = isStandard ? STANDARD_PRIZES : PREMIUM_PRIZES;
      const selectedPrize = selectRandomPrize(prizes);

      // Send USDC prize to player
      const tx = await transferUSDC(payerAddress, selectedPrize.value);
      console.log('💰 Prize sent:', selectedPrize.value, 'USDC to', payerAddress);

      // Store result for frontend
      storePrize('test-user', {
        prize: selectedPrize,
        txHash: tx.hash
      });

      console.log('🎲 Transaction:', tx.hash);
      return NextResponse.json({ status: 'success' });
    }

    return NextResponse.json({ status: 'ignored' });
  } catch (error) {
    console.error('❌ Webhook error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 