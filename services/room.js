import { isPlayerMenuOpened, closePlayerMenu } from "../helpers/helpers.js";
import { createPopup } from "./popup.js";

const player = document.createElement("div");
player.classList.add('player', 'translate-center');
const frame = document.getElementById("frame");
frame.append(player);

player.addEventListener("click", 
  (event) => 
    createPopup(event, [
      { text: "test", callback: () => console.log("test cb")}
    ]));

frame.addEventListener("click", (event) => {
  setTimeout(() => {
    if(isPlayerMenuOpened() && !player.contains(event.target)) {
      closePlayerMenu();
    }
  }, 100);
})