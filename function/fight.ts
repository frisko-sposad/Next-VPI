import { Hero } from '../public/database/heroes-data';
import { Weapon } from '../public/database/units-data';
import { FlankRow, squadUnit } from './battle';

function getAttackBonus(unit1: squadUnit, unit2: squadUnit, hero1: Hero, hero2: Hero) {
  // проверяем какое оружие у врага и даём бонус против этого оружия
  const weaponBonus1 =
    unit2.weapon === Weapon.sword
      ? unit1.attackSwordsman * hero1.attackSwordsman
      : unit1.attackSpearman * hero1.attackSpearman;
  const weaponBonus2 =
    unit1.weapon === Weapon.sword
      ? unit2.attackSwordsman * hero2.attackSwordsman
      : unit2.attackSpearman * hero2.attackSpearman;

  // проверяем если враг на коне, даём бонус против конницы
  const attackOnCavalryBonus1 = unit2.horse && unit1.attackHorseman * hero1.attackHorseman;
  const attackOnCavalryBonus2 = unit1.horse && unit2.attackHorseman * hero2.attackHorseman;

  // суммарная атака, если нет бонуса против конницы то действует бонус против оружия
  const attack1 = (unit1.attack + hero1.attackBonus) * (attackOnCavalryBonus1 ? attackOnCavalryBonus1 : weaponBonus1);
  const attack2 = (unit2.attack + hero2.attackBonus) * (attackOnCavalryBonus2 ? attackOnCavalryBonus2 : weaponBonus2);

  return { attack1, attack2 };
}

function getFightSize(unit1: squadUnit, unit2: squadUnit): number {
  let fightSize = 0;
  unit1.squadNumber <= 0 && console.log('Units p1 not found', unit1.squadNumber);
  unit2.squadNumber <= 0 && console.log('Units p2 not found', unit2.squadNumber);

  if (unit1.squadNumber * unit1.size <= unit2.squadNumber * unit2.size) {
    fightSize = unit1.squadNumber * unit1.size;
  } else {
    fightSize = unit2.squadNumber * unit2.size;
  }
  return fightSize;
}

function getLosses(
  unit1: squadUnit,
  unit2: squadUnit,
  fightSize: number,
  attack1: number,
  attack2: number,
  distanceAttackBonus1: number,
  distanceAttackBonus2: number,
) {
  // расчёт потерь с 2 знаками после запятой
  console.log(attack1, attack2);

  const lossesPlayer1 = Math.floor(((attack2 * fightSize + distanceAttackBonus1) / unit1.health) * 100) / 100;
  const lossesPlayer2 = Math.floor(((attack1 * fightSize + distanceAttackBonus2) / unit2.health) * 100) / 100;
  return { lossesPlayer1, lossesPlayer2 };
}

function getDistanceAttackBonus(flank1: [FlankRow], currentRow: number, fightSize: number) {
  // расчёт лучников
  let remainsSizeArcher = fightSize;
  let archerNumber = 0;
  let bonus = 0;
  for (let row = currentRow + 1; row < 5; row++) {
    if (flank1[row].squadUnit.bow) {
      const { squadNumber, size, distanceAttack } = flank1[row].squadUnit;
      if (squadNumber > remainsSizeArcher / size) {
        remainsSizeArcher = Math.round(remainsSizeArcher / size);
        archerNumber = remainsSizeArcher;
        bonus = bonus + archerNumber * distanceAttack;
        break;
      } else {
        remainsSizeArcher = (remainsSizeArcher / size - squadNumber) * size;
        archerNumber = squadNumber;
        bonus = bonus + archerNumber * distanceAttack;
      }
    }
  }
  return bonus;
}

export function fight(
  center1: [FlankRow],
  center2: [FlankRow],
  row1: number,
  row2: number,
  currentUnitsCenter1?: number,
  currentUnitsCenter2?: number,
) {
  const { squadUnit: squad1, squadHero: hero1 } = center1[row1];
  const { squadUnit: squad2, squadHero: hero2 } = center2[row2];

  const squadNumber1 = Number(currentUnitsCenter1 ? currentUnitsCenter1 : squad1.squadNumber);
  const squadNumber2 = Number(currentUnitsCenter2 ? currentUnitsCenter2 : squad2.squadNumber);

  const fightSize = getFightSize(squad1, squad2);
  const distanceAttackBonus1 = getDistanceAttackBonus(center1, row1, fightSize);
  const distanceAttackBonus2 = getDistanceAttackBonus(center2, row2, fightSize);

  const { attack1, attack2 } = getAttackBonus(squad1, squad2, hero1, hero2);

  const { lossesPlayer1, lossesPlayer2 } = getLosses(
    squad1,
    squad2,
    fightSize,
    attack1,
    attack2,
    distanceAttackBonus1,
    distanceAttackBonus2,
  );
  // console.log({
  //   lossesPlayer1,
  //   lossesPlayer2,
  //   number1: squad1.squadNumber,
  //   number2: squad2.squadNumber,
  //   fightSize,
  //   attack1: attack1 * squad1.squadNumber,
  //   attack2: attack2 * squad2.squadNumber,
  //   distanceAttackBonus1,
  //   distanceAttackBonus2,
  // });

  const aliveUnits1 = Math.floor((squadNumber1 - lossesPlayer1) * 100) / 100;
  const aliveUnits2 = Math.floor((squadNumber2 - lossesPlayer2) * 100) / 100;

  return { aliveUnits1, aliveUnits2 };
}
