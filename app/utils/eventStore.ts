import { EventEmitter } from 'events';

interface PrizeResult {
  success: boolean;
  prize: {
    name: string;
    value: number;
    rarity: string;
  };
  txHash: string;
}

const eventEmitter = new EventEmitter();

export function emitPrizeResult(result: PrizeResult) {
  console.log('🎲 Emitting prize result:', result);
  eventEmitter.emit('prizeResult', result);
}

export function onPrizeResult(callback: (result: PrizeResult) => void) {
  eventEmitter.on('prizeResult', callback);
  return () => eventEmitter.off('prizeResult', callback);
} 