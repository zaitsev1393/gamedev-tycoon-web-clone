// Year = 730s;
// Month = 60.8s;
// Week = 15.2s;
// Day = 2.03s;

import { Observable } from "../helpers/observable.js";

const { onTick } = (function() {
  const DAY = 2030;
  const WEEK = DAY * 7;
  const MONTH = WEEK * 4;
  const YEAR = MONTH * 12;

  const onTick = new Observable();

  let GAME_INTERVAL = null;

  (document.getElementById("reset-time") || {}).onclick = () => {
    clearInterval(GAME_INTERVAL);
    localStorage.setItem("gameTime", 0);
    startTimer();
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
  const startTimer = (
    time = Number(localStorage.getItem("gameTime"))
  ) => {
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

  startTimer();

  return { onTick }
})();

export { onTick };