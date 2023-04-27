import { Fortification, fortificationData } from '../public/database/fortification-data';
import { Hero } from '../public/database/heroes-data';
import { Weapon } from '../public/database/units-data';
import { Direction, Flank, FlankRow, squadUnit } from './battle';

function getAttackBonus(
  unit1: squadUnit,
  unit2: squadUnit,
  hero1: Hero,
  hero2: Hero,
  place1: Flank,
  place2: Flank,
  fortification1: Fortification,
  fortification2: Fortification,
) {
  // проверяем какое оружие у врага и даём бонус против этого оружия
  // const weaponBonus1 =
  //   unit2.weapon === Weapon.sword
  //     ? unit1.attackSwordsman * hero1.attackSwordsman
  //     : unit1.attackSpearman * hero1.attackSpearman;
  // const weaponBonus2 =
  //   unit1.weapon === Weapon.sword
  //     ? unit2.attackSwordsman * hero2.attackSwordsman
  //     : unit2.attackSpearman * hero2.attackSpearman;
  // const attackSwordsman1 = fortification1 ? fortification1.attackSwordsman : 1;

  const {
    attackSwordsman: attackSwordsman1 = 1,
    defenseSword: defenseSword1 = 1,
    attackSpearman: attackSpearman1 = 1,
    defenseSpear: defenseSpear1 = 1,
    attackHorseman: attackHorseman1 = 1,
    defenseHorseman: defenseHorseman1 = 1,
    attackBonus: attackBonus1 = 0,
  } = fortification1 ? fortification1 : fortificationData[0];
  const {
    attackSwordsman: attackSwordsman2 = 1,
    defenseSword: defenseSword2 = 1,
    attackSpearman: attackSpearman2 = 1,
    defenseSpear: defenseSpear2 = 1,
    attackHorseman: attackHorseman2 = 1,
    defenseHorseman: defenseHorseman2 = 1,
    attackBonus: attackBonus2 = 0,
  } = fortification2 ? fortification2 : fortificationData[0];

  let weaponBonus1;
  if (unit2.weapon === Weapon.sword)
    weaponBonus1 =
      place1 !== Flank.defence
        ? unit1.attackSwordsman * hero1.attackSwordsman * attackSwordsman1
        : unit1.defenseSword * hero1.defenseSword * defenseSword1;
  else
    weaponBonus1 =
      place1 !== Flank.defence
        ? unit1.attackSpearman * hero1.attackSpearman * attackSpearman1
        : unit1.defenseSpear * hero1.defenseSpear * defenseSpear1;

  let weaponBonus2;
  if (unit1.weapon === Weapon.sword)
    weaponBonus2 =
      place2 !== Flank.defence
        ? unit2.attackSwordsman * hero2.attackSwordsman * attackSwordsman2
        : unit2.defenseSword * hero2.defenseSword * defenseSword2;
  else
    weaponBonus2 =
      place2 !== Flank.defence
        ? unit2.attackSpearman * hero2.attackSpearman * attackSpearman2
        : unit2.defenseSpear * hero2.defenseSpear * defenseSpear2;

  const horseManBonus1 =
    place1 !== Flank.defence
      ? unit1.attackHorseman * hero1.attackHorseman * attackHorseman1
      : unit1.defenseHorseman * hero1.defenseHorseman * defenseHorseman1;
  const horseManBonus2 =
    place2 !== Flank.defence
      ? unit2.attackHorseman * hero2.attackHorseman * attackHorseman2
      : unit2.defenseHorseman * hero2.defenseHorseman * defenseHorseman2;

  // проверяем если враг на коне, даём бонус против конницы иначе против типа оружия
  const attackOnCavalryBonus1 = unit2.horse && horseManBonus1;
  const attackOnCavalryBonus2 = unit1.horse && horseManBonus2;

  // суммарная атака, если нет бонуса против конницы то действует бонус против оружия
  const attack1 =
    (unit1.attack + hero1.attackBonus + attackBonus1) * (attackOnCavalryBonus1 ? attackOnCavalryBonus1 : weaponBonus1);
  const attack2 =
    (unit2.attack + hero2.attackBonus + attackBonus2) * (attackOnCavalryBonus2 ? attackOnCavalryBonus2 : weaponBonus2);

  return { attack1, attack2 };
}

