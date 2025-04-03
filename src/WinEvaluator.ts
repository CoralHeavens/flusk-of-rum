import { WinningLine } from "./WinningLine";

export class WinEvaluator {
  private winningLines: WinningLine[];

  constructor() {
    this.winningLines = [
      new WinningLine("line1", [ {reel: 0, row: 1}, {reel: 1, row: 1}, {reel: 2, row: 1}, {reel: 3, row: 1}, {reel: 4, row: 1} ]),
      new WinningLine("line2", [ {reel: 0, row: 0}, {reel: 1, row: 0}, {reel: 2, row: 0}, {reel: 3, row: 0}, {reel: 4, row: 0} ]),
      new WinningLine("line3", [ {reel: 0, row: 2}, {reel: 1, row: 2}, {reel: 2, row: 2}, {reel: 3, row: 2}, {reel: 4, row: 2} ]),
      new WinningLine("line4", [ {reel: 0, row: 0}, {reel: 1, row: 1}, {reel: 2, row: 2}, {reel: 3, row: 1}, {reel: 4, row: 0} ]),
      new WinningLine("line5", [ {reel: 0, row: 2}, {reel: 1, row: 1}, {reel: 2, row: 0}, {reel: 3, row: 1}, {reel: 4, row: 2} ]),
      new WinningLine("line6", [ {reel: 0, row: 1}, {reel: 1, row: 2}, {reel: 2, row: 2}, {reel: 3, row: 2}, {reel: 4, row: 1} ]),
      new WinningLine("line7", [ {reel: 0, row: 1}, {reel: 1, row: 0}, {reel: 2, row: 0}, {reel: 3, row: 0}, {reel: 4, row: 1} ]),
      new WinningLine("line8", [ {reel: 0, row: 2}, {reel: 1, row: 2}, {reel: 2, row: 1}, {reel: 3, row: 0}, {reel: 4, row: 0} ]),
      new WinningLine("line9", [ {reel: 0, row: 0}, {reel: 1, row: 0}, {reel: 2, row: 1}, {reel: 3, row: 2}, {reel: 4, row: 2} ])
    ];
  }

  public evaluateWinningLines(reels: string[][]): WinningLine[] {
    const winningLines: WinningLine[] = [];
    for (const line of this.winningLines) {
      const symbolsOnLine = line.positions.map(pos => reels[pos.reel][pos.row]);
      const firstSymbol = symbolsOnLine[0];
      if (symbolsOnLine.every(symbol => symbol === firstSymbol)) {
        winningLines.push(line);
      }
    }
    return winningLines;
  }
}