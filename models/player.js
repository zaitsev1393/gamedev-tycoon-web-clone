import { popBubble } from "../components/bubble/bubble.js";
import { createPlayerComponent } from "../components/player/player.js";
import { log, rand } from "../helpers/helpers.js";
import { Observable } from "../helpers/observable.js";

export const BACKGROUND = {
  SELF_TAUGHT_CODER: [50, 15, 35, 10]
}

export function Player(data) {
  const produceBubble = () => {
    const value = produceValue({ skills });
    log("Produced value: ", value);
    popBubble({ 
      value,
      originNode: playerInfo.node
    });
  }

  const onPointProduced = new Observable();

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
  
  const produceValue = ({ skills }) => {
    const producingLikelihood = calculateProducingLikelihood(skills);
    const needle = Math.random();
    for(let key in producingLikelihood) {
      if(needle.inRange(producingLikelihood[key])) {
        return {
          points: rand(5),
          type: key
        };
      }
    }
  }

  const work = (gameInfo) => {
    let { timeToFinishDevelopment } = gameInfo;
    interval = setInterval(() => {
      if(timeToFinishDevelopment <= 0) {
        clearInterval(interval);
        return;
      }
      produceValue({ skills });
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
    pauseWork,
    onPointProduced
  }
}

window.Player = Player;
window.BACKGROUND = BACKGROUND;





