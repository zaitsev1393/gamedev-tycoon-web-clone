export const isPlayerMenuOpened = () => !!document.getElementById("popupContainer");
export const closePlayerMenu = () => document.body.removeChild(document.getElementById("popupContainer"));