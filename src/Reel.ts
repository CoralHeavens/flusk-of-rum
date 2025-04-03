import { SYMBOLS } from "./Symbol";

export class Reel {
  private numRows: number;
  private symbolsPool: string[];

  constructor(numRows: number) {
    this.numRows = numRows;
    this.symbolsPool = [];
    for (const symbol in SYMBOLS) {
      const frequency = SYMBOLS[symbol].frequency;
      for (let i = 0; i < frequency; i++) {
        this.symbolsPool.push(symbol);
      }
    }
  }

  public spin(): string[] {
    const result: string[] = [];
    for (let i = 0; i < this.numRows; i++) {
      const randomIndex = Math.floor(Math.random() * this.symbolsPool.length);
      result.push(this.symbolsPool[randomIndex]);
    }
    return result;
  }
}
