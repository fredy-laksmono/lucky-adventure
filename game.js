/***
 * Global Variable
 */
const healthBar = document.querySelector("#hp-bar");
const currentArmor = document.querySelector("#armor");
const currentGold = document.querySelector("#gold");
const gameStory = document.querySelector("#game-story");
const gameOption = document.querySelector("#game-option-frame");
const gameWrapper = document.querySelector("#game-wrapper");
const gameScenario = document.querySelector("#game-scenario");
// let option1 = document.querySelector("#option-1");
// let option2 = document.querySelector("#option-2");
// let option3 = document.querySelector("#option-3");
// let option4 = document.querySelector("#option-4");
// let option5 = document.querySelector("#option-5");
let currentTarget;
let currentScenario;
let isStoryEnabled = true;
let isDelayEnabled = false;

let encounter0 = [];
let encounter1 = [];
let encounter2 = [];
let encounter3 = [];

let currentChapter = 0;
let currentPage = 0;
let currentDisplayActive = false;

let currentEncounter = [];
let currentEncounterOption = [];
let currentLevel = 1;

/***
 * Function
 */
function getRandomInt(max) {
  return Math.floor(Math.random() * max) + 1;
}

class Equipment {
  constructor(type, modifier) {
    this.type = type;
    this.modifier = modifier;
    switch (type) {
      case "sword":
        this.damage = 10 * modifier;
        break;
      case "chain armor":
        this.armor = 1 * modifier;
        break;
      case "shield":
        this.armor = 1 * modifier;
    }
    this.isUsed = false;
  }
  appliedTo(character) {
    if (this.type === "sword") {
      if (this.isUsed) {
      } else {
        character.damage += this.damage;
        this.isUsed = true;
      }
    } else if (this.type === "chain armor") {
      if (this.isUsed) {
      } else {
        character.armor += this.armor;
        this.isUsed = true;
      }
    } else if (this.type === "shield") {
      if (this.isUsed) {
      } else {
        character.armor += this.armor;
        this.isUsed = true;
      }
    }
  }
}

class Character {
  constructor(name) {
    this.name = name;
    this.health = 10;
    this.maxHealth = 10;
    this.armor = 0;
    this.maxArmor = 9;
    this.money = 0;
    this.equipments = [];
    this.isDead = false;
  }

  addHP(value) {
    const diffFromMax = this.maxHealth - this.health;
    if (diffFromMax <= value) {
      this.health += diffFromMax;
    } else {
      this.health += value;
    }
  }

  reduceHP(value) {
    if (this.health <= value) {
      this.health = 0;
      this.isDead = true;
    } else {
      this.health -= value;
    }
  }
  addArmor(value) {
    this.armor += value;
    if (this.armor > 9) {
      this.armor = 9;
    }
  }
  getName() {
    return this.name;
  }
}

class Player extends Character {
  constructor(name) {
    super(name);
    this.health = 50;
    this.maxHealth = 50;
    this.armor = 0;
    this.damage = 20;
    this.baseDamage = 20;
    this.baseArmor = 4;
  }
  AddMaxHP(value) {
    this.maxHealth += value;
    this.health += value;
  }
  addEquipment(equipment) {
    this.equipments.push(equipment);
  }
  removeEquipment(equipment) {
    for (let i = 0; i < equipments.length; i++) {
      if (this.equipments[i] === equipment) {
        this.equipments.splice(i, 1);
      }
    }
  }
  addMoney(value) {
    this.money += value;
  }
  removeMoney(value) {
    if (this.money < value) {
      return false;
    } else {
      this.money -= value;
      return true;
    }
  }
  rest() {
    this.health = this.maxHealth;
  }
  battle(enemy) {
    console.log(`Before battle: `, enemy);
    let calculatedDamage = (1 - enemy.armor * 0.1) * this.damage;
    enemy.reduceHP(calculatedDamage);
    if (enemy.isDead) {
    } else {
      console.log("Enemy counter attack");
      enemy.battle(this);
    }
    console.log(`After battle: `, enemy);
  }
  updateStatus() {
    healthBar.innerText = this.health;
    currentArmor.innerText = this.armor;
    currentGold.innerText = this.money;
  }
}

