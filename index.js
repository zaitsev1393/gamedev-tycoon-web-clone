import { Observer } from "./helpers/observable.js";
import { onTick } from "./services/timer.js";

const gameFlow = new Observer();
onTick.subscribe(gameFlow);