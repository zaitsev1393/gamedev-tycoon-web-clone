import { startDevelopment } from "../components/bubble/bubble.js";
import { log } from "../helpers/helpers.js";

const Game = () => ({
  name: '',
  genres: [],
  platforms: [],
})

let GameState;

const createNewGame = () => GameState = structuredClone(Game());
createNewGame();

const getCloseButtonElement = () => document.querySelector(".game-builder.close-button");

function closeHandler() {
  const builderContainer = document.getElementsByClassName("game-builder-container")[0];
  if(builderContainer) {
    builderContainer.classList.add('dissapearing');
    getCloseButtonElement().removeEventListener("click", closeHandler);
    createNewGame();
    log("game state reset: ", GameState);
  }
  setTimeout(() => builderContainer.remove(), 500);
}

export const closeBuilder = () => {
  closeHandler();
}

export const openBuilder = () => {
  const template = document.getElementById("game-builder");
  if(!template) return;
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

const listenInteractiveButtons = () => {
  const startButton = document.querySelector("[data-role='start']");
  const cancelButton = document.querySelector("[data-role='cancel']");
  startButton.onclick = startDevelopment;
  cancelButton.onclick = closeHandler;
}