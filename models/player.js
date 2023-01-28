import { popBubble } from "../components/bubble/bubble.js";
import { createPlayerComponent } from "../components/player/player.js";
import { log, rand } from "../helpers/helpers.js";
import { Observable } from "../helpers/observable.js";
import { onGamePause, onGameResumed } from "../services/timer.js";

log("player.js model init");

const CHANGE_TO_PRODUCE = 0.2;
const BUG_THRESHOLD = 0.9;

export const BACKGROUND = {
  SELF_TAUGHT_CODER: [50, 15, 35, 10]
}

let devs = [];

const createMainPlayer = () =>
  new Player({
    background: BACKGROUND.SELF_TAUGHT_CODER,
    coords: {
      top: '200px',
      left: '50%'
    }
  })

export const initDevs = () => {
  devs.push(createMainPlayer());
  window.devs = devs;
}

export const getDevs = () => devs;

export function Player(data) {
  const produceBubble = () => {
    const value = produceValue();
    log("Produced value: ", value);
    popBubble({ value, originNode: playerInfo.node });
  }

  const onPointProduced = new Observable();
  const onFinishedDevelopment = new Observable();

  const perks = [];
  const skillset = {
    technical: null,
    design: null,
    speed: null,
    research: null
  };

  const setSkills = (background) => 
    Object
      .fromEntries(
        Object
          .keys(skillset)
          .map((skill, i) => [skill, background[i]])
      );


  const skills = setSkills(data.background);

  const DEFAULT_SETUP = { 
    name: "John Doe",
    background: BACKGROUND.GUY_FROM_TWITTER,
    salary: 300,
    specialization: null,
    perks: [],
    node: createPlayerComponent({
      coords: data.coords, 
      skills,
      name: "John Doe",
      callback: produceBubble 
    }),
    coords: {}
  }
  const playerInfo = { ...DEFAULT_SETUP, ...data };
  
  let interval = null;
  let currentProject = null;

  // const pauseSub = onGamePause.subscribe(() => pauseWork());
  // const resumeSub = onGameResumed.subscribe(() => work(currentProject));
  
  const getSalary = () => salary;
  
  const getTechThreshold = ({ technical, design }) => {
    return Math.max(
      BUG_THRESHOLD / ((technical + design) / technical), 
      BUG_THRESHOLD / ((technical + design) / design)
    )
  }

  const calculateProducingLikelihood = (skills) => {
    const techThreshold = getTechThreshold(skills);
    return {
      technical: [0, techThreshold],
      design: [techThreshold, BUG_THRESHOLD],
      bug: [BUG_THRESHOLD, 1]
    }
  }
  
  const produceValue = () => {
    const producingLikelihood = calculateProducingLikelihood(skills);
    const needle = Math.random();
    for(let key in producingLikelihood) {
      if(needle.inRange(producingLikelihood[key])) {
        const value = {
          points: rand(5),
          type: key
        };
        onPointProduced.next(value)
        return value;
      }
    }
  }

  const promote = ({ newSalary }) => salary = newSalary;
  
  const work = (gameInfo) => {
    currentProject = gameInfo;
    interval = setInterval(() => {
      if(Math.random() < CHANGE_TO_PRODUCE ) {
        produceBubble();
      }
    }, 300);
    log(`${ playerInfo.name } is working`)
  }

  const pauseWork = () => {
    clearInterval(interval);
    interval = null;
    log(`${ playerInfo.name } paused work`)
  };
  
  const finishWork = () => {
    pauseWork();
    onPointProduced.next({ finished: true })
    log(`${ playerInfo.name } finished work`)
  }

  return {
    skills,
    getSalary,
    produceBubble,
    produceValue,
    promote,
    work,
    finishWork,
    pauseWork,
    onPointProduced
  }
}

window.Player = Player;
window.BACKGROUND = BACKGROUND;





