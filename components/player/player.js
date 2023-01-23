import { createPopup } from "../../services/popup.js";
import { entriesIntoStyles } from "../../helpers/helpers.js";

export const createPlayer = (coords, options = {}) => {
  const player = document.createElement("div");
  
  player.classList.add('player');
  entriesIntoStyles(player, coords);

  const frame = document.getElementById("frame");
  frame.append(player);
  player.addEventListener("click", 
    (event) => 
      createPopup(event, [
        { text: "test", callback: () => console.log("test cb")}
      ]));

  return player;
}