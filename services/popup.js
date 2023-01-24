export const createPopup = (event, options) => {
  const exisitingPopupContainer = document.getElementById("popupContainer");
  if(options?.length == 0) return;
  if(exisitingPopupContainer) {
    document.body.removeChild(exisitingPopupContainer);
    return;
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
    console.log("option: ", option);
    const optionContainer = document.createElement("div");
    optionContainer.style.cursor = "pointer";
    optionContainer.innerHTML = option.text;
    optionContainer.onclick = option.callback || (() => {})();
    popupContainer.append(optionContainer);
  }
  document.body.append(popupContainer);
}