// Year = 730s;
// Month = 60.8s;
// Week = 15.2s;
// Day = 2.03s;

import { log } from "../helpers/helpers.js";
import { Observable } from "../helpers/observable.js";

export const DAY = 2030;
export const WEEK = DAY * 7;
export const MONTH = WEEK * 4;
export const YEAR = MONTH * 12;

export const SMALL_GAME_TIME = 15000;

const { 
  onTick, 
  pauseGame, 
  startGame, 
  onGamePause, 
  onGameResumed 
} = (function() {
  const onTick = new Observable();
  const onGamePause = new Observable();
  const onGameResumed = new Observable();
  let GAME_INTERVAL = null;

  (document.getElementById("reset-time") || {}).onclick = () => {
    clearInterval(GAME_INTERVAL);
    localStorage.setItem("gameTime", 0);
    startGame();
  }

  const getCurrentDay = (currentTime) => {
    return Math.floor(
      (
        getThisYearTime(currentTime) - 
        getCurrentYearMonth(currentTime) * MONTH -
        getCurrentWeek(currentTime) * WEEK
      ) / DAY);
  }

  const getCurrentWeek = (currentTime) => {
    const thisYearTime = getThisYearTime(currentTime);
    const currentMonth = getCurrentYearMonth(currentTime);
    const restOfThisMonthTime = thisYearTime - currentMonth * MONTH;
    return Math.floor(restOfThisMonthTime / WEEK);
  }

  const getThisYearTime = (currentTime) => {
    while(currentTime > YEAR) {
      currentTime -= YEAR;
    }
    return currentTime;
  }

  const getCurrentYearMonth = (currentTime) => {
    while(currentTime > YEAR) {
      currentTime -= YEAR;
    }
    return Math.floor(currentTime / MONTH);
  }

  const getCurrentYear = (currentTime) => Math.floor(currentTime / YEAR) ;

  const timer = document.getElementById("timer");
  const startGame = (
    time = Number(localStorage.getItem("gameTime"))
  ) => {
    log("Game started");
    onGameResumed.next(true);
    const gameTime = time += DAY;
    render(timer, gameTime);
    GAME_INTERVAL = setInterval(() => {
      const gameTime = time += DAY;
      render(timer, gameTime);
      onTick.next({ gameTime });
      localStorage.setItem("gameTime", gameTime);
    }, DAY);
  }

  const render = (timer, time) => {
    timer.innerHTML = parseTime(time);
  }

  const parseTime = (time) => {
    const [ day, week, month, year ] = [
      getCurrentDay(time),
      getCurrentWeek(time),
      getCurrentYearMonth(time),
      getCurrentYear(time)
    ];
    return `D: ${ day } - W: ${ week } - M: ${ month } - Y: ${ 1985 + year }`;
  }

  const pauseGame = () => {
    log("Game paused");
    onGamePause.next(true);
    clearInterval(GAME_INTERVAL);
  }

  startGame();

  return { 
    onTick, 
    pauseGame, 
    startGame, 
    onGamePause, 
    onGameResumed 
   }
})();

export {
  onTick, 
  pauseGame, 
  startGame, 
  onGamePause, 
  onGameResumed 
};