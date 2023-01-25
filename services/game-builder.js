import { startDevelopment } from "../components/bubble/bubble.js";
import descriptiveTitles from "../data/game-names/description-titles.js";
import majorTitles from "../data/game-names/major-titles.js";
import numericalParts from "../data/game-names/numerical-parts.js";
import { getRandomElement, log } from "../helpers/helpers.js";
import { pauseGame, startGame } from "./timer.js";

const Game = () => ({
  name: '',
  genres: [],
  platforms: [],
  timeToDevelop: 15000
})

let GameState;

const BUILDER_CONTAINER_REMOVING_DELAY = 500;

const createNewGame = () => GameState = structuredClone(Game());
createNewGame();

const getCloseButtonElement = () => document.querySelector(".game-builder.close-button");

function closeHandler() {
  closeBuilder();
  createNewGame();
  startGame();
  log("game state reset: ", GameState);
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
  GameState.genres = GameState.genres.uniqPush(genre);
  log("game state: ", GameState);
}

const platformButtonHandler = (event) => {
  const platform = event.target.innerText;
  event.target.classList.toggle("selected");
  GameState.platforms = GameState.platforms.uniqPush(platform);
  log("game state: ", GameState);
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
  GameState.name = name;
  log("game state: ", GameState);
}

const listenInteractiveButtons = () => {
  const startButton = document.querySelector("[data-role='start']");
  const cancelButton = document.querySelector("[data-role='cancel']");
  const nameDice = document.querySelector("#name-dice");
  nameDice.onclick = () => setGameName(getRandomName());
  startButton.onclick = () => {
    closeBuilder();
    startDevelopment(GameState.timeToDevelop);
  }
  cancelButton.onclick = closeHandler;
}