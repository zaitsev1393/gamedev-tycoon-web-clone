import { createPopup } from "../../services/popup.js";
import { closePlayerMenu, createElement, frame, isPlayerMenuOpened, log, setStyle } from "../../helpers/helpers.js";
import { openBuilder } from "../../services/game-builder.js";

export const createPlayerComponent = ({ coords, callback }) => {
  const playerContainer = document.createElement("div");
  playerContainer.classList.add("player-container");
  setStyle(playerContainer, coords);
  const player = document.createElement("div");
  const produceButton = createElement("button");
  produceButton.innerHTML = "Produce";
  produceButton.classList.add('produce-button');
  produceButton.onclick = () => callback();
  player.classList.add('player');
  playerContainer.append(player);
  playerContainer.append(produceButton);

  frame().append(playerContainer);
  player.addEventListener("click", 
    (event) => 
      createPopup(event, [
        { 
          text: "Start development", 
          callback: () => openBuilder()
        }
      ]));

  frame().addEventListener("click", (event) => {
    setTimeout(() => {
      if(isPlayerMenuOpened() && !playerContainer.contains(event.target)) {
        closePlayerMenu();
      }
    }, 100);
  })
  return player;
}