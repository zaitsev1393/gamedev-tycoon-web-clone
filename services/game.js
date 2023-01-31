import { log } from "../helpers/helpers.js";
import { Observable } from "../helpers/observable.js";

const DEFAULT_STATE = {
  companyName: "Game Dev Inc.",
  budget: 10000,
  fans: 0,
  reputation: 0,
  player: {
    name: "John Snow",
    skills: {
      technical: 50,
      design: 50,
      speed: 50,
      research: 50
    },
    perks: [],
    salary: 500
  },
  office: {
    rent: 100,
  },
  techSkills: {
    gameplay: { level: 1, progress: 0 },
    engine: { level: 1, progress: 0 },
    graphics: { level: 1, progress: 0 },
    plot: { level: 1, progress: 0 },
    sound: { level: 1, progress: 0 },
  },
  gamesDeveloped: [],
  gameTime: null,
  devs: [],
  lastGame: null,
  engines: []
}

let gameState = {};

export const onBudgetChanged = new Observable();

const stateListeners = {
  budget: (budget) => onBudgetChanged.next(budget)
}

export const initGameState = () => {
  gameState = createStateProxy(
    JSON.parse(localStorage.getItem("gameState")) || DEFAULT_STATE,
    stateListeners
  );
}

const saveGameState = () => localStorage.setItem("gameState", JSON.stringify(gameState));

const createStateProxy = (state, listeners) => {
  return new Proxy(state, {
    set: (target, key, value) => {
      target[key] = value;
      if(key in listeners) {
        listeners[key](value);
      }
      return true;
    }
  })
} 

export const getGameState = () => gameState;
export const updateStateByKey = (key, value) => {
  gameState[key] = value;
  // saveGameState();
}

window.getGameState = getGameState;