import { PrizeResult } from '../types/prizes';

type Listener = (data: PrizeResult) => void;
const listeners = new Set<Listener>();

export function emitPrize(prizeData: PrizeResult) {
  console.log('🎲 Broadcasting prize:', prizeData);
  listeners.forEach(listener => listener(prizeData));
}

export function onPrize(callback: Listener) {
  listeners.add(callback);
  return () => listeners.delete(callback);
} 