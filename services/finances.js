import { log } from "../helpers/helpers.js";
import { getGameState, updateStateByKey } from "./game.js";
import { onNewMonth  } from "./timer.js";

const timeHandler = ({ gameTime }) => {
  const { budget, player, office, devs } = getGameState();
  const newBudget = 
    budget - 
    player.salary - 
    devs.reduce((dev, acc) => acc += (dev || {}).salary, 0) - 
    office.rent;

  log("newBudget: ", newBudget);

  if(newBudget < 0) {
    log("Game over");
    return;
  }
  updateStateByKey("budget", newBudget);
}

export const initFinancesServices = () => {
  const onTimerTickSub = onNewMonth.subscribe(timeHandler);
}

export const addBudget = (value) => updateStateByKey("budget", getGameState().budget + value);