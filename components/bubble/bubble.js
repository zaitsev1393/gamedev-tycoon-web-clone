import { 
  setStyle, 
  frame, 
  pixelize, 
  rand,
  log
} from "../../helpers/helpers.js";
import { COLORS } from "../../shared/colors.js";


// Contstants
const BUBBLE_POPPING_TIME = 1000;
const BUBBLE_TRANSITION_TIME = 300;
export const BUBBLE_TRANSITION_FINISHING_TIME = BUBBLE_POPPING_TIME + BUBBLE_TRANSITION_TIME;

const DEFAULT_BUBBLE_STYLING = {
  width: '20px',
  height: '20px'
}

const BUBBLES_ACCUMULATOR = {
  top: frame().getBoundingClientRect().top + 10 + "px",
  left: frame().getBoundingClientRect().left + (frame().getBoundingClientRect().width / 2)  + "px"
}

export const generateBubbles = () => {
  const bubblesNumber = document.getElementById("bubbles-input").value;
  testBubbles(bubblesNumber)
}

const createBubble = ({ points, type }, styles) => {
  const bubble = document.createElement("div");
  bubble.classList.add("bubble");
  setStyle(bubble, { 
    ...styles, 
    width: pixelize(15 + points * 4),
    height: pixelize(15 + points * 4),
    "font-size": pixelize(10 + points * 2) 
  });
  bubble.innerHTML = points;
  bubble.dataset.type = type;
  document.body.append(bubble);
  return bubble;
}

export const popBubble = async ({ value, originNode }) => {
  return new Promise((resolve) => {
    const { top, left, width } = originNode.getBoundingClientRect();
    const styles = { 
      background: COLORS[value.type], 
      top: top - (parseInt(DEFAULT_BUBBLE_STYLING.width) / 2) + "px", 
      left: left + (width / 2) - (parseInt(DEFAULT_BUBBLE_STYLING.width) / 2) + "px",
    };
    const bubble = createBubble(value, styles);
    setTimeout(() => bubble.style.top = top - 40 + 'px', 300);
    setTimeout(() => bubble.style.top = top - 45 + 'px', 400);
    setTimeout(() => bubble.style.top = top - 25 + 'px', 700);
    setTimeout(() => bubble.style.top = top - 45 + 'px', 1000);
    setTimeout(() => moveBubble(bubble), BUBBLE_POPPING_TIME + 50);
    setTimeout(() => {
      destroyBubble(bubble);
      resolve(value);
    }, BUBBLE_POPPING_TIME + BUBBLE_TRANSITION_TIME);
  });
}

const destroyBubble = (bubble) => bubble.remove();

const moveBubble = (bubble) => {
  const { top, left } = 
    document
      .querySelector(`#${ bubble.dataset['type'] }-value`)
      .getBoundingClientRect();

  bubble.classList.remove('popping');
  setStyle(bubble, { top: pixelize(top), left: pixelize(left - bubble.width / 2) });
}