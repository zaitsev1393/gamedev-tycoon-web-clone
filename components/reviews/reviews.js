import { getElement, createElement, rand, log, frame } from "../../helpers/helpers.js";
import { createModal } from "../../services/modal.service.js";

const POINTS = 10;
const REVIEW_BAR_TICK = 30;
const REVIEW_BAR_APPERAING_INTERVAL = 3500;

const createVerdictContainer = () => {
  return createElement("div", { 
    html: `
      <span>Verdict:</span>
      <span id = "verdict">6</span>
    `, 
    classes: ["verdict-container"] 
  });
}

const createReviewBar = ({ title, review }) => {
  let html = `
    <div class = "magazine-container">
      <div class = "magazine-title">${ title }</div>
      <div class = "magazine-review">"${ review }"</div>
      <div class = "rating"></div>
    </div>
    <div class = "review-bar"></div>
  `
  return createElement("div", { html, classes: ["review-bar-container"] });
}

const constructReviewBars = (magazines, container) => {
  let reviewBarsContainer = magazines.map(({ title, review, finalRate }) => ({
    finalRate, 
    review,
    node: createReviewBar({ title, review })
  }))

  reviewBarsContainer.forEach(({ node }) => {
    container.appendChild(node);
    const reviewBar = node.querySelector(".review-bar");
    for (let i = 0; i < 10; i++) {
      const step = document.createElement('div');
      reviewBar.appendChild(step);
    }
  });
  return [...reviewBarsContainer].map(({ node, finalRate }) => ({
    reviewBarsContainer: node,
    reviewBar: node.querySelector('.review-bar'),
    finalRate
  }));
}

const activateReviewBars = (reviewBarsInfo) => {
  reviewBarsInfo
    .forEach(({ reviewBarsContainer, reviewBar, finalRate }, i) => {
      setTimeout(() => {
        reviewBarsContainer.classList.add("shown");
        activateReviewBar(reviewBarsContainer, reviewBar, POINTS, finalRate)
      }, i * REVIEW_BAR_APPERAING_INTERVAL || 500);
    })
}

async function activateReviewBar(reviewBarsContainer, reviewBar, limit, finalRate) {
  setTimeout(() => timeToFinish = true, 3000);
  const steps = [ ...reviewBar.children ];
  let timeToFinish = false;
  let finalTimeSet = false;
  const colorStep = Math.ceil(255 / POINTS);
  const updateRatingLabel = (label, rate) => label.innerHTML = `${rate} / ${POINTS}`;
  const growUp = (steps, start, finish) =>
    new Promise((resolve, reject) => {
      
      if (start > 0) {
        for (let i = 1; i <= start; i++) {
          steps[POINTS - i].style.background = `rgba(255,${colorStep * i},100)`;
        }
      }
      let interval = setInterval(() => {
        if (start >= finish) {
          clearInterval(interval);
          if(finalTimeSet) return resolve();
          if(timeToFinish) {
            setFinalRate(steps, finish);
            return resolve();
          }
          const newFinish = rand(finish);
          growDown(steps, finish, newFinish);
          return resolve();
        }
        steps[POINTS - start - 1].style.background = `rgba(255,${
          colorStep * start
        },100)`;
        start += 1;

        updateRatingLabel(reviewBarsContainer.querySelector(".rating"), start);
      }, REVIEW_BAR_TICK);
    });

  const growDown = (steps, start, finish) => {
    return new Promise((resolve, reject) => {
      let counter = start;
      let interval = setInterval(() => {
        if(counter <= finish) {
          clearInterval(interval);
          if(finalTimeSet) return resolve();
          if(timeToFinish) {
            setFinalRate(steps, finish);
            return resolve();
          }
          const newFinish = finish + rand(POINTS - finish);
          growUp(steps, finish, newFinish);
          return resolve();
        }
        steps[POINTS - counter].style.background = null;
        counter -= 1;
        updateRatingLabel(reviewBarsContainer.querySelector(".rating"), counter);
      }, REVIEW_BAR_TICK);
    });
  };

  const setFinalRate = (steps, rate) => {
    log("setting final rate: ", rate);
    if(finalRate > rate) {
      log("finalRate > rate");
      growUp(steps, rate, finalRate);
    } else {
      log("finalRate < rate");
      growDown(steps, rate, finalRate);
    }
    finalTimeSet = true;
  }
  await growUp(steps, 0, rand(POINTS - 1));
};

const createReviewBars = (magazines, container) => 
  activateReviewBars(
    constructReviewBars(magazines, container)
  );

const createReviewWindow = async () => {
  const id = 'game-reviews';
  const reviewContainer = createElement("div", { id });
  const barContainer = createElement("div", { classes: ["reviews-container"] });
  const magazines = [
    { title: "IGN", review: "Fucking shit", finalRate: 8 },
    { title: "Twitter", review: "Amazing", finalRate: 7 },
    { title: "Reddit", review: "FML this is great", finalRate: 6 },
    { title: "Yo mom", review: "How to close this?", finalRate: 9 }
  ]
  createReviewBars(magazines, barContainer);
  reviewContainer.appendChild(barContainer);
  reviewContainer.appendChild(createVerdictContainer());
  frame().appendChild(reviewContainer);
}

export default createReviewWindow;
