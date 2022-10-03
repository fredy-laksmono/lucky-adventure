/***
 * Global Variable
 */
const healthBar = document.querySelector("#hp-bar");
const currentArmor = document.querySelector("#armor");
const currentGold = document.querySelector("#gold");
let option1 = document.querySelector("#option-1");
let option2 = document.querySelector("#option-2");

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
}

class Player extends Character {
  constructor(name) {
    super((name = name));
    this.health = 50;
    this.maxHealth = 50;
    this.armor = 4;
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
    console.log(enemy);
    let calculatedDamage = (1 - enemy.armor * 0.1) * this.damage;
    enemy.reduceHP(calculatedDamage);
    if (enemy.isDead) {
    } else {
      enemy.battle(this);
    }
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
    let calculatedDamage = (1 - player.armor * 0.1) * this.damage;
    player.reduceHP(calculatedDamage);
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

const player1 = new Player("Player 1");
const goblin1 = new Goblin("Goblin 1");
const sword1 = new Equipment("sword", 1);
player1.addEquipment(sword1);
player1.updateStatus();

option1.addEventListener("click", () => {
  console.log("clicked");
  player1.battle(goblin1);
  player1.updateStatus();
  console.log("clicked");
});

option2.addEventListener("click", () => {
  console.log("clicked");
  player1.equipments[0].appliedTo(player1);
  player1.updateStatus();
  goblin1.battle(player1);
  console.log("clicked");
});
