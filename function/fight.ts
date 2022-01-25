import loadConfig from 'next/dist/next-server/server/config';
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

function getFightSize(number1: number, number2: number, squad1: squadUnit, squad2: squadUnit): number {
  let fightSize = 0;
  // unit1.squadNumber <= 0 && console.log('Units p1 not found', unit1.squadNumber);
  // unit2.squadNumber <= 0 && console.log('Units p2 not found', unit2.squadNumber);

  if (number1 * squad1.size <= number2 * squad2.size) {
    fightSize = number1 * squad1.size;
  } else {
    fightSize = number2 * squad2.size;
  }
  // console.log(fightSize);

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
  const lossesPlayer1 =
    Math.floor((((attack2 * fightSize) / unit1.size + distanceAttackBonus2) / unit1.health) * 100) / 100;
  const lossesPlayer2 =
    Math.floor((((attack1 * fightSize) / unit1.size + distanceAttackBonus1) / unit2.health) * 100) / 100;

  return { lossesPlayer1, lossesPlayer2 };
}

function getDistanceAttackBonus(flank: [FlankRow], currentRow: number, fightSize: number) {
  // расчёт лучников
  let remainsSizeArcher = fightSize;
  let archerNumber = 0;
  let bonus = 0;
  for (let row = currentRow + 1; row < 5; row++) {
    if (flank[row].squadUnit.bow) {
      const { squadNumber, size, distanceAttack } = flank[row].squadUnit;
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

export function getSuperior(squadUnit1: squadUnit, squadUnit2: squadUnit, number1: number, number2: number) {
  const superior1 = number1 * squadUnit1.morality <= (number2 * squadUnit1.morality) / 10;
  const superior2 = number2 * squadUnit2.morality <= (number1 * squadUnit2.morality) / 10;

  return { superior1, superior2 };
}

export function getMoral(
  currentUnits1: number,
  currentUnits2: number,
  squadNumber1: number,
  squadNumber2: number,
  morality1: number,
  morality2: number,
) {
  const moral1 = currentUnits1 <= (squadNumber1 * (100 - morality1)) / 100;
  const moral2 = currentUnits2 <= (squadNumber2 * (100 - morality2)) / 100;
  return { moral1, moral2 };
}

export function fight(
  flank1: [FlankRow],
  flank2: [FlankRow],
  row1: number,
  row2: number,
  number1: number,
  number2: number,
) {
  const { squadUnit: squad1, squadHero: hero1 } = flank1[row1];
  const { squadUnit: squad2, squadHero: hero2 } = flank2[row2];

  // const squadNumber1 = Number(currentUnitsFlank1 ? currentUnitsFlank1 : squad1.squadNumber);
  // const squadNumber2 = Number(currentUnitsFlank2 ? currentUnitsFlank2 : squad2.squadNumber);

  const fightSize = getFightSize(number1, number2, squad1, squad2);
  const distanceAttackBonus1 = getDistanceAttackBonus(flank1, row1, fightSize);
  const distanceAttackBonus2 = getDistanceAttackBonus(flank2, row2, fightSize);

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

  const alive1 = Math.floor((number1 - lossesPlayer1 > 0 ? number1 - lossesPlayer1 : 0) * 100) / 100;
  const alive2 = Math.floor((number2 - lossesPlayer2 > 0 ? number2 - lossesPlayer2 : 0) * 100) / 100;

  return { alive1, alive2, lossesPlayer1, lossesPlayer2 };
}

export function getResultRoundFight(
  flank1: [FlankRow],
  flank2: [FlankRow],
  flankRow1: number,
  flankRow2: number,
  currentUnits1: number | undefined,
  currentUnits2: number | undefined,
  flankName1: string,
  flankName2: string,
) {
  let status = 'Идёт бой';
  const squadUnit1 = flank1[flankRow1].squadUnit;
  const squadUnit2 = flank2[flankRow2].squadUnit;

  const squadNumber1 = currentUnits1 ? currentUnits1 : squadUnit1.squadNumber;
  const squadNumber2 = currentUnits2 ? currentUnits2 : squadUnit2.squadNumber;

  if (squadNumber1 === 0 || squadNumber2 === 0) {
    if (squadNumber1 === 0) {
      status = 'войск игрока 1 не обнаружено';
      flankRow1++;
    }
    if (squadNumber2 === 0) {
      status = 'войск игрока 2 не обнаружено';
      flankRow2++;
    }
    if (squadNumber1 === 0 && squadNumber2 === 0) {
      status = 'войск не обнаружено';
      flankRow1++;
      flankRow2++;
    }
    return {
      name1: squadUnit1.name,
      name2: squadUnit2.name,
      number1: squadNumber1,
      number2: squadNumber2,
      losses1: 0,
      losses2: 0,
      alive1: 0,
      alive2: 0,
      flankRow1,
      flankRow2,
      flankName1,
      flankName2,
      status,
    };
  } else {
    let { superior1, superior2 } = getSuperior(squadUnit1, squadUnit2, squadNumber1, squadNumber2);
    if (superior1 || superior2) {
      if (superior1) {
        flankRow1++;
        superior1 = false;
        status = 'Численный перевес у Ирока 2';
      }
      if (superior2) {
        flankRow2++;
        superior2 = false;
        status = 'Численный перевес у Ирока 1';
      }
    }
    const { alive1, alive2, lossesPlayer1, lossesPlayer2 } = fight(
      flank1,
      flank2,
      flankRow1,
      flankRow2,
      squadNumber1,
      squadNumber2,
    );

    const { moral1, moral2 } = getMoral(
      squadNumber1,
      squadNumber2,
      squadUnit1.squadNumber,
      squadUnit2.squadNumber,
      flank1[flankRow1].squadUnit.morality,
      flank2[flankRow2].squadUnit.morality,
    );

    if (moral1 && !moral2) {
      status = `${alive1} ${squadUnit1.name} игрока 1 отступают`;
      flankRow1++;
    }
    if (moral2 && !moral1) {
      status = `${alive2} ${squadUnit2.name} игрока 2 отступают`;
      flankRow2++;
    }

    if (moral1 && moral2) {
      status = `Оба отряда отступают`;
      flankRow1++;
      flankRow2++;
    }

    return {
      name1: squadUnit1.name,
      name2: squadUnit2.name,
      number1: squadNumber1,
      number2: squadNumber2,
      losses1: lossesPlayer1,
      losses2: lossesPlayer2,
      alive1,
      alive2,
      flankRow1,
      flankRow2,
      flankName1,
      flankName2,
      status,
    };
  }

  // if (superior1 || superior2) {
  //   if (superior1) {
  //     flankRow1++;
  //     superior1 = false;
  //     status = 'Численный перевес у Ирока 2';
  //   }
  //   if (superior2) {
  //     flankRow2++;
  //     superior2 = false;
  //     status = 'Численный перевес у Ирока 1';
  //   }

  //   const alive1 = squadNumber1;
  //   const alive2 = squadNumber2;

  //   return {
  //     name1: squadUnit1.name,
  //     name2: squadUnit2.name,
  //     number1: squadNumber1,
  //     number2: squadNumber2,
  //     alive1,
  //     alive2,
  //     flankRow1,
  //     flankRow2,
  //     flankName1,
  //     flankName2,
  //     status,
  //   };
  // } else {

  // Проверка морали, если не проходит то берём следующий ряд, если проходит то подставляем выживших юнитов
}
