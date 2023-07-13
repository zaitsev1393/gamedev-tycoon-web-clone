import createReviewWindow from "./components/reviews/reviews.js";
import createReviewBars from "./components/reviews/reviews.js";
import { createStartMenu } from "./components/start-menu/start-menu.js";
import { createElement, runAsync } from "./helpers/helpers.js";
import { initDevs } from "./models/player.js";
import { addBudget, initFinancesServices } from "./services/finances.js";
import { initGameState } from "./services/game.js";
import { createModal } from "./services/modal.service.js";
import { pauseGame, startGame } from "./services/timer.js";
import { initUIService } from "./services/ui.js";

async function main() {
  initDevs();
  listenTestButtons();
  initGameState();
  initFinancesServices();
  initUIService();
}

const listenTestButtons = () => {
  let modal;
  document
    .querySelector("#present-modal")
    .addEventListener('click', async () => {
      modal = await createModal(createElement("div", { 
        html: `<span style = "background: red">Hola puto</span>`
      }))
      modal.present();
    });

  document.querySelector("#start-menu").addEventListener('click', createStartMenu);
  document.querySelector("#dismiss-modal").addEventListener('click', () => modal.dismiss());
  document.querySelector("#pause").addEventListener('click', pauseGame);
  document.querySelector("#continue").addEventListener('click', startGame);
  document.querySelector("#add-budget").addEventListener('click', () => addBudget(5000));
  document.querySelector("#fake-rating").addEventListener('click', createReviewWindow);
}

main();

