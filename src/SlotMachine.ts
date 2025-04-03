import { Reel } from "./Reel";
import { WinEvaluator } from "./WinEvaluator";
import { SYMBOLS } from "./Symbol";
import { clearWinningLines, drawWinningLine } from "./helpers/drawWinningLine";

export class SlotMachine {
  private reels: Reel[];
  private onSpinEndCallback: (winAmount: number) => void;

  // Settings
  private numReels: number = 5;
  private numRows: number = 3;
  private symbolHeight: number = 120;
  private randomCycles: number = 2;
  private baseTransitionDuration: number = 2;
  private transitionDurationFactor: number = 0.3;
  private resultTimeout: number = 300;

  constructor(onSpinEnd: (winAmount: number) => void) {
    this.onSpinEndCallback = onSpinEnd;
    this.reels = [];
    for (let i = 0; i < this.numReels; i++) {
      this.reels.push(new Reel(this.numRows));
    }
    this.renderDefaultState();
  }

  public spin(bet: number) {
    const finalResults: string[][] = [];
    for (let reel of this.reels) {
      finalResults.push(reel.spin());
    }
    this.animateReels(finalResults, bet);
  }

  private renderDefaultState() {
    const defaultResults: string[][] = [];
    for (let reel of this.reels) {
      defaultResults.push(reel.spin());
    }
    this.renderReels(defaultResults);
  }

  private renderReels(reelResults: string[][]) {
    const slotMachineDiv = document.getElementById("slot-machine");
    if (!slotMachineDiv) return;
    slotMachineDiv.innerHTML = "";
    reelResults.forEach((symbols, reelIndex) => {
      const reelDiv = document.createElement("div");
      reelDiv.className = "reel";
      const innerDiv = document.createElement("div");
      innerDiv.className = "reel-inner";
      symbols.forEach((symbol, rowIndex) => {
        const symbolDiv = document.createElement("div");
        symbolDiv.className = "symbol";
        symbolDiv.setAttribute("data-reel", reelIndex.toString());
        symbolDiv.setAttribute("data-row", rowIndex.toString());
        symbolDiv.innerHTML = `<img src="${SYMBOLS[symbol].data.source}" alt="${symbol}" />`;
        innerDiv.appendChild(symbolDiv);
      });
      reelDiv.appendChild(innerDiv);
      slotMachineDiv.appendChild(reelDiv);
    });
  }

  private animateReels(finalResults: string[][], bet: number) {
    clearWinningLines();

    const numRows = this.numRows;
    const appendedHeight = (this.randomCycles + (numRows + 1)) * numRows * this.symbolHeight;
  
    const reelElements = document.querySelectorAll('.reel');
    reelElements.forEach((reelElement, index) => {
      const reelInner = reelElement.querySelector('.reel-inner') as HTMLElement;
      if (!reelInner) return;
  
      for (let cycle = 0; cycle < this.randomCycles; cycle++) {
        const randomSymbols = this.reels[index].spin();
        const cycleContainer = document.createElement('div');
        cycleContainer.className = 'random-cycle';
        randomSymbols.forEach((symbol) => {
          const symbolDiv = document.createElement('div');
          symbolDiv.className = 'symbol';
          symbolDiv.innerHTML = `<img src="${SYMBOLS[symbol].data.source}" alt="${symbol}" />`;
          cycleContainer.appendChild(symbolDiv);
        });
        reelInner.prepend(cycleContainer);
      }
      const finalBlock = document.createElement('div');
      finalBlock.className = 'final-result';
      finalResults[index].forEach((symbol) => {
        const symbolDiv = document.createElement('div');
        symbolDiv.className = 'symbol';
        symbolDiv.innerHTML = `<img src="${SYMBOLS[symbol].data.source}" alt="${symbol}" />`;
        finalBlock.appendChild(symbolDiv);
      });
      reelInner.prepend(finalBlock);
  
      const transitionDuration = this.baseTransitionDuration + index * this.transitionDurationFactor;
      reelInner.style.transition = `transform ${transitionDuration}s ease-out`;
      void reelInner.offsetWidth;
      reelInner.style.transform = `translateY(${appendedHeight}px)`;
  
      reelInner.addEventListener('transitionend', () => {
        while (reelInner.children.length > 1) {
          reelInner.removeChild(reelInner.lastChild as Node);
        }
        reelInner.style.transition = '';
        reelInner.style.transform = '';
  
        if (index === finalResults.length - 1) {
          setTimeout(() => {
            const winEvaluator = new WinEvaluator();
            const winningLines = winEvaluator.evaluateWinningLines(finalResults);
            if (winningLines.length > 0) {
              winningLines.forEach(line => {
                drawWinningLine(line);
                line.positions.forEach(pos => {
                  const cell = document.querySelector(`.reel:nth-child(${pos.reel + 1}) .symbol:nth-child(${pos.row + 1})`);
                  if (cell) {
                    cell.classList.add('winning');
                  }
                });
              });
            }
            const winMultiplier = winningLines.reduce((max, line) => {
              const symbol = finalResults[line.positions[0].reel][line.positions[0].row];
              const count = line.positions.length;
              const factors = SYMBOLS[symbol].data.winFactor;
              const multiplier = factors[count - 3] || 0;
              return Math.max(max, multiplier);
            }, 0);
            const winAmount = bet * winMultiplier;
            this.onSpinEndCallback(winAmount);
          }, this.resultTimeout);
        }
      }, { once: true });
    });
  }
}