function getFightSize(number1: number, number2: number, squad1: squadUnit, squad2: squadUnit): number {
  let fightSize = 0;

  if (number1 * squad1.size <= number2 * squad2.size) {
    fightSize = number1 * squad1.size;
  } else {
    fightSize = number2 * squad2.size;
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
  const lossesPlayer1 =
    Math.floor((((attack2 * fightSize) / unit1.size + distanceAttackBonus2) / unit1.health) * 100) / 100;
  const lossesPlayer2 =
    Math.floor((((attack1 * fightSize) / unit2.size + distanceAttackBonus1) / unit2.health) * 100) / 100;

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

export function fight(
  flank1: [FlankRow],
  flank2: [FlankRow],
  row1: number,
  row2: number,
  number1: number,
  number2: number,
  place1: Flank,
  place2: Flank,
) {
  const { squadUnit: squad1, squadHero: hero1, squadFortification: fortification1 } = flank1[row1];
  const { squadUnit: squad2, squadHero: hero2, squadFortification: fortification2 } = flank2[row2];

  // const squadNumber1 = Number(currentUnitsFlank1 ? currentUnitsFlank1 : squad1.squadNumber);
  // const squadNumber2 = Number(currentUnitsFlank2 ? currentUnitsFlank2 : squad2.squadNumber);

  const fightSize = getFightSize(number1, number2, squad1, squad2);
  const distanceAttackBonus1 = getDistanceAttackBonus(flank1, row1, fightSize);
  const distanceAttackBonus2 = getDistanceAttackBonus(flank2, row2, fightSize);

  const { attack1, attack2 } = getAttackBonus(
    squad1,
    squad2,
    hero1,
    hero2,
    place1,
    place2,
    fortification1,
    fortification2,
  );

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

let status = 'То что не должно выводиться';

function getIsFight(
  number1: number,
  number2: number,
  row1: number,
  row2: number,
  morality1: number,
  morality2: number,
  name1: string,
  name2: string,
  alive1: number,
  alive2: number,
  flankName1: string,
  flankName2: string,
  direction1: Direction,
  direction2: Direction,
  ready1: boolean,
  ready2: boolean,
  moralityBonus1: number,
  moralityBonus2: number,
) {
  const allMorality1 = morality1 + moralityBonus1;
  const allMorality2 = morality2 + moralityBonus2;

  status = 'Идёт бой';
  let isFight = true;
  if (number1 === 0 || number2 === 0) {
    isFight = false;
    if (number1 === 0 && number2 === 0) {
      status = 'Войск не обнаружено.';
      direction1 === Direction.inOrder ? row1++ : row1--;
      direction2 === Direction.inOrder ? row2++ : row2--;
    } else {
      if (number1 === 0) {
        status = 'Войск игрока 1 не обнаружено.';
        direction1 === Direction.inOrder ? row1++ : row1--;
      }
      if (number2 === 0) {
        status = 'Войск игрока 2 не обнаружено.';
        direction2 === Direction.inOrder ? row2++ : row2--;
      }

      if (row1 >= 4) {
        status = status + ' Победа игрока 2!';
      }
      if (row2 >= 4) {
        status = status + ' Победа игрока 1!';
      }
    }
  } else {
    const superior1 = alive1 * allMorality1 <= (number2 * allMorality1) / 10;
    const superior2 = alive2 * allMorality2 <= (number1 * allMorality2) / 10;

    if (superior1 || superior2) {
      isFight = false;
      if (superior1) {
        status = 'Численный перевес у Ирока 2.';
        direction1 === Direction.inOrder ? row1++ : row1--;
        ready1 = false;
      }
      if (superior2) {
        status = 'Численный перевес у Ирока 1.';
        direction2 === Direction.inOrder ? row2++ : row2--;
        ready2 = false;
      }
    } else {
      const moral1 = alive1 <= (number1 * (100 - allMorality1)) / 100;
      const moral2 = alive2 <= (number2 * (100 - allMorality2)) / 100;

      if (moral1 && !moral2) {
        status = `${name1} игрока 1 отступают.`;
        direction1 === Direction.inOrder ? row1++ : row1--;
        isFight = false;
        ready1 = false;
      }
      if (moral2 && !moral1) {
        status = `${name2} игрока 2 отступают.`;
        direction2 === Direction.inOrder ? row2++ : row2--;
        isFight = false;
        ready2 = false;
      }

      if (moral1 && moral2) {
        status = `Оба отряда отступают.`;
        direction1 === Direction.inOrder ? row1++ : row1--;
        direction2 === Direction.inOrder ? row2++ : row2--;
        isFight = false;
        ready1 = false;
        ready2 = false;
      }
    }

    if (direction1 === Direction.inOrder && row1 >= 4) {
      status = status + ' Победа игрока 2 inOrder!';
    }
    if (direction2 === Direction.inOrder && row2 >= 4) {
      status = status + ' Победа игрока 1 inOrder!';
    }
    if (direction1 === Direction.inReverse && row1 <= 0) {
      status = status + ' Победа игрока 2 inReverse!';
    }
    if (direction2 === Direction.inReverse && row2 <= 0) {
      status = status + ' Победа игрока 1 inReverse!';
    }
  }

  if (row1 == 5 && row2 == 5) {
    status = `Ничья на ${flankName1}-${flankName2}`;
  }

  return { row1, row2, isFight, ready1, ready2 };
}

export function getResultRoundFight(
  flank1: [FlankRow],
  flank2: [FlankRow],
  flankRow1: number,
  flankRow2: number,
  flankName1: string,
  flankName2: string,
  direction1: Direction,
  direction2: Direction,
  place1: Flank,
  place2: Flank,
) {
  const squadUnit1 = flank1[flankRow1].squadUnit;
  const squadUnit2 = flank2[flankRow2].squadUnit;

  const moralityBonus1 = flank1[0].squadHero.moralityBonus;
  const moralityBonus2 = flank2[0].squadHero.moralityBonus;

  const { row1, row2, isFight, ready1, ready2 } = getIsFight(
    squadUnit1.squadNumber,
    squadUnit2.squadNumber,
    flankRow1,
    flankRow2,
    squadUnit1.morality,
    squadUnit2.morality,
    squadUnit1.name,
    squadUnit2.name,
    squadUnit1.squadAlive,
    squadUnit2.squadAlive,
    flankName1,
    flankName2,
    direction1,
    direction2,
    squadUnit1.ready,
    squadUnit2.ready,
    moralityBonus1,
    moralityBonus2,
  );

  if (!isFight || !ready1 || !ready2) {
    return {
      name1: squadUnit1.name,
      name2: squadUnit2.name,
      losses1: 0,
      losses2: 0,
      alive1: squadUnit1.squadAlive,
      alive2: squadUnit2.squadAlive,
      flankRow1: row1,
      flankRow2: row2,
      flankName1,
      flankName2,
      status,
      ready1,
      ready2,
    };
  } else {
    const { alive1, alive2, lossesPlayer1, lossesPlayer2 } = fight(
      flank1,
      flank2,
      flankRow1,
      flankRow2,
      squadUnit1.squadAlive,
      squadUnit2.squadAlive,
      place1,
      place2,
    );

    return {
      name1: squadUnit1.name,
      name2: squadUnit2.name,
      losses1: lossesPlayer1,
      losses2: lossesPlayer2,
      alive1,
      alive2,
      flankRow1,
      flankRow2,
      flankName1,
      flankName2,
      status,
      ready1,
      ready2,
    };
  }
}
