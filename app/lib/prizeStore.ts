// Create a new file for prize storage
export class PrizeStore {
  private static instance: PrizeStore;
  private prizes: Map<string, any>;

  private constructor() {
    this.prizes = new Map();
  }

  public static getInstance(): PrizeStore {
    if (!PrizeStore.instance) {
      PrizeStore.instance = new PrizeStore();
    }
    return PrizeStore.instance;
  }

  public setPrize(chargeId: string, data: any) {
    this.prizes.set(chargeId, data);
    console.log(`Prize stored for charge ${chargeId}:`, data);
  }

  public getPrize(chargeId: string) {
    return this.prizes.get(chargeId);
  }
} 