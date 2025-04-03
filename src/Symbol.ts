export interface SymbolData {
  source: string;
  winFactor: number[];
}

export interface SymbolConfig {
  frequency: number;
  data: SymbolData;
}

export const SYMBOLS: { [key: string]: SymbolConfig } = {
  "rum": {
    frequency: 1,
    data: {
      source: "assets/SymbolRum.png",
      winFactor: [1, 20, 200]
    }
  },
  "ten": {
    frequency: 5,
    data: {
      source: "assets/Symbol10.png",
      winFactor: [1, 5, 20]
    }
  },
  "J": {
    frequency: 5,
    data: {
      source: "assets/SymbolJ.png",
      winFactor: [1, 5, 20]
    }
  },
  "Q": {
    frequency: 5,
    data: {
      source: "assets/SymbolQ.png",
      winFactor: [1, 5, 20]
    }
  },
  "K": {
    frequency: 4,
    data: {
      source: "assets/SymbolK.png",
      winFactor: [1, 8, 30]
    }
  },
  "A": {
    frequency: 4,
    data: {
      source: "assets/SymbolA.png",
      winFactor: [1, 8, 30]
    }
  },
  "parrot": {
    frequency: 3,
    data: {
      source: "assets/SymbolParrot.png",
      winFactor: [6, 20, 150]
    }
  },
  "skull": {
    frequency: 3,
    data: {
      source: "assets/SymbolSkull.png",
      winFactor: [6, 20, 150]
    }
  },
  "treasure": {
    frequency: 2,
    data: {
      source: "assets/SymbolTreasure.png",
      winFactor: [8, 80, 400]
    }
  },
  "captain": {
    frequency: 1,
    data: {
      source: "assets/SymbolCaptain.png",
      winFactor: [20, 200, 1000]
    }
  }
};
