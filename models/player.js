const BACKGROUND = {
  SELF_TAUGHT_CODER: [50, 15, 35, 10]
}

function Player(data) {
  const DEFAULT_SETUP = { 
    background: BACKGROUND.GUY_FROM_TWITTER,
    salary: 300,
    specialization: null,
    perks: [],
    node: null
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
  
  return {
    skills,
    promote: ({ newSalary }) => salary = newSalary,
    getSalary: () => salary,
    work: (gameInfo) => {
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
    },
    pauseWork: () => clearInterval(interval)
  }
}

window.Player = Player;
window.BACKGROUND = BACKGROUND;





