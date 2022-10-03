function getRandomInt(max) {
  return Math.floor(Math.random() * max) + 1;
}

class Character {
  constructor(name) {
    this.name = name;
    this.health = 10;
    this.maxHealth = 10;
    this.armor = 0;
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
  }
}

class Player extends Character {
  constructor(name) {
    super((name = name));
    this.health = 50;
    this.maxHealth = 50;
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
}

class Enemy extends Character {
  constructor(name, health, armor, money, equipments) {
    super((name = name));
    this.health = health;
    this.maxHealth = health;
    this.armor = armor;
    this.money = money;
    this.equipments = equipments;
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
    super(
      (name = name),
      (health = 30),
      (armor = 0),
      (money = 75),
      (equipments = equipments)
    );
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
  }
}

class Orc extends Enemy {
  constructor(name, equipments) {
    super(
      (name = name),
      (health = 70),
      (armor = 2),
      (money = 140),
      (equipments = equipments)
    );
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
  }
}

class Boss extends Enemy {
  constructor(name, equipments) {
    super(
      (name = name),
      (health = 200),
      (armor = 4),
      (money = 0),
      (equipments = equipments)
    );
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
  }
}
