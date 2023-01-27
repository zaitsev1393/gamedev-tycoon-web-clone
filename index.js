import { Observer } from "./helpers/observable.js";
import { onTick, pauseGame, startGame } from "./services/timer.js";
import { closeBuilder, startDevelopment } from "./services/game-builder.js";
import { log, runAsync } from "./helpers/helpers.js";
import { BACKGROUND, Player } from "../models/player.js";

function main() {
  const timerSubscription = onTick.subscribe((info) => {});

  createMainPlayer();
}

const createMainPlayer = () =>
  new Player({
    background: BACKGROUND.SELF_TAUGHT_CODER,
    coords: {
      top: '100px',
      left: '200px'
    }
  })

main();

