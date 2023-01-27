import { popBubble } from "../components/bubble/bubble.js";
import { createPlayerComponent } from "../components/player/player.js";
import { log, rand } from "../helpers/helpers.js";

export const BACKGROUND = {
  SELF_TAUGHT_CODER: [50, 15, 35, 10]
}

export function Player(data) {
  const produceBubble = () => {
    log("playerInfo: ", playerInfo);
    popBubble({ 
      value: {
        points: rand(5), 
        type: 'technical'
      },
      originNode: playerInfo.node
    });
  }

  const DEFAULT_SETUP = { 
    background: BACKGROUND.GUY_FROM_TWITTER,
    salary: 300,
    specialization: null,
    perks: [],
    node: createPlayerComponent({ coords: data.coords, callback: produceBubble }),
    coords: {}
  }
  
  const interval = null;
  const playerInfo = { ...DEFAULT_SETUP, ...data };
  
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
  
  const produceValue = (gameInfo, spectrum) => {
    const needle = Math.random();
    for(let key in spectrum) {
      log("needle: ", needle);
      log("spectrum[key]: ", spectrum[key]);
      if(needle.inRange(spectrum[key])) {
        const value = { [key]: Math.ceil(Math.random() * 5) };
        log("Produced value: ", value);
        return value;
      }
    }
  }

  const work = (gameInfo) => {
    const producingLikelihood = calculateProducingLikelihood(skills);
    let { timeToFinishDevelopment } = gameInfo;
    interval = setInterval(() => {
      if(timeToFinishDevelopment <= 0) {
        clearInterval(interval);
        return;
      }
      produceValue(gameInfo, producingLikelihood);
      timeToFinishDevelopment -= 300;
    }, 300);
  }

  const promote = ({ newSalary }) => salary = newSalary;
  const pauseWork = () => clearInterval(interval);  
  return {
    skills,
    getSalary,
    produceBubble,
    promote,
    work,
    pauseWork
  }
}

window.Player = Player;
window.BACKGROUND = BACKGROUND;





