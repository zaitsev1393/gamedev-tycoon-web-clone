import { BUBBLE_TRANSITION_FINISHING_TIME } from "../components/bubble/bubble.js";
import { log } from "../helpers/helpers.js";
import { onGamePause, onGameResumed } from "./timer.js";

export const GAME_TYPE = {
  SMALL: 'small',
  MEDIUM: 'medium',
  BIG: 'big'
}

export const GAME_DEVELOPMENT_TIME = {
  SMALL_GAME: 10000,
  MEDIUM_GAME: 20000,
  BIG_GAME: 30000
}

export const createDevelopment = (setup, statusBar) => {
  let gameDevelopmentInterval = null;

  let devSubs = [];

  const finish = () => {
    clearInterval(gameDevelopmentInterval);
    setup.developers.forEach((dev) => dev.finishWork());
    devSubs.forEach(sub => sub.unsubscribe());
    devSubs = [];
    pauseSub.unsubscribe();
    resumeSub.unsubscribe();
  }

  const pause = () => {
    setup.developers.forEach(developer => developer.pauseWork());
    devSubs.forEach(sub => sub.unsubscribe());
    devSubs = [];
    clearInterval(gameDevelopmentInterval)
  };
  const resume = () => start(setup);

  const processPoint = ({ 
    points, 
    type, 
    finished 
  }) => {
    setTimeout(() => statusBar.update({ type, value: points }), BUBBLE_TRANSITION_FINISHING_TIME);
    if(type && points) {
      setup.progress[type] += points;
      log("progress: ", setup);
    }
    if(finished) {
      log("Finished: ", setup);
    }
  };

  const start = () => {
    gameDevelopmentInterval = setInterval(() => {
      if(setup.timeToFinishDevelopment <= 0) {
        return finish(setup)
      }
      log("setup.timeToFinishDevelopment: ", setup.timeToFinishDevelopment);
      setup.timeToFinishDevelopment -= 1000
    }, 1000);

    setup.developers.forEach(developer => {
      developer.work(setup);
      devSubs.push(developer.onPointProduced.subscribe(processPoint));
    })
  }

  const pauseSub = onGamePause.subscribe(pause);
  const resumeSub = onGameResumed.subscribe(resume);

  return {
    start,
    pause,
    resume,
    cancel: () => {},
    postpone: () => {},
    finish
  }
}