import { WINNING_LINES, WinningLine } from "../WinningLine";

export function drawWinningLine(line: WinningLine) {
  const container = document.getElementById('slot-machine');
  if (!container) return;

  const winningLineData = WINNING_LINES[line.id];
  if (!winningLineData) return;

  const lineDiv = document.createElement('div');
  lineDiv.className = 'winning-line';

  const img = document.createElement('img');
  img.src = winningLineData.source;

  lineDiv.appendChild(img);
  container.appendChild(lineDiv);
}

export function clearWinningLines() {
  const container = document.getElementById('slot-machine');
  if (container) {
    const oldLines = container.querySelectorAll('.winning-line');
    oldLines.forEach(line => line.remove());
  }
}
