export interface Hero {
  id: number;
  heroName: string;
  attackBonus: number;
  healthBonus: number;
  attackHorseman: number;
  attackSwordsman: number;
  attackSpearman: number;
  cavalryDefense: number;
  swordDefense: number;
  spearDefense: number;
}

export const heroesData: Hero[] = [
  {
    id: 0,
    heroName: "Командир",
    attackBonus: 0,
    healthBonus: 0,
    attackHorseman: 1,
    attackSwordsman: 1,
    attackSpearman: 1,
    cavalryDefense: 1,
    swordDefense: 1,
    spearDefense: 1,

  },
  {
    id: 1,
    heroName: "Робб Старк",
    attackBonus: 5,
    healthBonus: 5,
    attackHorseman: 1.1,
    attackSwordsman: 1.1,
    attackSpearman: 1.1,
    cavalryDefense: 1.1,
    swordDefense: 1.1,
    spearDefense: 1.1,
  },
  {
    id: 2,
    heroName: "Станнис Баратеон",
    attackBonus: 9,
    healthBonus: 6,
    attackHorseman: 1.1,
    attackSwordsman: 1.2,
    attackSpearman: 1.2,
    cavalryDefense: 1.2,
    swordDefense: 1.2,
    spearDefense: 1.2,
  }
]

