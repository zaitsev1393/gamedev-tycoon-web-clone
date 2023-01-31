import { createElement, frame, log, summary } from "../helpers/helpers.js";
import { getGameState, onBudgetChanged } from "./game.js";

export const initUIService = () => {
  const summaryRows = [
    {
      label: "Budget",
      value: getGameState().budget,
      updater: onBudgetChanged
    },
    {
      label: "Fans",
      value: getGameState().fans,
      updater: { subscribe: () => {} }
    },
    {
      label: "Reputation",
      value: getGameState().reputation.toFixed(2),
      updater: { subscribe: () => {} }
    }
  ]

  setSummary(summaryRows);
}

const setSummary = (summaryRows) => {
  setGameInfo();
  renderRows(summaryRows);
}

const setGameInfo = () => {
  const nameElement = createElement("div", {
    html: getGameState().companyName
  })
  summary().appendChild(nameElement);
  summary().appendChild(createElement("hr"))
}

const createSummaryRow = ({ label, value, updater }) => {
  const id = label.toLowerCase();
  const row = createElement("div", {
    html: `<span>${ label }: </span>`,
    classes: ["flex", "justify-between"]
  })
  const counter = createElement("span", { id, html: value })
  row.appendChild(counter);
  updater.subscribe((value) => document.querySelector(`#${ id }`).innerHTML = value);
  return row;
}

const renderRows = (rows) => {
  rows
    .map(createSummaryRow)
    .forEach((elem) => summary().appendChild(elem));
}