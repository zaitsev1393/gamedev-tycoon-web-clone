import { isPlayerMenuOpened, closePlayerMenu } from "../helpers/helpers.js";
import { createPopup } from "./popup.js";
import { createPlayer } from "../components/player/player.js";

const PLAYER_COORDS = {
  bottom: '50px',
  left: '50%',
  transform: 'translateX(-50%)'
}

const player = createPlayer(PLAYER_COORDS);

frame.addEventListener("click", (event) => {
  setTimeout(() => {
    if(isPlayerMenuOpened() && !player.contains(event.target)) {
      closePlayerMenu();
    }
  }, 100);
})