import { audioManager } from "./AudioManager";
import { SlotMachine } from "./SlotMachine";

export class Game {
  private container: HTMLElement;
  private slotMachine!: SlotMachine;
  private betOptions: number[] = [0.5, 1, 2, 5, 10, 20];
  private autoMode: boolean = false;
  private running: boolean = false;

  // Settings
  private credit: number = 2000;
  private bet: number = 10;
  private autoTimeout: number = 4000;

  constructor(containerId: string) {
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error(`Container with id ${containerId} not found`);
    }
    this.container = container;
    this.init();
  }

  private init() {
    this.renderUI();
    this.slotMachine = new SlotMachine(this.onSpinEnd.bind(this));
  }

  private renderUI() {
    const controlsDiv = document.getElementById("controls");
    if (controlsDiv) {
      const betValueSpan = document.getElementById("bet-value");
      const betMinusBtn = document.getElementById("bet-minus");
      const betPlusBtn = document.getElementById("bet-plus");
      const betMaxBtn = document.getElementById("bet-max");
      const spinButton = document.getElementById("spin-button");
      const autoButton = document.getElementById("auto-button");

      if (betMinusBtn && betValueSpan && betPlusBtn && betMaxBtn && spinButton) {
        betMinusBtn.addEventListener("click", () => {
          this.decreaseBet();
          betValueSpan.innerText = this.bet.toString();
        });

        betPlusBtn.addEventListener("click", () => {
          this.increaseBet();
          betValueSpan.innerText = this.bet.toString();
        });

        betMaxBtn.addEventListener("click", () => {
          this.bet = Math.max(...this.betOptions);
          betValueSpan.innerText = this.bet.toString();
        });

        spinButton.addEventListener("click", () => {
          if (this.running) return;
          this.startSpin();
        });
      }

      if (autoButton) {
        autoButton.addEventListener("click", () => {
          audioManager.playSound("click");

          if (this.autoMode) {
            this.autoMode = false;
            return;
          }

          if (this.running && !this.autoMode) return;

          this.autoMode = true;

          const autoSpin = () => {
            if (!this.autoMode) return;

            if (this.credit >= this.bet) {
              this.startSpin();
              setTimeout(autoSpin, this.autoTimeout);
            } else {
              alert("Not enough credit!");
            }
          };
          autoSpin();
        });
      }
    }
  }

  private decreaseBet() {
    const currentIndex = this.betOptions.indexOf(this.bet);
    if (currentIndex > 0) {
      audioManager.playSound("click");
      this.bet = this.betOptions[currentIndex - 1];
    }
  }
  
  private increaseBet() {
    const currentIndex = this.betOptions.indexOf(this.bet);
    if (currentIndex >= 0 && currentIndex < this.betOptions.length - 1) {
      audioManager.playSound("click");
      this.bet = this.betOptions[currentIndex + 1];
    }
  }

  private startSpin() {
    if (this.credit < this.bet) {
      alert("Not enough credit!");
      return;
    }

    this.running = true;

    audioManager.playSound("click");
    audioManager.playSound("spin");

    this.credit -= this.bet;
    this.updateCreditDisplay();
    this.slotMachine.spin(this.bet);
  }

  private onSpinEnd(winAmount: number) {
    this.credit += winAmount;
    this.updateCreditDisplay();

    audioManager.stopSound("spin");

    if (!this.autoMode) {
      this.running = false;
    }

    if (winAmount <= 0) return;
    
    audioManager.playSound("win");

    if (this.autoMode) {
      this.autoMode = false;
      this.running = false;
      alert("You won! Auto-spin stopped.");
    }
  }

  private updateCreditDisplay() {
    const creditDisplay = document.getElementById("credit-value");
    if (creditDisplay) {
      creditDisplay.innerText = `${this.credit}`;
    }
  }
}
