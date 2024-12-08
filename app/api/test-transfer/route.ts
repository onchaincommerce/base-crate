import { NextResponse } from 'next/server';
import { transferUSDC } from '../../utils/usdcTransfer';

export async function POST(req: Request) {
  try {
    const { address, amount } = await req.json();
    
    console.log('Testing USDC transfer:', {
      to: address,
      amount: amount,
      timestamp: new Date().toISOString()
    });

    const tx = await transferUSDC(address, amount);
    
    return NextResponse.json({
      success: true,
      hash: tx.hash,
      to: address,
      amount: amount
    });
  } catch (error) {
    console.error('Test transfer failed:', error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
} 