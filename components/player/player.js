import { createPopup } from "../../services/popup.js";
import { entriesIntoStyles } from "../../helpers/helpers.js";
import { startDevelopment } from "../bubble/bubble.js";

export const createPlayer = (coords, options = {}) => {
  const player = document.createElement("div");
  
  player.classList.add('player');
  entriesIntoStyles(player, coords);

  const frame = document.getElementById("frame");
  frame.append(player);
  player.addEventListener("click", 
    (event) => 
      createPopup(event, [
        { text: "Start development", callback: () => startDevelopment(15000) }
      ]));

  return player;
}