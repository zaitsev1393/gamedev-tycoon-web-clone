
import { createPlayerCard } from "./components/player/player.js";
import { runAsync } from "./helpers/helpers.js";
import { initDevs } from "./models/player.js";
import { pauseGame, startGame } from "./services/timer.js";

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

