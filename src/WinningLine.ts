export interface Position {
  reel: number;
  row: number;
}

export class WinningLine {
  public id: string;
  public positions: Position[];

  constructor(id: string, positions: Position[]) {
    this.id = id;
    this.positions = positions;
  }
}

export interface WinningLineData {
  source: string;
}

export const WINNING_LINES: { [key: string]: WinningLineData } = {
  line1: {
    source: "assets/Line1.png",
  },
  line2: {
    source: "assets/Line2.png",
  },
  line3: {
    source: "assets/Line3.png",
  },
  line4: {
    source: "assets/Line4.png",
  },
  line5: {
    source: "assets/Line5.png",
  },
  line6: {
    source: "assets/Line6.png",
  },
  line7: {
    source: "assets/Line7.png",
  },
  line8: {
    source: "assets/Line8.png",
  },
  line9: {
    source: "assets/Line9.png",
  }
};
