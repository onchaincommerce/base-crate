import { NextResponse } from 'next/server';
import { getPrize, clearPrize } from '../../utils/prizeStore';

export async function GET(req: Request) {
  // In production, get userId from session/auth
  const userId = 'test-user';
  
  const prize = getPrize(userId);
  if (prize) {
    clearPrize(userId); // Clear after retrieving
    return NextResponse.json(prize);
  }
  
  return NextResponse.json({ status: 'waiting' });
} 