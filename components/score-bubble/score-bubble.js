import { createElement } from "../../helpers/helpers.js";
import { COLORS } from "../../shared/colors.js";

export const createScore = ({ id }) => {
  let value = 0;
  const html = `
    <span id = "${ id }-value">
      ${ value }
    </span>
  `;

  const node = createElement("div", { 
    style: `background: ${ COLORS[id] }`,
    classes: ['score-bubble'],
    id: `${ id }-bubble`,
    html
  });
  

  return {
    node,
    update: (newValue) => {
      value += +newValue;
      document.getElementById(`${ id }-value`).innerHTML = value;
    },
    destroy: () => {}
  }
}