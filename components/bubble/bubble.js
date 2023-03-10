import { 
  setStyle, 
  frame, 
  pixelize, 
  rand
} from "../../helpers/helpers.js";


// Contstants
const BUBBLE_POPPING_TIME = 1000;
const BUBBLE_TRANSITION_TIME = 300;
const COLORS = {
  technical: "#0094C6",
  design: "orange",
  bug: "crimson"
}

const DEFAULT_BUBBLE_STYLING = {
  width: '20px',
  height: '20px'
}

const BUBBLES_ACCUMULATOR = {
  top: frame().getBoundingClientRect().top + 10 + "px",
  left: frame().getBoundingClientRect().left + (frame().getBoundingClientRect().width / 2)  + "px"
}

const createScore = (initialValue) => {
  let scoreContainer = document.createElement("div");
  scoreContainer.style['font-size'] = '18px';
  scoreContainer.style.margin = "10px";
  const title = document.createElement("span");
  title.innerHTML = "Score: ";
  const score = document.createElement("span");
  score.innerHTML = initialValue
  scoreContainer.append(title, score);
  document.getElementById("frame").appendChild(scoreContainer)
  return {
    add: (value) => 
      setTimeout(() => {
        score.innerHTML = +score.innerHTML + value, BUBBLE_POPPING_TIME + BUBBLE_TRANSITION_TIME;
      })
  }
}

const score = createScore(0);

export const generateBubbles = () => {
  const bubblesNumber = document.getElementById("bubbles-input").value;
  testBubbles(bubblesNumber)
}

const createBubble = (value = 1, styles) => {
  const bubble = document.createElement("div");
  bubble.classList.add("bubble");
  setStyle(bubble, { 
    ...styles, 
    width: pixelize(15 + value * 4),
    height: pixelize(15 + value * 4),
    "font-size": pixelize(10 + value * 2) 
  });
  bubble.innerHTML = value;
  document.body.append(bubble);
  return bubble;
}

export const popBubble = async ({ value, originNode }) => {
  return new Promise((resolve) => {
    const { top, left, width, height } = originNode.getBoundingClientRect();
    const styles = { 
      background: COLORS[value.type], 
      top: top + (height / 2) - (parseInt(DEFAULT_BUBBLE_STYLING.width) / 2) + "px", 
      left: left + (width / 2) - (parseInt(DEFAULT_BUBBLE_STYLING.width) / 2) + "px",
    };
    const bubble = createBubble(value.points, styles);
    setTimeout(() => bubble.style.top = top - 40 + 'px', 300);
    setTimeout(() => bubble.style.top = top - 45 + 'px', 400);
    setTimeout(() => bubble.style.top = top - 25 + 'px', 700);
    setTimeout(() => bubble.style.top = top - 45 + 'px', 1000);
    setTimeout(() => moveBubble(bubble), BUBBLE_POPPING_TIME + 50);
    setTimeout(() => {
      destroyBubble(bubble);
      resolve(value);
    }, BUBBLE_POPPING_TIME + BUBBLE_TRANSITION_TIME + 100);
  });
}

const destroyBubble = (bubble) => bubble.remove();

const moveBubble = (bubble, coords = BUBBLES_ACCUMULATOR) => {
  bubble.classList.remove('popping');
  setStyle(bubble, coords);
}

// Testing
const testPlayerBubbles = (number) => {
  if(number == 0) return;
  const player = document.getElementsByClassName("player")[0] || {};
  const point = rand(5);
  setTimeout(() => {
    popBubble({ 
      value: {
        point,
        type: "technical"
      }, 
      originNode: player 
    })
    testPlayerBubbles(--number);
  }, rand(3000));
}