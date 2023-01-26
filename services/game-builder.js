import { createProgressBar } from "../components/progress-bar/progress-bar.js";
import descriptiveTitles from "../data/game-names/description-titles.js";
import majorTitles from "../data/game-names/major-titles.js";
import numericalParts from "../data/game-names/numerical-parts.js";
import { getRandomElement, log, player, rand } from "../helpers/helpers.js";
import { pauseGame, startGame, DAY, SMALL_GAME_TIME } from "./timer.js";
import { popBubble } from "../components/bubble/bubble.js";
import { GAME_TYPE } from "./game-development.js";

const GameState = () => ({
  name: '',
  gameType: GAME_TYPE.SMALL,
  genres: [],
  platforms: [],
  progress: {
    technical: 0,
    design: 0,
    bugs: 0
  },
  developers: [],
  timeToFinishDevelopment: SMALL_GAME_TIME
})

let Game;

const BUILDER_CONTAINER_REMOVING_DELAY = 500;

const createNewGame = () => Game = new Proxy(structuredClone(GameState()), {
  set: (target, key, value) => {
    target[key] = value;
    log(`${ key } set to ${ value }`);
    return true;
  },
  get: (target, key) => {
    return target[key];
  }
});
createNewGame();

const getCloseButtonElement = () => document.querySelector(".game-builder.close-button");

export const startDevelopment = async (gameData) => {
  log("Starting development");
  const progressBar = await createProgressBar(gameData.timeToFinishDevelopment);
  startBubbling(gameData);

  document
    .querySelector("#pause")
    .addEventListener('click', () => {
      pauseBubbling(gameData);
      progressBar.pause();
    });

  document
    .querySelector("#continue")
    .addEventListener('click', () => {
      startBubbling(gameData);
      progressBar.continue();
    });

  return {
    pause: () => progressBar.pause(),
    continue: () => progressBar.continue()
  }
}

const startBubbling = (gameData) => {
  // const developmentInterval = setInterval(async () => {
    // if(gameData.timeToFinishDevelopment < 0) {
    //   clearInterval(developmentInterval);
    //   log("Development finished")
    //   return;
    // }
    // if(rand(100) > 50) {
    //   const step = await popBubble({ value: rand(5), originNode: player() });
    //   for(let key in step) {
    //     gameData.progress[key] += step[key];
    //   }
    // }
    // gameData.timeToFinishDevelopment -= 1000;
  // }, 1000);
  // gameData.developmentInterval = developmentInterval;
  log("Bubble started, game data: ", gameData);
}

const pauseBubbling = (gameData) => {
  clearInterval(gameData.developmentInterval);
  gameData.developmentInterval = null;
  log("Bubble paused, game data: ", gameData);
}

export const closeBuilder = () => {
  const builderContainer = document.querySelector(".game-builder-container");
  builderContainer.classList.add('dissapearing');
  getCloseButtonElement().removeEventListener("click", closeHandler);
  setTimeout(() => {
    builderContainer.remove();
  }, BUILDER_CONTAINER_REMOVING_DELAY);
}

export const openBuilder = () => {
  const template = document.getElementById("game-builder");
  if(!template) return;
  pauseGame();
  document.body.append(template.content.cloneNode(true));
  getCloseButtonElement().onclick = closeHandler;
  listenBuilder();
}

const listenBuilder = () => {
  listenGenreSection();
  listenPlatformSection();
  listenGameNameInput();
  listenInteractiveButtons();
}

const genreButtonHandler = (event) => {
  const genre = event.target.innerText;
  event.target.classList.toggle("selected");
  Game.genres = Game.genres.uniqPush(genre);
  log("game state: ", Game);
}

const platformButtonHandler = (event) => {
  const platform = event.target.innerText;
  event.target.classList.toggle("selected");
  Game.platforms = Game.platforms.uniqPush(platform);
  log("game state: ", Game);
}

const listenGenreSection = () => {
  const genreButtons = document.querySelector(".buttons.genre").children;
  for(let button of genreButtons) {
    button.addEventListener("click", genreButtonHandler);
  }
}

const listenPlatformSection = () => {
  const platformButtons = document.querySelector(".buttons.platform").children;
  for(let button of platformButtons) {
    button.addEventListener("click", platformButtonHandler);
  }
}

const listenGameNameInput = () => {
  const input = document.querySelector("#game-name-input");
  const gameNameLabel = document.querySelector("#game-name");
  input.addEventListener("keyup", ({ target }) => {
    gameNameLabel.innerText = target.value;
  })
}

const getRandomName = () => {
  return `${ getRandomElement(majorTitles) } ${ getRandomElement(descriptiveTitles) } ${ getRandomElement(numericalParts)}`;
}

const setGameName = (name) => {
  const input = document.querySelector("#game-name-input");
  const gameNameLabel = document.querySelector("#game-name");
  gameNameLabel.innerText = name;
  input.value = name;
  Game.name = name;
  log("game state: ", Game);
}

const listenInteractiveButtons = () => {
  const startButton = document.querySelector("[data-role='start']");
  const cancelButton = document.querySelector("[data-role='cancel']");
  const nameDice = document.querySelector("#name-dice");
  nameDice.onclick = () => setGameName(getRandomName());
  startButton.onclick = () => {
    closeBuilder();
    startDevelopment(Game);
  }
  cancelButton.onclick = closeHandler;
}

function closeHandler() {
  closeBuilder();
  createNewGame();
  startGame();
  log("game state reset: ", Game);
}