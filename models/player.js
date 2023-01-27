import { popBubble } from "../components/bubble/bubble.js";
import { createPlayerComponent } from "../components/player/player.js";
import { log, rand } from "../helpers/helpers.js";
import { Observable } from "../helpers/observable.js";
import { onGamePause, onGameResumed } from "../services/timer.js";

log("player.js model init");

const CHANGE_TO_PRODUCE = 0.2;

export const BACKGROUND = {
  SELF_TAUGHT_CODER: [50, 15, 35, 10]
}

let devs = [];

const createMainPlayer = () =>
  new Player({
    background: BACKGROUND.SELF_TAUGHT_CODER,
    coords: {
      top: '100px',
      left: '200px'
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

  const DEFAULT_SETUP = { 
    background: BACKGROUND.GUY_FROM_TWITTER,
    salary: 300,
    specialization: null,
    perks: [],
    node: createPlayerComponent({ 
      coords: data.coords, 
      callback: produceBubble 
    }),
    coords: {}
  }
  
  let interval = null;
  let currentProject = null;
  const playerInfo = { ...DEFAULT_SETUP, ...data };

  // const pauseSub = onGamePause.subscribe(() => pauseWork());
  // const resumeSub = onGameResumed.subscribe(() => work(currentProject));
  
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


  const skills = setSkills(playerInfo.background);
  
  const getSalary = () => salary;
  
  const getTechThreshold = ({ technical, design }) => {
    return Math.max(
      0.9 / ((technical + design) / technical), 
      0.9 / ((technical + design) / design)
    )
  }

  const calculateProducingLikelihood = (skills) => {
    const BUG_THRESHOLD = 0.9;
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
        log("value: ", value);
        onPointProduced.next(value)
        return value;
      }
    }
  }

  const work = (gameInfo) => {
    currentProject = gameInfo;
    log("currentProject: ", currentProject);
    let { timeToFinishDevelopment } = gameInfo;
    interval = setInterval(() => {
      log("work interval tick");
      // log("player model timeToFinishDevelopment: ", timeToFinishDevelopment);
      if(timeToFinishDevelopment <= 0) {
        onPointProduced.next({ finished: true })
        clearInterval(interval);
        currentProject = null;
        return;
      }
      if(Math.random() < CHANGE_TO_PRODUCE ) {
        produceBubble();
      }
      timeToFinishDevelopment -= 300;
    }, 300);
    log("Interval on work(): ", interval);
  }

  const promote = ({ newSalary }) => salary = newSalary;
  const pauseWork = () => {
    log("Interval on pauseWork(): ", interval);
    clearInterval(interval);
    interval = null;
  };
  return {
    skills,
    getSalary,
    produceBubble,
    produceValue,
    promote,
    work,
    pauseWork,
    onPointProduced
  }
}

window.Player = Player;
window.BACKGROUND = BACKGROUND;





