export interface Hero {
  id: number;
  heroName: string;
  attackBonus: number;
  healthBonus: number;
  attackHorseman: number;
  attackSwordsman: number;
  attackSpearman: number;
  defenseHorseman: number;
  defenseSword: number;
  defenseSpear: number;
}

export const heroesData: Hero[] = [
  {
    id: 0,
    heroName: 'Командир',
    attackBonus: 0,
    healthBonus: 0,
    attackHorseman: 1,
    attackSwordsman: 1,
    attackSpearman: 1,
    defenseHorseman: 1,
    defenseSword: 1,
    defenseSpear: 1,
  },
  {
    id: 1,
    heroName: 'Робб Старк',
    attackBonus: 5,
    healthBonus: 5,
    attackHorseman: 1.1,
    attackSwordsman: 1.1,
    attackSpearman: 1.1,
    defenseHorseman: 1.1,
    defenseSword: 1.1,
    defenseSpear: 1.1,
  },
  {
    id: 2,
    heroName: 'Станнис Баратеон',
    attackBonus: 9,
    healthBonus: 6,
    attackHorseman: 1.1,
    attackSwordsman: 1.2,
    attackSpearman: 1.2,
    defenseHorseman: 1.2,
    defenseSword: 1.2,
    defenseSpear: 1.2,
  },
];
