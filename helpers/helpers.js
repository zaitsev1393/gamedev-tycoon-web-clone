export const isPlayerMenuOpened = () => !!document.getElementById("popupContainer");
export const closePlayerMenu = () => document.body.removeChild(document.getElementById("popupContainer"));
export const log = (...args) => console.log("--", ...args);
export const setStyle = (node, styles) => 
  Object
    .entries(styles)
    .forEach(([key, value]) => node.style[key] = value);

export const runAsync = (fn) => setTimeout(fn, 0);

export const frame = () => document.getElementById("frame");
export const player = () => document.getElementsByClassName("player")[0];
export const createElement = (elementName) => document.createElement(elementName);
export const pixelize = (number) => number + "px";
export const getRandomElement = (arr) => arr[rand(arr.length - 1)];
export const rand = (multi) => Math.ceil(Math.random() * multi);

if(!Array.prototype.uniqPush) {
  Array.prototype.uniqPush = function(elem) {
    let newArray = this;
    if(this.some(e => e == elem)) {
      newArray = newArray.filter(e => e != elem);
    } else {
      newArray.push(elem);
    }
    return newArray;
  }
}