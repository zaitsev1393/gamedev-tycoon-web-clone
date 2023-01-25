import { Observer } from "./helpers/observable.js";
import { onTick, pauseGame, startGame } from "./services/timer.js";
import { closeBuilder, startDevelopment } from "./services/game-builder.js";
import { log, runAsync } from "./helpers/helpers.js";

const gameFlow = new Observer();
onTick.subscribe(gameFlow);

runAsync(() => {
  // document.querySelector("#pause").addEventListener('click', () => startDevelopment());
  // document.querySelector("#continue").addEventListener('click', () => startGame());
})