class Enemy extends Character {
  constructor(name, health, armor, money, equipments) {
    super((name = name));
    this.health = health;
    this.maxHealth = health;
    this.armor = armor;
    this.money = money;
    this.equipments = equipments;
    this.damage = 10;
    this.type = "enemy";
  }

  giveMoney(player) {
    player.addMoney(this.money);
    this.money = 0;
  }

  giveEquipment(player) {
    player.addEquipment(this.equipments[0]);
    this.equipments = [];
  }
}

class Goblin extends Enemy {
  constructor(name, equipments) {
    super(name);
    this.health = 30;
    this.armor = 0;
    this.money = 75;
    this.equipments = equipments;
    let modifier = getRandomInt(3);
    if (modifier < 3) {
    } else {
      this.health = this.health * 1.5;
    }
    modifier = getRandomInt(4);
    if (modifier < 4) {
    } else {
      this.armor = 1;
    }
    this.damage = this.damage;
  }

  battle(player) {
    console.log("Goblin initiate attack");
    let calculatedDamage = (1 - player.armor * 0.1) * this.damage;
    player.reduceHP(calculatedDamage);
    console.log("Goblin attack for " + calculatedDamage);
    player.updateStatus();
  }
}

class Orc extends Enemy {
  constructor(name, equipments) {
    super(name);
    this.health = 70;
    this.armor = 2;
    this.money = 140;
    this.equipments = equipments;
    let modifier = getRandomInt(2);
    if (modifier < 2) {
    } else {
      this.health = this.health * 1.5;
    }
    modifier = getRandomInt(7);
    if (modifier < 3) {
    } else if (modifier < 6) {
      this.armor = 3;
    } else {
      this.armomr = 4;
    }
    this.damage = 20;
  }

  battle(player) {
    let calculatedDamage = (1 - player.armor * 0.1) * this.damage;
    player.reduceHP(calculatedDamage);
  }
}

class Boss extends Enemy {
  constructor(name, equipments) {
    super(name);
    this.health = 200;
    this.armor = 4;
    this.money = 0;
    this.equipments = equipments;
    let modifier = getRandomInt(3);
    if (modifier < 3) {
    } else {
      this.health = this.health * 1.3;
    }
    modifier = getRandomInt(3);
    if (modifier < 2) {
    } else if (modifier < 3) {
      this.armor = 5;
    } else {
      this.armor = 6;
    }
    this.damage = 40;
  }
  battle(player) {
    let calculatedDamage = (1 - player.armor * 0.1) * this.damage;
    player.reduceHP(calculatedDamage);
  }
}

////////////////////////////////////////////////
// Helper function to check for confirmation  //
////////////////////////////////////////////////
const reConfirm = (myAnswer, myString, sentence) => {
  confirmResult = false;
  confirmAnswer = `${sentence} ${myAnswer}?`;
  confirmResult = confirm(confirmAnswer);
  while (confirmResult === false) {
    answer = prompt(myString); //To-do: Error handling
    confirmAnswer = `${sentence} ${answer}?`;
    confirmResult = confirm(confirmAnswer);
  }
  confirmResult = false;
  return answer;
  // end of confirm help function
};

const displayStory = (chapter, page) => {
  gameStory.innerText = gameNarator[chapter][page];
};

