export enum Weapon {
  sword,
  spear,
}

export interface squadUnitOld {
  id: number;
  name: string;
  horse: boolean;
  bow: boolean;
  weapon: Weapon;
  attack: number;
  distanceAttack: number;
  health: number;
  morality: number;
  size: number;
  price: number;
  attackHorseman: number;
  attackSwordsman: number;
  attackSpearman: number;
  cavalryDefense: number;
  swordDefense: number;
  spearDefense: number;
}

export interface UnitData {
  name: string;
  subRows: squadUnitOld[];
}[]

export const unitsData: UnitData[] = [
  {
    name: "Конница",

    subRows: [
      {
        id: 1,
        name: "Тяж Конница",
        horse: true,
        bow: false,
        weapon: Weapon.sword,
        attack: 60,
        distanceAttack: 0,
        health: 600,
        morality: 50,
        size: 3,
        price: 32,
        attackHorseman: 1.5,
        attackSwordsman: 2,
        attackSpearman: 1.5,
        cavalryDefense: 1,
        swordDefense: 1,
        spearDefense: 1,
      },
      {
        id: 2,
        name: "Лёг Конница",
        horse: true,
        bow: false,
        weapon: Weapon.sword,
        attack: 50,
        distanceAttack: 0,
        health: 400,
        morality: 30,
        size: 3,
        price: 24,
        attackHorseman: 1.5,
        attackSwordsman: 1.5,
        attackSpearman: 1.5,
        cavalryDefense: 1,
        swordDefense: 1,
        spearDefense: 1,
      },
      {
        id: 3,
        name: "Конный Лучник",
        horse: true,
        bow: true,
        weapon: Weapon.sword,
        attack: 25,
        distanceAttack: 15,
        health: 400,
        morality: 25,
        size: 3,
        price: 20,
        attackHorseman: 1,
        attackSwordsman: 1,
        attackSpearman: 1,
        cavalryDefense: 1,
        swordDefense: 1,
        spearDefense: 1,
      },
    ],
  },
  {
    name: "Пехота",

    subRows: [
      {
        id: 4,
        name: "Копейщик",
        horse: false,
        bow: false,
        weapon: Weapon.spear,
        attack: 40,
        distanceAttack: 0,
        health: 300,
        morality: 40,
        size: 2,
        price: 12,
        attackHorseman: 1.5,
        attackSwordsman: 1,
        attackSpearman: 1,
        cavalryDefense: 2,
        swordDefense: 1,
        spearDefense: 1,
      },
      {
        id: 5,
        name: "Мечник",
        horse: false,
        bow: false,
        weapon: Weapon.sword,
        attack: 40,
        distanceAttack: 0,
        health: 300,
        morality: 40,
        size: 2,
        price: 13,
        attackHorseman: 1,
        attackSwordsman: 1,
        attackSpearman: 1.5,
        cavalryDefense: 1,
        swordDefense: 1,
        spearDefense: 1.5,
      },
      {
        id: 6,
        name: "Лучник",
        horse: false,
        bow: true,
        weapon: Weapon.sword,
        attack: 20,
        distanceAttack: 20,
        health: 200,
        morality: 20,
        size: 2,
        price: 15,
        attackHorseman: 1,
        attackSwordsman: 1,
        attackSpearman: 1,
        cavalryDefense: 1,
        swordDefense: 1,
        spearDefense: 1,
      },
      {
        id: 7,
        name: "Одичалый",
        horse: false,
        bow: false,
        weapon: Weapon.spear,
        attack: 25,
        distanceAttack: 0,
        health: 400,
        morality: 30,
        size: 2,
        price: 9,
        attackHorseman: 1.3,
        attackSwordsman: 1,
        attackSpearman: 1,
        cavalryDefense: 1.7,
        swordDefense: 1,
        spearDefense: 1,
      },
      {
        id: 8,
        name: "Вольные Кланы",
        horse: false,
        bow: false,
        weapon: Weapon.sword,
        attack: 50,
        distanceAttack: 0,
        health: 300,
        morality: 35,
        size: 2,
        price: 15,
        attackHorseman: 1,
        attackSwordsman: 1.4,
        attackSpearman: 1,
        cavalryDefense: 0.7,
        swordDefense: 0.7,
        spearDefense: 1,
      },
      {
        id: 9,
        name: "Ополченец",
        horse: false,
        bow: false,
        weapon: Weapon.spear,
        attack: 25,
        distanceAttack: 0,
        health: 250,
        morality: 25,
        size: 2,
        price: 4,
        attackHorseman: 1.1,
        attackSwordsman: 1,
        attackSpearman: 1,
        cavalryDefense: 1.3,
        swordDefense: 1,
        spearDefense: 1,
      },
      {
        id: 10,
        name: "Безупречный",
        horse: false,
        bow: false,
        weapon: Weapon.spear,
        attack: 45,
        distanceAttack: 0,
        health: 400,
        morality: 85,
        size: 2,
        price: 25,
        attackHorseman: 1.8,
        attackSwordsman: 1.5,
        attackSpearman: 1,
        cavalryDefense: 2,
        swordDefense: 1.5,
        spearDefense: 1,
      },
      {
        id: 11,
        name: "Спешенный рыцарь",
        horse: false,
        bow: false,
        weapon: Weapon.sword,
        attack: 60,
        distanceAttack: 0,
        health: 400,
        morality: 50,
        size: 2,
        price: 32,
        attackHorseman: 1,
        attackSwordsman: 1,
        attackSpearman: 1,
        cavalryDefense: 1,
        swordDefense: 1.5,
        spearDefense: 1.5,
      },
      {
        id: 12,
        name: "Спешенный всадник",
        horse: false,
        bow: false,
        weapon: Weapon.sword,
        attack: 40,
        distanceAttack: 0,
        health: 300,
        morality: 40,
        size: 2,
        price: 24,
        attackHorseman: 1,
        attackSwordsman: 1,
        attackSpearman: 1.5,
        cavalryDefense: 1,
        swordDefense: 1,
        spearDefense: 1.5,
      },
      {
        id: 13,
        name: "Моряк",
        horse: false,
        bow: false,
        weapon: Weapon.sword,
        attack: 35,
        distanceAttack: 0,
        health: 350,
        morality: 40,
        size: 2,
        price: 12,
        attackHorseman: 0.8,
        attackSwordsman: 1.4,
        attackSpearman: 1,
        cavalryDefense: 1,
        swordDefense: 1.4,
        spearDefense: 1,
      },
      {
        id: 14,
        name: "Арбалетчик",
        horse: false,
        bow: true,
        weapon: Weapon.sword,
        attack: 20,
        distanceAttack: 25,
        health: 200,
        morality: 20,
        size: 2,
        price: 15,
        attackHorseman: 1,
        attackSwordsman: 1,
        attackSpearman: 1,
        cavalryDefense: 1,
        swordDefense: 1,
        spearDefense: 1,
      },
    ],
  },
  {
    name: "Флот",

    subRows: [
      {
        id: 14,
        name: "Пинас",
        horse: false,
        bow: false,
        weapon: Weapon.spear,
        attack: 35,
        distanceAttack: 0,
        health: 350,
        morality: 40,
        size: 2,
        price: 12,
        attackHorseman: 1,
        attackSwordsman: 1,
        attackSpearman: 1,
        cavalryDefense: 1.2,
        swordDefense: 1.5,
        spearDefense: 2,
      },
      {
        id: 15,
        name: "Ладья",
        horse: false,
        bow: false,
        weapon: Weapon.spear,
        attack: 35,
        distanceAttack: 0,
        health: 350,
        morality: 40,
        size: 2,
        price: 12,
        attackHorseman: 1,
        attackSwordsman: 1,
        attackSpearman: 1.5,
        cavalryDefense: 1,
        swordDefense: 1.2,
        spearDefense: 1.5,
      },
      {
        id: 16,
        name: "Драккар",
        horse: false,
        bow: false,
        weapon: Weapon.spear,
        attack: 35,
        distanceAttack: 0,
        health: 350,
        morality: 40,
        size: 2,
        price: 12,
        attackHorseman: 1.5,
        attackSwordsman: 1.2,
        attackSpearman: 1.1,
        cavalryDefense: 1,
        swordDefense: 1.1,
        spearDefense: 1.1,
      },
      {
        id: 17,
        name: "Баркалон",
        horse: false,
        bow: false,
        weapon: Weapon.spear,
        attack: 35,
        distanceAttack: 0,
        health: 350,
        morality: 40,
        size: 2,
        price: 12,
        attackHorseman: 1.5,
        attackSwordsman: 1,
        attackSpearman: 1,
        cavalryDefense: 1.2,
        swordDefense: 1,
        spearDefense: 1,
      },
      {
        id: 18,
        name: "Галера",
        horse: false,
        bow: false,
        weapon: Weapon.spear,
        attack: 35,
        distanceAttack: 0,
        health: 350,
        morality: 40,
        size: 2,
        price: 12,
        attackHorseman: 1,
        attackSwordsman: 1.2,
        attackSpearman: 1.5,
        cavalryDefense: 1,
        swordDefense: 1.2,
        spearDefense: 1,
      },
      {
        id: 19,
        name: "Галеон",
        horse: false,
        bow: false,
        weapon: Weapon.spear,
        attack: 35,
        distanceAttack: 0,
        health: 350,
        morality: 40,
        size: 2,
        price: 12,
        attackHorseman: 1,
        attackSwordsman: 2,
        attackSpearman: 1.2,
        cavalryDefense: 1,
        swordDefense: 1.2,
        spearDefense: 1.2,
      },
    ],
  },
];
