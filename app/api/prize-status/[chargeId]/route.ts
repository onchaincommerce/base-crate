import { NextResponse } from 'next/server';
import { getPrize } from '../../../utils/prizeStore';

export async function GET(
  req: Request,
  { params }: { params: { chargeId: string } }
) {
  const { chargeId } = params;
  console.log('🔍 Checking prize status:', chargeId);

  const result = getPrize(chargeId);
  console.log('📦 Found result:', result);

  if (!result) {
    return NextResponse.json({ status: 'pending' });
  }

  return NextResponse.json(result);
} 