export const isPlayerMenuOpened = () => !!document.getElementById("popupContainer");
export const closePlayerMenu = () => document.body.removeChild(document.getElementById("popupContainer"));

export const entriesIntoStyles = (node, styles) => 
  Object
    .entries(styles)
    .forEach(([key, value]) => node.style[key] = value);

export const runAsync = (fn) => setTimeout(fn, 0);

export const frame = () => document.getElementById("frame");
export const player = () => document.getElementsByClassName("player")[0];

export const pixelize = (number) => number + "px";
export const getRandomElement = (arr) => arr[rand(arr.length)];
export const rand = (multi) => Math.ceil(Math.random() * multi);