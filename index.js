import { Observer } from "./helpers/observable.js";
import { onTick, pauseGame, startGame } from "./services/timer.js";
import { closeBuilder, startDevelopment } from "./services/game-builder.js";
import { log, runAsync } from "./helpers/helpers.js";

function main() {
  const timerSubscription = onTick.subscribe((info) => {});
}

main();

