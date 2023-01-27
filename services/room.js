import { isPlayerMenuOpened, closePlayerMenu, log } from "../helpers/helpers.js";
import { createPopup } from "./popup.js";
import { createPlayerComponent } from "../components/player/player.js";
import { BACKGROUND, Player } from "../models/player.js";

const PLAYER_COORDS = {
  bottom: '50px',
  left: '50%',
  transform: 'translateX(-50%)'
}

const playerModel = new Player({
  background: BACKGROUND.SELF_TAUGHT_CODER,
  coords: PLAYER_COORDS
})