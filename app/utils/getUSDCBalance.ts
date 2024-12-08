import { formatUnits } from 'viem';

const USDC_CONTRACT = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';
const PREMIUM_UNLOCK_THRESHOLD = 2000; // $2,000 USDC
const WALLET_ADDRESS = '0xc17c78C007FC5C01d796a30334fa12b025426652';

export async function getUSDCBalance(address: string = WALLET_ADDRESS) {
  const API_KEY = '5WHSRBCW55F172YJPIZQVV4RN6GTDYAXFP';
  console.log('Using API Key:', API_KEY.slice(0, 5) + '...');

  const url = `https://api.basescan.org/api` +
    `?module=account` +
    `&action=tokenbalance` +
    `&contractaddress=${USDC_CONTRACT}` +
    `&address=${address}` +
    `&tag=latest` +
    `&apikey=${API_KEY}`;

  console.log('Fetching balance from URL:', url);

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log('Raw API Response:', data);

    if (data.status === '1' && data.result) {
      // Convert from wei to USDC (6 decimals)
      const rawBalance = data.result;
      const balanceInUSDC = parseFloat((Number(rawBalance) / 1e6).toFixed(2));
      
      console.log('Raw balance:', rawBalance);
      console.log('Calculated USDC balance:', balanceInUSDC);
      
      return balanceInUSDC;
    }

    console.warn('Invalid API response:', data);
    return 0;
  } catch (error) {
    console.error('Error fetching USDC balance:', error);
    return 0;
  }
}

export function isPremiumUnlocked(balance: number) {
  return balance >= PREMIUM_UNLOCK_THRESHOLD;
}

export function getProgressToUnlock(balance: number) {
  return Math.min((balance / PREMIUM_UNLOCK_THRESHOLD) * 100, 100);
} 