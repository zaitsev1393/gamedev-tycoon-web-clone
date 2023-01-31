import { createElement, frame, log } from "../../helpers/helpers.js";
import { POINT } from "../../shared/point-types.js";
import { createScore } from "../score-bubble/score-bubble.js"

export const createStatusBarComponent = (gameData) => {
  const _frame = frame();
  const statusBar = createElement("div", { classes: ["status-bar"] });
  
  _frame.appendChild(statusBar);

  const techBubble = createScore({ id: POINT.TECHNICAL }).node;
  const designBubble = createScore({ id: POINT.DESIGN }).node;
  const bugBubble = createScore({ id: POINT.BUG }).node;
  const nameContainer = createElement("div", { classes: ["name"], html: gameData.name });
  const bubblesContainer = createElement("div", { classes: ["bubbles-container"] });

  bubblesContainer.appendChild(bugBubble);
  bubblesContainer.appendChild(techBubble);
  bubblesContainer.appendChild(designBubble);
  statusBar.appendChild(nameContainer);
  statusBar.appendChild(bubblesContainer);

  const updateValue = (element, value) => element.innerHTML = parseInt(element.innerHTML) + value;
  return {
    node: statusBar,
    bubbles: {
      techBubble,
      designBubble,
      bugBubble
    },
    counters: {
      [POINT.TECHNICAL]: {
        update: (value) => updateValue(techBubble.querySelector(`#${ POINT.TECHNICAL }-value`), value)
      },
      [POINT.DESIGN]: {
        update: (value) => updateValue(designBubble.querySelector(`#${ POINT.DESIGN }-value`), value),
      },
      [POINT.BUG]: {
        update: (value) => updateValue(bugBubble.querySelector(`#${ POINT.BUG }-value`), value),
      },
    },
    nameContainer
  }
}