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