const displayScenario = (type, object) => {
  console.log("displayScenario Triggered");
  if (type === "enemy" && currentDisplayActive === false) {
    console.log("New Display");
    const myDiv = document.createElement("div");
    const nameFrame = document.createElement("div");
    const healthFrame = document.createElement("div");
    const healthValue = document.createElement("div");
    const armorFrame = document.createElement("div");
    const armorValue = document.createElement("div");
    nameFrame.classList.add("name-frame");
    myDiv.classList.add("scenario-wraper-enemy");
    nameFrame.innerText = `${object.name}`;
    healthFrame.innerText = `HP: ${object.health}`;
    armorFrame.innerText = `Armor: ${object.armor}`;
    myDiv.appendChild(nameFrame);
    myDiv.appendChild(healthFrame);
    myDiv.appendChild(armorFrame);
    gameScenario.appendChild(myDiv);
    return {
      master: myDiv,
      healthData: healthFrame,
      armorData: armorFrame,
      enemy: object
    };
  } else if (type === "path" && currentDisplayActive === false) {
    console.log("New Display");
    const myDiv = document.createElement("div");
    const myInstruction = document.createElement("div");
    myInstruction.innerText = "<Select your path>";
    myInstruction.classList.add("name-frame");
    myDiv.classList.add("scenario-wraper-enemy");
    myDiv.classList.add("scenario-div");
    myDiv.appendChild(myInstruction);
    for (let i = 0; i < object.length; i++) {
      const myOption = document.createElement("button");
      myOption.innerText = object[i].name;
      if (object[i].type === "enemy") {
        myOption.addEventListener("click", () => {
          currentTarget = object[i];
          clearScenario();
          currentScenario = displayScenario("enemy", object[i]);
        });
      } else if (object[i].type === "rest") {
        myOption.addEventListener("click", (e) => {
          e.stopPropagation();
          clearScenario();
          currentScenario = displayScenario("rest", object[i]);
        });
      } else if (object[i].type === "treasure") {
        myOption.addEventListener("click", () => {
          clearScenario();
          currentScenario = displayScenario("treasure", object[i]);
        });
      }

      myDiv.appendChild(myOption);
    }
    gameScenario.appendChild(myDiv);
    return {
      master: myDiv,
      enemy: object
    };
  } else if (type === "rest") {
    restScenario();
  } else if (type === "treasure") {
    console.log("Treasure triggered");
    const myDiv = document.createElement("div");
    const myInstruction = document.createElement("div");
    myInstruction.innerText = "You got new equipment";
    myInstruction.classList.add("name-frame");
    gameScenario.appendChild(myDiv);
    player.updateStatus();
  }
};

const clearAndContinue = () => {
  clearScenario();
  gameWrapper.removeEventListener("click", clearAndContinue);
  gameWrapper.addEventListener("click", advance);
};

const restScenario = () => {
  console.log("In-Rest Scenario");
  const myDiv = document.createElement("div");
  const myInstruction = document.createElement("div");
  myDiv.classList.add("scenario-div");
  myInstruction.innerText = "You are well rested";
  myInstruction.classList.add("name-frame");
  myDiv.appendChild(myInstruction);
  gameScenario.appendChild(myDiv);
  player.rest();
  player.updateStatus();
  gameWrapper.addEventListener("click", clearAndContinue);
  currentScenario = { master: myDiv };
  return {
    master: myDiv
  };
};
const updateEnemy = () => {
  let myHealth = currentScenario.healthData;
  let myArmor = currentScenario.armorData;
  myHealth.innerText = `HP: ${currentScenario.enemy.health}`;
  myArmor.innerText = `Armor: ${currentScenario.enemy.armor}`;
};

const clearScenario = () => {
  const myDiv = document.querySelector(".scenario-div");
  myDiv.remove();
  //currentScenario.master.remove();
  currentDisplayActive = false;
};
// Delete if not used
// const attack = () => {
//   player.battle(currentTarget);
// };

const continueStory = () => {
  storyProgress();
};

const delayNext = () => {
  isStoryEnabled = true;
  currentPage++;
  isDelayEnabled = true;
};

