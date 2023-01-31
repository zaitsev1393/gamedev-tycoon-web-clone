import { createElement, log } from "../../helpers/helpers.js";

export const createStartMenu = () => {
  const buttons = [
    {
      name: "New Game",
      callback: () => log("New game")
    },
    {
      name: "Load Game",
      callback: () => log("Load game")
    }
  ]
  let html = `
    <div class = "menu-buttons">
      ${
        buttons
          .map(button => `<button>${ button.name }</button>`)
          .join("")
      }
    </div>
  `

  const startMenu = createElement("div", { classes: ["main-container", "flex-centered"], html });
  document.body.appendChild(startMenu);
  return {
    startMenu,
    close: () => {}
  }
}