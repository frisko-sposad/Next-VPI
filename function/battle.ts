import { Hero } from "../public/database/heroes-data";
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

interface Row { squadUnit: squadUnit, squadHero: Hero }

interface Flank {
  center: [Row];
  defence: [Row],
  left: [Row],
  right: [Row],
}

export interface ParseData {
  player1: Flank,
  player2: Flank,

}

function getAttackBonus(unit1: squadUnit, unit2: squadUnit, hero1: Hero, hero2: Hero) {


  // проверяем какое оружие у врага и даём бонус против этого оружия
  const weaponBonus1 = (unit2.weapon === Weapon.sword) ?
    unit1.attackSwordsman * hero1.attackSwordsman :
    unit1.attackSpearman * hero1.attackSpearman;
  const weaponBonus2 = (unit1.weapon === Weapon.sword) ?
    unit2.attackSwordsman * hero2.attackSwordsman :
    unit2.attackSpearman * hero2.attackSpearman;

  // проверяем если враг на коне, даём бонус против конницы
  const attackOnCavalryBonus1 = unit2.horse && unit1.attackHorseman * hero1.attackHorseman;
  const attackOnCavalryBonus2 = unit1.horse && unit2.attackHorseman * hero2.attackHorseman;


  // суммарная атака, если нет бонуса против конницы то действует бонус против оружия
  const attack1 = (unit1.attack + hero1.attackBonus) * (attackOnCavalryBonus1 ? attackOnCavalryBonus1 : weaponBonus1);
  const attack2 = (unit2.attack + hero2.attackBonus) * (attackOnCavalryBonus2 ? attackOnCavalryBonus2 : weaponBonus2);

  return { attack1, attack2 }
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
  }
  return fightSize;
}

function getLosses(unit1: squadUnit, unit2: squadUnit, fightSize: number, attack1: number, attack2: number) {
  // расчёт потерь с 2 знаками после запятой
  console.log(attack1, attack2);

  const lossesPlayer1 = Math.floor(attack2 * fightSize / unit1.health * 100) / 100;
  const lossesPlayer2 = Math.floor(attack1 * fightSize / unit2.health * 100) / 100;
  return { lossesPlayer1, lossesPlayer2 }
}

function fight(
  { squadUnit: squad1, squadHero: hero1 }: Row,
  { squadUnit: squad2, squadHero: hero2 }: Row,
  currentUnitsCenter1?: number,
  currentUnitsCenter2?: number,
) {

  const squadNumber1 = Number(currentUnitsCenter1 ? currentUnitsCenter1 : squad1.squadNumber);
  const squadNumber2 = Number(currentUnitsCenter2 ? currentUnitsCenter2 : squad2.squadNumber);

  const fightSize = getFightSize(squad1, squad2);
  const { attack1, attack2 } = getAttackBonus(squad1, squad2, hero1, hero2);
  const { lossesPlayer1, lossesPlayer2 } = getLosses(squad1, squad2, fightSize, attack1, attack2);


  console.log(
    squadNumber1, squad1.name, "против", squadNumber2, squad2.name,
    "потери:", lossesPlayer1, lossesPlayer2, "attack", attack1, attack2);
  // const unitNumberFirstPlayer = Math.round(fightSize / squad1.size);
  // const unitNumberSecondPlayer = Math.round(fightSize / squad2.size);

  const aliveUnits1 = Math.floor((squadNumber1 - lossesPlayer1) * 100) / 100;
  const aliveUnits2 = Math.floor((squadNumber2 - lossesPlayer2) * 100) / 100;

  return { aliveUnits1, aliveUnits2 };
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
  }

  const { player1: {
    center: center1,
    right: right1,
    left: left1,
    defence: defence1,
  },
    player2: {
      center: center2,
      right: right2,
      left: left2,
      defence: defence2,
    } } = unitData;

  let currentUnitsCenter1;
  let currentUnitsCenter2;

  for (let round = 1; round <= roundNumber; round++) {
    if (flankRows.centerFlank1 < 5 && flankRows.centerFlank2 < 5) {

      console.log("round", round, "flank", flankRows.centerFlank1 + 1, flankRows.centerFlank2 + 1);


      const startUnit1 = center1[flankRows.centerFlank1].squadUnit.squadNumber;
      const startUnit2 = center2[flankRows.centerFlank2].squadUnit.squadNumber;

      const { aliveUnits1, aliveUnits2 } = fight(
        center1[flankRows.centerFlank1],
        center2[flankRows.centerFlank2],
        currentUnitsCenter1,
        currentUnitsCenter2,
      );

      currentUnitsCenter1 = aliveUnits1;
      currentUnitsCenter2 = aliveUnits2;

      const moral1 = currentUnitsCenter1 < startUnit1 * (100 - center1[flankRows.centerFlank1].squadUnit.morality) / 100;
      const moral2 = currentUnitsCenter2 < startUnit2 * (100 - center2[flankRows.centerFlank1].squadUnit.morality) / 100;

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

