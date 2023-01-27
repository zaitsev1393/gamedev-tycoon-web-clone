import { setStyle, frame, log, createElement, runAsync } from "../../helpers/helpers.js";
import { GAME_DEVELOPMENT_TIME } from "../../services/game-development.js";
import { onGamePause, onGameResumed, pauseGame, SMALL_GAME_TIME, startGame } from "../../services/timer.js";

const PROGRESS_STEPS = 300;

const progressBarStyle = {
  width: 0,
  height: "10px",
  background: "crimson"
}

const progressBarContainerStyle = {
  width: "75%",
  height: "10px",
  border: "1px solid black",
  position: "relative",
  left: "50%",
  transform: "translateX(-50%)"
}


export const createProgressBar = (gameData) => {
  return new Promise((resolve, reject) => {
    const progressBarContainer = createElement('div');
    const progressBar = createElement("div");
    let interval = null;
    let developmentProgress = { percentage: 0, gameState: interval, progressBar };
    let state = { ...developmentProgress, ...gameData };
    
    setStyle(progressBarContainer, progressBarContainerStyle);
    setStyle(progressBar, progressBarStyle);
    progressBarContainer.append(progressBar);
    frame().append(progressBarContainer);

    const pauseSub = onGamePause.subscribe(() => pauseProgressBar(state));
    const resumeSub = onGameResumed.subscribe(() => startProgressBar(state));

    startProgressBar(state);
    log("state: ", state);
    resolve({
      pause: () => pauseProgressBar(state),
      continue: () => startProgressBar(state),
      finish: () => {
        pauseSub.unsubscribe();
        resumeSub.unsubscribe();
      }
    });
  })
}

const startProgressBar = (development) => {
  development.interval = setInterval(() => {
    development.percentage += 100 / PROGRESS_STEPS;
    if(development.percentage >= 100) {
      pauseProgressBar(development);
    }
    development.progressBar.style.width = development.percentage + "%";
  }, development.timeToFinishDevelopment / PROGRESS_STEPS);
}

const pauseProgressBar = (development) => {
  clearInterval(development.interval);
};