const generateEncounter = (level) => {
  if (level === 1) {
    for (let i = 0; i < 6; i++) {
      myRand = getRandomInt(6);
      if (myRand >= 5) {
        const rest = {
          type: "rest",
          name: "Rest"
        };
        currentEncounter.push(rest);
      } else if (myRand === 4) {
        const sword = new Equipment("sword", 2);
        const treasureBox = {
          type: "treasure",
          name: "Treasure Box",
          item: sword
        };
        currentEncounter.push(treasureBox);
      } else if (myRand < 4) {
        let enemyName = "Goblin" + i;
        const goblin = new Goblin(enemyName);
        currentEncounter.push(goblin);
      }
    }
  }
};

const advance = () => {
  currentEncounterOption = [];
  gameWrapper.removeEventListener("click", advance);
  currentEncounterOption.push(currentEncounter.pop());
  currentEncounterOption.push(currentEncounter.pop());
  console.log("Scenario to be shown: ", currentEncounterOption);
  currentScenario = displayScenario("path", currentEncounterOption);
};

const mainStory = () => {
  console.log(currentEncounter);
  generateEncounter(1);
  displayStory("level1", 0);
  console.log(currentEncounter);
  gameWrapper.addEventListener("click", advance);
};

const storyProgress = () => {
  console.log("storyProgress triggered");
  displayStory(currentChapter, currentPage);
  if (currentChapter === 0) {
    if (currentPage < gameNarator[currentChapter].length - 1) {
      //   currentPage++;
    } else {
      currentPage = -1;
      currentChapter++;
      answer = prompt("Please enter your name: ");
      answer = reConfirm(answer, "Please enter your name: ", "Is your name: ");
      player.name = answer;
      player.updateStatus();
      console.log(player.name);
    }
  } else if (currentChapter === 1) {
    if (currentPage < gameNarator[currentChapter].length - 1) {
      //   currentPage++;
    } else {
      gameWrapper.removeEventListener("click", storyProgress);
      isStoryEnabled = false;
      currentTarget = goblinInTraining1;
      currentScenario = displayScenario("enemy", goblinInTraining1);
      console.log("currentScenario = ", currentScenario);
      let option1 = document.createElement("button");
      option1.innerText = "Attack";
      option1.addEventListener("click", () => {
        player.battle(goblinInTraining1);
        updateEnemy();
        if (goblinInTraining1.isDead) {
          gameWrapper.addEventListener("click", continueStory);
          isStoryEnabled = true;
          option1.remove();
          console.log("Current Page before reset: " + currentPage);
          currentPage = 0;
          currentChapter++;
          console.log(
            "Current Chapter: " +
              currentChapter +
              " Current page: " +
              currentPage
          );
        }
      });
      gameOption.appendChild(option1);
    }
  } else if (currentChapter === 2) {
    if (currentPage === 2) {
      clearScenario();
      //   currentPage++;
    } else if (currentPage === 6) {
      //   currentPage++;
      player.addArmor(4);
      player.updateStatus();
    } else if (currentPage === 7) {
      gameWrapper.removeEventListener("click", continueStory);
      isStoryEnabled = false;
      currentTarget = goblinInTraining2;
      currentScenario = displayScenario("enemy", goblinInTraining2);
      let option1 = document.createElement("button");
      option1.innerText = "Basic Shield";
      option1.addEventListener("click", () => {
        player.addArmor(1);
        player.updateStatus();
        option1.remove();
        gameWrapper.addEventListener("click", continueStory);
        delayNext();
        goblinInTraining2.battle(player);
        player.updateStatus();
      });
      gameOption.appendChild(option1);
    } else if (currentPage === 9) {
      gameWrapper.removeEventListener("click", continueStory);
      isStoryEnabled = false;
      let option1 = document.createElement("button");
      option1.innerText = "Basic Sword";
      option1.addEventListener("click", () => {
        player.damage += 15;
        player.updateStatus();
        option1.remove();
        gameWrapper.addEventListener("click", continueStory);
        delayNext();
        goblinInTraining2.battle(player);
        player.updateStatus();
      });
      gameOption.appendChild(option1);
    } else if (currentPage === 10) {
      gameWrapper.removeEventListener("click", continueStory);
      isStoryEnabled = false;
      currentTarget = goblinInTraining2;
      let option1 = document.createElement("button");
      option1.innerText = "Attack";
      option1.addEventListener("click", () => {
        player.battle(goblinInTraining2);
        updateEnemy();
        option1.remove();
        if (goblinInTraining2.isDead) {
          console.log("Current Page before reset: " + currentPage);
          currentPage = 0;
          currentChapter++;
          console.log(
            "Current Chapter: " +
              currentChapter +
              " Current page: " +
              currentPage
          );
          displayStory(currentChapter, currentPage);
          gameWrapper.addEventListener("click", continueStory);
          isStoryEnabled = true;
        } else {
          continueStory();
        }
      });
      gameOption.appendChild(option1);
    } else if (currentPage < gameNarator[currentChapter].length - 1) {
      //   currentPage++;
    } else {
    }
  } else if (currentChapter === 3) {
    if (currentPage === 2) {
      //   currentPage++;
      clearScenario();
      player.rest();
    } else if (currentPage < gameNarator[currentChapter].length - 1) {
      // currentPage++;
    }
  }
  if (isStoryEnabled && isDelayEnabled === false) {
    currentPage++;
    console.log("Story increase by one, " + currentPage);
  } else if (isStoryEnabled && isDelayEnabled) {
    isDelayEnabled = false;
  }
  displayStory(currentChapter, currentPage);
  console.log(
    "Story Progress - Current Chapter: " +
      currentChapter +
      " Current page: " +
      currentPage
  );
  player.updateStatus();
};

