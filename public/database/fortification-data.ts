export interface Fortification {
  id: number;
  fortificationName: string;
  attackBonus: number;
  healthBonus: number;
  attackHorseman: number;
  attackSwordsman: number;
  attackSpearman: number;
  defenseHorseman: number;
  defenseSword: number;
  defenseSpear: number;
}

export const fortificationData: Fortification[] = [
  {
    id: 1000,
    fortificationName: 'Без укреплений',
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
    id: 1001,
    fortificationName: 'Частокол',
    attackBonus: 0,
    healthBonus: 5,
    attackHorseman: 1.5,
    attackSwordsman: 1.5,
    attackSpearman: 1.5,
    defenseHorseman: 1.5,
    defenseSword: 1.5,
    defenseSpear: 1.5,
  },
  {
    id: 1002,
    fortificationName: 'Хрень из повозок',
    attackBonus: 0,
    healthBonus: 3,
    attackHorseman: 1.2,
    attackSwordsman: 1.2,
    attackSpearman: 1.2,
    defenseHorseman: 1.2,
    defenseSword: 1.2,
    defenseSpear: 1.2,
  },
  {
    id: 1003,
    fortificationName: 'Каменная стена 1 ур',
    attackBonus: 10,
    healthBonus: 20,
    attackHorseman: 1.5,
    attackSwordsman: 1.5,
    attackSpearman: 1.5,
    defenseHorseman: 2,
    defenseSword: 2,
    defenseSpear: 2,
  },
  {
    id: 1100,
    fortificationName: 'Равнина',
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
    id: 1101,
    fortificationName: 'Лес',
    attackBonus: 0,
    healthBonus: 0,
    attackHorseman: 0.5,
    attackSwordsman: 1,
    attackSpearman: 0.5,
    defenseHorseman: 1,
    defenseSword: 1,
    defenseSpear: 1,
  },
  {
    id: 1102,
    fortificationName: 'Болото',
    attackBonus: 0.5,
    healthBonus: 0.5,
    attackHorseman: 0.5,
    attackSwordsman: 0.5,
    attackSpearman: 0.5,
    defenseHorseman: 0.5,
    defenseSword: 0.5,
    defenseSpear: 0.5,
  },
  {
    id: 1103,
    fortificationName: 'Горы',
    attackBonus: 0,
    healthBonus: 0,
    attackHorseman: 0.5,
    attackSwordsman: 1,
    attackSpearman: 1,
    defenseHorseman: 1,
    defenseSword: 1,
    defenseSpear: 1,
  },
];
