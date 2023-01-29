import { createPopup } from "../../services/popup.js";
import { closePlayerMenu, createElement, frame, isPlayerMenuOpened, log, setStyle } from "../../helpers/helpers.js";
import { openBuilder } from "../../services/game-builder.js";

export const createPlayerCard = ({ name, skills }) => {
  const playerCard = createElement("div", { 
    classes: ["dev-card", "cursor-pointer"]
  });
  const playerCardHTML = `
    <div class = "dev-name">${ name }</div>
    <div class = "skills-section">
      <div class = "skill-row technical">
        <div class = "segment"></div>
        <div class = "skill">
          <span class = "skill-name">Technical:</span>
          <span class = "skill-value">${ skills.technical }</span>
        </div>
      </div>
      <div class = "skill-row design">
        <div class = "segment"></div>
        <div class = "skill">
          <span class = "skill-name">Design:</span>
          <span class = "skill-value">${ skills.design }</span>
        </div>
      </div>
      <div class = "skill-row research">
        <div class = "segment"></div>
        <div class = "skill">
          <span class = "skill-name">Research:</span>
          <span class = "skill-value">${ skills.research }</span>
        </div>
      </div>
      <div class = "skill-row speed">
        <div class = "segment"></div>
        <div class = "skill">
          <span class = "skill-name">Speed:</span>
          <span class = "skill-value">${ skills.speed }</span>
        </div>
      </div>
    </div>
  `;
  playerCard.innerHTML = playerCardHTML;
  return playerCard;
}

export const createPlayerComponent = ({ name = "John Doe", coords, callback, skills }) => {
  const playerCard = createPlayerCard({ name, skills });
  setStyle(playerCard, coords);

  frame().append(playerCard);
  playerCard.addEventListener("click", 
    (event) => 
      createPopup(event, [
        { 
          text: "Start development", 
          callback: () => openBuilder()
        }
      ]));

  frame().addEventListener("click", (event) => {
    setTimeout(() => {
      if(isPlayerMenuOpened() && !playerCard.contains(event.target)) {
        closePlayerMenu();
      }
    }, 100);
  })
  return playerCard;
}