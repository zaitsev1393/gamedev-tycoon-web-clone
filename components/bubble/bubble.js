import { entriesIntoStyles, frame, runAsync } from "../../helpers/helpers.js";

// Contstants
const BUBBLE_POPPING_TIME = 1000;
const TRANSITION_TIME = 300;
const COLORS = {
  TECHNICAL: "#0094C6",
  DESIGN: "#F15946"
}


const BUBBLES_ACCUMULATOR = {
  top: frame().getBoundingClientRect().top + 10 + "px",
  left: frame().getBoundingClientRect().left + (frame().getBoundingClientRect().width / 2)  + "px"
}

// Helpers
const randomValue = (obj) => obj[getRandomElement(Object.keys(obj))];
const getRandomElement = (arr) => arr[rand(arr.length)];
const rand = (multi) => Math.ceil(Math.random() * multi);

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
      setTimeout(() => 
        score.innerHTML = +score.innerHTML + value, BUBBLE_POPPING_TIME + TRANSITION_TIME
      )
  }
}

export const generateBubbles = () => {
  const bubblesNumber = document.getElementById("bubbles-input").value;
  testBubbles(bubblesNumber)
}

const createBubble = (value = 1, styles) => {
  const bubble = document.createElement("div");
  bubble.classList.add("bubble");
  entriesIntoStyles(bubble, styles);
  bubble.innerHTML = value;
  document.body.append(bubble);
  return bubble;
}

const popBubble = ({ 
  value,
  originNode
}) => {
  const { top, left } = originNode.getBoundingClientRect();
  const styles = { background: COLORS.TECHNICAL, top: top + "px", left: left + "px" };
  const bubble = createBubble(value, styles);
  bubble.classList.add("popping");
  setTimeout(() => {
    moveBubble(bubble);
  }, BUBBLE_POPPING_TIME + 50);
}

const moveBubble = (
  bubble, 
  coords = BUBBLES_ACCUMULATOR
) => {
    bubble.classList.remove('popping');
    entriesIntoStyles(bubble, coords);
  }

const score = createScore(0);

// Testing
const testBubbles = (number) => {
  while(number > 0) {
    setTimeout(() => {
      const value = rand(5);
      popBubble({ 
        value,
        coords: {
          x: rand(600),
          y: rand(200)
        }
      })
      score.add(value);
    }, rand(2000))
    --number;
  }
}

const testPlayerBubbles = (number) => {
  const player = document.getElementsByClassName("player")[0] || {};
  console.log("player: ", player);
  while(number > 0) {
    const value = rand(5);
    setTimeout(() => popBubble({ value, originNode: player }), rand(2000));
    number--;
  }
}


runAsync(() => testPlayerBubbles(5));