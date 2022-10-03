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
  addHP(value) {
    const diffFromMax = this.maxHealth - this.health;
    if (diffFromMax <= value) {
      this.health += diffFromMax;
    } else {
      this.health += value;
    }
  }
  AddMaxHP(value) {
    this.maxHealth += value;
    this.health += value;
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
