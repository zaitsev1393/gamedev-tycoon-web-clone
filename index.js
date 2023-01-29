import { initDevs } from "./models/player.js";
import { createStatusBar } from "./services/game-development-status.js";
import { pauseGame, startGame } from "./services/timer.js";
import { POINT } from "./shared/point-types.js";

function main() {
  initDevs();
  listenTestButtons();
}

const listenTestButtons = () => {
  document
    .querySelector("#pause")
    .addEventListener('click', () => {
      pauseGame();
    });

  document
    .querySelector("#continue")
    .addEventListener('click', () => {
      startGame();
    });
}

main();