const startGame = () => {
  displayStory(0, 0);
  gameWrapper.addEventListener("click", storyProgress);
};

const goblinInTraining1 = new Goblin("Hello Goblin");
const goblinInTraining2 = new Goblin("World Goblin");
goblinInTraining1.health = 20;
goblinInTraining1.armor = 0;
goblinInTraining2.health = 50;
goblinInTraining2.armor = 0;
let player = new Player("default");

const gameNarator = {
  0: [
    "Voice: Greeting adventurer! Welcome to Lucky Adventura. We are glad that you can come, as we are in dire need of help. Here, this is your guide. ",
    "Guide: Hello adventurer, I believe we have not been introduced to each other.",
    "FL: I’m FL and may I know who is our brave soul name here?"
  ],
  1: [
    `FL: Thank you ${player.name} for coming, as the voice in your head mentioned, we are in dire need for a brave adventure to help us defeat the dark lord in this world.`,
    "FL: In order to reach the Dark lord, you need to venture into dark lord castle. I can guide you to the castle door. Let's go!",
    "FL: There is a single goblin sleeping. We need to fight him in order to reach the castle. Quickly, click the Attack button!"
  ],
  2: [
    ``,
    `FL: Nice Punch!`,
    `FL: We are lucky that the goblin was not in a good shape. The next one won't be so easy`,
    `FL: Talking about easy, we've arrived at the castle gate.`,
    `FL: There is another goblin guarding the castle gate. This one seems tougher than before.`,
    `FL: Unfortunately, I happened to shop some basic equipment a moment ago.`,
    `FL: Here, wear this armor!`,
    `FL: And take this basic shield and equip it. Click the shield button.`,
    `FL: Your armor has increased and equipment can only be used one time per battle. But the effect last until the battle end.`,
    `FL: Here, take this basic sword and let's equip the sword to increase our damage. Click the sword button.`,
    `FL: As you can see, we already took 2 hit but it is barely reducing your health. Now keep attacking the goblin.`
  ],
  3: [
    ``,
    `FL: Nice, you beat the goblin. I know you can do it. `,
    `FL: Now, let me heal you before you start your real journey.`,
    `FL: Beyond this gate, you will face many challenges. You will be on your own.`,
    `FL: You will find the dark lord at the top of the castle.`,
    `FL: I sincerely wish you good luck.`,
    `FL: System: You've entered the first floor of the castle.`
  ],
  level1: [`Level 1`]
};

//startGame();
mainStory();
