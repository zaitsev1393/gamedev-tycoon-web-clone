import { createStatusBarComponent } from "../components/game-development-status/game-development-status.js"
import { log, updateInnerHTML } from "../helpers/helpers.js";
import { POINT } from "../shared/point-types.js";

export const createStatusBar = (gameData) => {
  const statusBar = createStatusBarComponent(gameData);
  const update = ({ type, value }) => {
    const cbs = {
      [POINT.TECHNICAL]: () => statusBar.counters[POINT.TECHNICAL].update(value),
      [POINT.DESIGN]: () => statusBar.counters[POINT.DESIGN].update(value),
      [POINT.BUG]: () => statusBar.counters[POINT.BUG].update(value)
    }
    if(type in cbs) {
      cbs[type]();
    }
  }

  const destroy = () => {
    log("Destroying status bar");
    document.body.removeChild(statusBar.node);
  };

  return {
    coords: {
      techBubble: statusBar.bubbles.techBubble.getBoundingClientRect(),
      designBubble: statusBar.bubbles.designBubble.getBoundingClientRect(),
      bugBubble: statusBar.bubbles.bugBubble.getBoundingClientRect()
    },
    update,
    destroy
  }
}