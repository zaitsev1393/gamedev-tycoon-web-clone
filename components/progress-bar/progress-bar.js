import { setStyle, frame, log, createElement, runAsync } from "../../helpers/helpers.js";
import { SMALL_GAME_TIME } from "../../services/timer.js";

const PROGRESS_STEPS = 100;

export const createProgressBar = (time) => {
  return new Promise((resolve, reject) => {
    const progressBarContainer = createElement('div');
    const progressBarContainerStyle = {
      width: "75%",
      height: "10px",
      border: "1px solid black",
      position: "relative",
      left: "50%",
      transform: "translateX(-50%)"
    }
    const progressBar = createElement("div");
    const progressBarStyle = {
      width: 0,
      height: "10px",
      background: "crimson"
    }
    
    setStyle(progressBarContainer, progressBarContainerStyle);
    setStyle(progressBar, progressBarStyle);
    progressBarContainer.append(progressBar);
    frame().append(progressBarContainer);
    // runAsync(() => progressBar.style.width = "100%");
    let interval = null;
    let developmentProgress = { progress: 0, gameState: interval, progressBar };
    startProgressBar(developmentProgress);
    
    resolve({
      pause: () => pauseProgressBar(developmentProgress),
      continue: () => startProgressBar(developmentProgress)
    });
  })
}

const startProgressBar = (development) => {
  development.interval = setInterval(() => {
    development.progress += Math.floor(100 / PROGRESS_STEPS);
    if(development.progress >= 100) {
      pauseProgressBar(development);
    }
    development.progressBar.style.width = development.progress + "%";
  }, SMALL_GAME_TIME / PROGRESS_STEPS);
}

const pauseProgressBar = (development) => {
  clearInterval(development.interval);
};

