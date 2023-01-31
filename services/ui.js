import { appendTo, createElement, getElement, summary } from "../helpers/helpers.js";
import { getGameState, onBudgetChanged } from "./game.js";
const appendToSummary = (...elems) => elems.forEach(appendTo(summary()))
;
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
  appendToSummary(nameElement, createElement("hr"));
}

const createSummaryRow = ({ label, value, updater }) => {
  const id = label.toLowerCase();
  const row = createElement("div", {
    html: `<span>${ label }: </span>`,
    classes: ["flex", "justify-between"]
  });
  const counter = createElement("span", { id, html: value })
  appendTo(row)(counter);
  updater.subscribe((value) => getElement(`#${ id }`).innerHTML = value);
  return row;
}

const renderRows = (rows) => {
  appendToSummary(
    ...rows.map(createSummaryRow), 
    createElement("hr")
  );
}