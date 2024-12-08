type Listener = (data: any) => void;
const listeners = new Set<Listener>();

export function emitPrize(prizeData: any) {
  console.log('🎲 Broadcasting prize:', prizeData);
  listeners.forEach(listener => listener(prizeData));
}

export function onPrize(callback: Listener) {
  listeners.add(callback);
  return () => listeners.delete(callback);
} 