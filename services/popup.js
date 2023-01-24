export const createPopup = (event, options) => {
  const exisitingPopupContainer = document.getElementById("popupContainer");
  if(options?.length == 0) return;
  if(exisitingPopupContainer) {
    return closePopup();
  } 

  const { pageX: left, pageY: top } = event;
  const popupContainer = document.createElement("div");
  popupContainer.id = "popupContainer";
  popupContainer.classList.add("bordered-container", "scaling-appearing");
  popupContainer.style.position = "absolute";
  popupContainer.style["z-index"] = 10000;
  popupContainer.style.top = top + "px";
  popupContainer.style.left = left + "px";  
  popupContainer.style.background = "white";
  for(let option of options) {
    const optionContainer = document.createElement("div");
    optionContainer.style.cursor = "pointer";
    optionContainer.innerHTML = option.text;
    optionContainer.onclick = () => {
      closePopup();
      option.callback();
    }
    popupContainer.append(optionContainer);
  }
  document.body.append(popupContainer);
}

const closePopup = () => {
  document.getElementById("popupContainer").remove();
}