import { 
  setStyle, 
  frame, 
  pixelize, 
  player, 
  rand,
  log
} from "../../helpers/helpers.js";
import { DAY } from "../../services/timer.js";
import { createProgressBar } from "../progress-bar/progress-bar.js";


// Contstants
const BUBBLE_POPPING_TIME = 1000;
const BUBBLE_TRANSITION_TIME = 300;
const COLORS = {
  TECHNICAL: "#0094C6",
  DESIGN: "#F15946"
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

const popBubble = ({ value, originNode }) => {
  const { top, left, width, height } = originNode.getBoundingClientRect();
  const styles = { 
    background: COLORS.TECHNICAL, 
    top: top + (height / 2) - (parseInt(DEFAULT_BUBBLE_STYLING.width) / 2) + "px", 
    left: left + (width / 2) - (parseInt(DEFAULT_BUBBLE_STYLING.width) / 2) + "px",
  };
  const bubble = createBubble(value, styles);
  setTimeout(() => bubble.style.top = top - 40 + 'px', 300);
  setTimeout(() => bubble.style.top = top - 45 + 'px', 400);
  setTimeout(() => bubble.style.top = top - 25 + 'px', 700);
  setTimeout(() => bubble.style.top = top - 45 + 'px', 1000);
  setTimeout(() => moveBubble(bubble), BUBBLE_POPPING_TIME + 50);
  setTimeout(() => destroyBubble(bubble), BUBBLE_POPPING_TIME + BUBBLE_TRANSITION_TIME + 100);
  score.add(value);
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
  const value = rand(5);
  setTimeout(() => {
    popBubble({ value, originNode: player })
    testPlayerBubbles(--number);
  }, rand(3000));
}

export const startDevelopment = async (time) => {
  log("Starting development");
  const progressBar = await createProgressBar(time);
  const dayInterval = setInterval(() => time -= DAY, DAY);
  const secondsInterval = setInterval(() => {
    if(time < 0) {
      clearInterval(dayInterval);
      clearInterval(secondsInterval);
      log("Development finished")
      return;
    }
    if(rand(100) > 50) {
      popBubble({ value: rand(5), originNode: player(), progressBar })
    }
  }, 1000);
}

// document.getElementById("produce-button").addEventListener("click", () => {
//   console.log('producing bubble');
//   startDevelopment(10000);
// })

// runAsync(() => {
//   const player = document.getElementsByClassName("player")[0] || {};
//   popBubble({ value: 5, originNode: player })
// });