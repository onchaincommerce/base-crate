import { Prize, Prices } from '../types/prizes';

export const STANDARD_PRIZES: Prize[] = [
  {
    id: 'basic',
    name: '$0.40 Prize',
    value: 0.40,
    probability: 65,
    rarity: 'common',
    color: '#4A5568'
  },
  {
    id: 'small',
    name: '$0.80 Prize',
    value: 0.80,
    probability: 20,
    rarity: 'uncommon',
    color: '#48BB78'
  },
  {
    id: 'medium',
    name: '$1.50 Prize',
    value: 1.50,
    probability: 10,
    rarity: 'rare',
    color: '#4299E1'
  },
  {
    id: 'large',
    name: '$4.00 Prize',
    value: 4.00,
    probability: 4,
    rarity: 'epic',
    color: '#9F7AEA'
  },
  {
    id: 'jackpot',
    name: '$10.00 Prize',
    value: 10.00,
    probability: 1,
    rarity: 'legendary',
    color: '#F6E05E'
  }
];

export const PREMIUM_PRIZES: Prize[] = [
  {
    id: 'premium_basic',
    name: '$4.00 Prize',
    value: 4.00,
    probability: 65,
    rarity: 'common',
    color: '#4A5568'
  },
  {
    id: 'premium_small',
    name: '$8.00 Prize',
    value: 8.00,
    probability: 20,
    rarity: 'uncommon',
    color: '#48BB78'
  },
  {
    id: 'premium_medium',
    name: '$17.00 Prize',
    value: 17.00,
    probability: 10,
    rarity: 'rare',
    color: '#4299E1'
  },
  {
    id: 'premium_large',
    name: '$30.00 Prize',
    value: 30.00,
    probability: 4,
    rarity: 'epic',
    color: '#9F7AEA'
  },
  {
    id: 'premium_jackpot',
    name: '$140.00 Prize',
    value: 140.00,
    probability: 1,
    rarity: 'legendary',
    color: '#F6E05E'
  }
];

export const PRICES: Prices = {
  standard: {
    display: 1.00,
    actual: 1.00
  },
  premium: {
    display: 10.00,
    actual: 10.00
  }
};

export const PRODUCT_IDS = {
  standard: process.env.NEXT_PUBLIC_STANDARD_PRODUCT_ID || '102348b6-17fc-42b1-a28b-4cdbe62c5985',
  premium: process.env.NEXT_PUBLIC_PREMIUM_PRODUCT_ID || '329ed307-d24b-4e51-8669-5ddc3afe48e7'
}; 