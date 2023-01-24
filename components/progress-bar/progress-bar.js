import { setStyle, frame, log, createElement, runAsync } from "../../helpers/helpers.js";

export const createProgressBar = (time) => {
  return new Promise((resolve, reject) => {
    const progressBarContainer = createElement('div');
    const progressBarContainerStyle = {
      width: "75%",
      height: "10px",
      border: "1px solid black",
      position: "relative",
      left: "50%",
      transform: "translateX(-50%)"
    }
    const progressBar = createElement("div");
    const progressBarStyle = {
      width: 0,
      height: "10px",
      background: "crimson",
      transition: `width ${ Math.ceil(time / 1000) }s linear`,
    }
    
    setStyle(progressBarContainer, progressBarContainerStyle);
    setStyle(progressBar, progressBarStyle);
    progressBarContainer.append(progressBar);
    frame().append(progressBarContainer);
    runAsync(() => progressBar.style.width = "100%");
    resolve();
  })
}


