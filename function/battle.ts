import { Hero } from '../public/database/heroes-data';
import { squadUnitOld, Weapon } from '../public/database/units-data';
import { fight } from './fight';

export interface squadUnit extends squadUnitOld {
  id: number;
  name: string;
  horse: boolean;
  bow: boolean;
  weapon: Weapon;
  attack: number;
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
  squadNumber: number;
}

export interface FlankRow {
  squadUnit: squadUnit;
  squadHero: Hero;
}

export interface Flank {
  center: [FlankRow];
  defence: [FlankRow];
  left: [FlankRow];
  right: [FlankRow];
}

export interface ParseData {
  player1: Flank;
  player2: Flank;
}

export function battle(unitData: ParseData): void {
  const roundNumber = 7;
  const flankRows = {
    rightFlank1: 0,
    rightFlank2: 0,
    leftFlank1: 0,
    leftFlank2: 0,
    centerFlank1: 0,
    centerFlank2: 0,
    defenceFlank1: 0,
    defenceFlank2: 0,
  };

  const {
    player1: { center: center1, right: right1, left: left1, defence: defence1 },
    player2: { center: center2, right: right2, left: left2, defence: defence2 },
  } = unitData;

  let currentUnitsCenter1;
  let currentUnitsCenter2;

  for (let round = 1; round <= roundNumber; round++) {
    if (flankRows.centerFlank1 < 5 && flankRows.centerFlank2 < 5) {
      console.log('round', round, 'flank', flankRows.centerFlank1 + 1, flankRows.centerFlank2 + 1);

      const squadUnit1 = center1[flankRows.centerFlank1].squadUnit;
      const squadUnit2 = center1[flankRows.centerFlank2].squadUnit;

      const startUnitNumber1 = squadUnit1.squadNumber;
      const startUnitNumber2 = squadUnit2.squadNumber;

      const { aliveUnits1, aliveUnits2 } = fight(
        center1,
        center2,
        flankRows.centerFlank1,
        flankRows.centerFlank2,
        currentUnitsCenter1,
        currentUnitsCenter2,
      );

      currentUnitsCenter1 = aliveUnits1;
      currentUnitsCenter2 = aliveUnits2;

      const moral1 =
        currentUnitsCenter1 < (startUnitNumber1 * (100 - center1[flankRows.centerFlank1].squadUnit.morality)) / 100;
      const moral2 =
        currentUnitsCenter2 < (startUnitNumber2 * (100 - center2[flankRows.centerFlank1].squadUnit.morality)) / 100;

      // Проверка морали, если не проходит то берём следующий ряд, если проходит то подставляем выживших юнитов

      if (moral1) {
        flankRows.centerFlank1++;
        currentUnitsCenter1 = undefined;
      } else {
        currentUnitsCenter1 = aliveUnits1;
      }

      if (moral2) {
        flankRows.centerFlank2++;
        currentUnitsCenter2 = undefined;
      } else {
        currentUnitsCenter2 = aliveUnits2;
      }
    }
  }
}
