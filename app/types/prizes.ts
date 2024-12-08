export type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export interface Prize {
  id: string;
  name: string;
  value: number;
  probability: number;
  rarity: Rarity;
  color: string;
}

export interface CratePrice {
  display: number;
  actual: number;
}

export interface Prices {
  standard: CratePrice;
  premium: CratePrice;
} 