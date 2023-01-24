import { createPopup } from "../../services/popup.js";
import { setStyle } from "../../helpers/helpers.js";
import { startDevelopment } from "../bubble/bubble.js";
import { openBuilder } from "../../services/game-builder.js";

export const createPlayer = (coords, options = {}) => {
  const player = document.createElement("div");
  
  player.classList.add('player');
  setStyle(player, coords);

  const frame = document.getElementById("frame");
  frame.append(player);
  player.addEventListener("click", 
    (event) => 
      createPopup(event, [
        { 
          text: "Start development", 
          callback: () => {
            openBuilder();
            // startDevelopment(15000);
          }
        }
      ]));

  return player;
}