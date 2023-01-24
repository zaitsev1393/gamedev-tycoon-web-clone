import { log } from "../helpers/helpers.js";

const getCloseButtonElement = () => document.querySelector(".game-builder.close-button");

function closeHandler() {
  const builderContainer = document.getElementsByClassName("game-builder-container")[0];
  if(builderContainer) {
    builderContainer.classList.add('dissapearing');
    getCloseButtonElement().removeEventListener("click", closeHandler);
  }
  setTimeout(() => builderContainer.remove(), 500);
}

export const closeBuilder = () => {
  
}

export const openBuilder = () => {
  const template = document.getElementById("game-builder");
  if(!template) return;

  document.body.append(template.content.cloneNode(true));
  getCloseButtonElement().addEventListener("click", closeHandler);
}