import { Weapon } from "../public/database/units-data";

interface squadUnit {
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

interface squadHero {
  attackBonus: number;
  cavalryAttackBonus: number;
  heroName: string;
  id: number;
  spearAttackBonus: number;
  swordAttackBonus: number;
}

interface Row { squadUnit: squadUnit, squadHero: squadHero }

interface Front {
  center: [Row];
  defence: [Row],
  left: [Row],
  right: [Row],
}

interface ParseData {
  player1: Front,
  player2: Front,

}

let unitsCurrentCenter1;
let unitsCurrentCenter2;

function getAttackBonus(unit1: squadUnit, unit2: squadUnit) {

  // проверяем какое оружие у врага и даём бонус против этого оружия
  const weaponBonus1 = (unit2.weapon === Weapon.sword) ? unit1.attackSwordsman : unit1.attackSpearman;
  const weaponBonus2 = (unit1.weapon === Weapon.sword) ? unit2.attackSwordsman : unit2.attackSpearman;

  // проверяем если враг на коне, даём бонус против конницы
  const attackOnCavalryBonus1 = unit2.horse && unit1.attackHorseman;
  const attackOnCavalryBonus2 = unit1.horse && unit2.attackHorseman;

  // суммарная атака, если нет бонуса против конницы то действует бонус против оружия
  const attack1 = unit1.attack * (attackOnCavalryBonus1 ? attackOnCavalryBonus1 : weaponBonus1);
  const attack2 = unit2.attack * (attackOnCavalryBonus2 ? attackOnCavalryBonus2 : weaponBonus2);

  return { weaponBonus1, attackOnCavalryBonus1, weaponBonus2, attackOnCavalryBonus2, attack1, attack2 }
}

function getFightSize(unit1: squadUnit, unit2: squadUnit): number {
  let fightSize = 0;
  unit1.squadNumber <= 0 && console.log("Units p1 not found", unit1.squadNumber)
  unit2.squadNumber <= 0 && console.log("Units p2 not found", unit2.squadNumber)


  if (unit1.squadNumber * unit1.size <= unit2.squadNumber * unit2.size) {
    fightSize = unit1.squadNumber * unit1.size;
  }
  else {
    fightSize = unit2.squadNumber * unit2.size;
  };
  return fightSize;
}

function getLosses(unit1: squadUnit, unit2: squadUnit, fightSize: number) {
  // расчёт потерь с 2 знаками после запяток
  const lossesPlayer1 = Math.floor(unit2.attack * fightSize / unit1.health * 100) / 100;
  const lossesPlayer2 = Math.floor(unit1.attack * fightSize / unit2.health * 100) / 100;
  return { lossesPlayer1, lossesPlayer2 }
}



function fight({ squadUnit: squadUnit1 }: Row, { squadUnit: squadUnit2 }: Row) {
  // console.log("squad1", squad1, "squad2", squad2);

  const { squadNumber: squadNumber1, morality: morality1 } = squadUnit1;
  const { squadNumber: squadNumber2, morality: morality2 } = squadUnit2;

  const fightSize = getFightSize(squadUnit1, squadUnit2);
  const bonuses = getAttackBonus(squadUnit1, squadUnit2);
  const { lossesPlayer1, lossesPlayer2 } = getLosses(squadUnit1, squadUnit2, fightSize)

  const unitNumberFirstPlayer = Math.round(fightSize / squadUnit1.size);
  const unitNumberSecondPlayer = Math.round(fightSize / squadUnit2.size);

  const aliveUnits1 = squadNumber1 - lossesPlayer1;
  const aliveUnits2 = squadNumber2 - lossesPlayer2;

  const moral1 = aliveUnits1 < squadNumber1 * (100 - morality1) / 100;
  const moral2 = aliveUnits2 < squadNumber2 * (100 - morality2) / 100;

  unitsCurrentCenter1 = aliveUnits1;
  unitsCurrentCenter2 = aliveUnits2;

  // console.log(unitNumberFirstPlayer, "-", unitNumberSecondPlayer);
  console.log({ fightSize, unitNumberFirstPlayer, unitNumberSecondPlayer, lossesPlayer1, lossesPlayer2, aliveUnits1, aliveUnits2, moral1, moral2 });

}

export function battle(unitData: ParseData) {
  const { player1: { center: center1 }, player2: { center: center2 } } = unitData;
  let unitsStartCenter1 = center1[0].squadUnit.squadNumber;
  let unitsStartCenter2 = center2[0].squadUnit.squadNumber;
  unitsCurrentCenter1 = center1[0].squadUnit.squadNumber;
  unitsCurrentCenter2 = center2[0].squadUnit.squadNumber;

  fight(center1[0], center2[0]);

  console.log({ unitsStartCenter1, unitsCurrentCenter1, unitsStartCenter2, unitsCurrentCenter2 });

}

