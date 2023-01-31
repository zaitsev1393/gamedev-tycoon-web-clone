import { createElement, log } from "../helpers/helpers.js"

const getCurrentModal = () => document.querySelector("#app-modal");

export const createModal = (node) => {
  return new Promise((resolve, reject) => {
    if(getCurrentModal()) return reject;
    let modal = createElement("div", { id: "app-modal"});
    modal.appendChild(node);
    modal.classList.add("modal-container");
    document.body.append(modal);

    const present = () => {
      modal.classList.add("fade-in");
    };

    const dismiss = (options = {}) => {
      if(!getCurrentModal()) return reject();
      modal.classList.add("fade-out");
      setTimeout(() => getCurrentModal().remove(), 300);
    };

    resolve({ present, dismiss });
  })
}