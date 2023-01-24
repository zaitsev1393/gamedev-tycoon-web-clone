import { Observer } from "./helpers/observable.js";
import { onTick } from "./services/timer.js";
import { closeBuilder } from "./services/game-builder.js";
import { log } from "./helpers/helpers.js";

const gameFlow = new Observer();
onTick.subscribe(gameFlow);

const close = () => {
  log("click");
  closeBuilder()
};

function pickGenre(event) {
  log("picked: ", event);
}
