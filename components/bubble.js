// Contstants
const BUBBLE_POPPING_TIME = 1000;
const TRANSITION_TIME = 300;
const COLORS = {
  TECHNICAL: "#0094C6",
  DESIGN: "#F15946"
}

// Helpers
const randomValue = (obj) => obj[getRandomElement(Object.keys(obj))];
const getRandomElement = (arr) => arr[rand(arr.length)];
const rand = (multi) => Math.ceil(Math.random() * multi);

const createScore = (initialValue) => {
  let scoreContainer = document.createElement("div");
  scoreContainer.style['font-size'] = '20px';
  const title = document.createElement("span");
  title.innerHTML = "Score: ";
  const score = document.createElement("span");
  score.innerHTML = initialValue
  scoreContainer.append(title, score);
  document.body.appendChild(scoreContainer)
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

const createBubble = (value = 1, color = COLORS.TECHNICAL, ) => {
  const bubble = document.createElement("div");
  bubble.classList.add("bubble");
  bubble.style = `
    --animheight: 75px; 
    background: ${ color };
  `;
  bubble.innerHTML = value;
  document.body.append(bubble);
  return bubble;
}

const popBubble = ({ 
  value,
  coords
}) => {
  const bubble = createBubble(value);
  const { x, y } = coords;
  bubble.style.top = y + 'px';
  bubble.style.left = x + 'px';
  bubble.classList.add("popping");
  bubble.style.top = '75px';
  setTimeout(() => {
    moveBubble(bubble);
  }, BUBBLE_POPPING_TIME + 50);
}

const moveBubble = (bubble, coords = { x: window.innerWidth / 2, y: 150 }) => {
  bubble.classList.remove('popping');
  const { x: left, y: top } = coords;
  bubble.style.top = top + "px";
  bubble.style.left = left + "px";
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