import { log } from "../helpers/helpers.js";

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

export const createDevelopment = (setup) => {
  let gameDevelopmentInterval = null;

  return {
    start: () => {
      setup.developers.forEach(developer => {
        developer.work(setup);
        developer.onPointProduced.subscribe(({ points, type, finished }) => {
          if(type && points) {
            setup.progress[type] += points;
            log("progress: ", setup);
          }
          if(finished) {
            log("Finished: ", setup);
          }
        });
      })
    },
    pause: () => {},
    continue: () => {},
    cancel: () => {},
    postpone: () => {}
  }
}

const startDevelopment = async (gameData) => {
  
}