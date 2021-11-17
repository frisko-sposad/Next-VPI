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

export function battle(unitData: ParseData) {
  const { player1, player2 } = unitData;
  fight(player1.center[0], player2.center[0]);
}

function fight(squad1: Row, squad2: Row) {
  // console.log("squad1", squad1, "squad2", squad2);
  let fightSize = 0;
  squad1.squadUnit.squadNumber <= 0 && console.log("Units p1 not found", squad1.squadUnit.squadNumber)
  squad2.squadUnit.squadNumber <= 0 && console.log("Units p2 not found", squad2.squadUnit.squadNumber)


  if (squad1.squadUnit.squadNumber * squad1.squadUnit.size <= squad2.squadUnit.squadNumber * squad2.squadUnit.size) {
    fightSize = squad1.squadUnit.squadNumber * squad1.squadUnit.size
  }
  else {
    fightSize = squad2.squadUnit.squadNumber * squad2.squadUnit.size
  };

  const unitNumberFirstPlayer = Math.round(fightSize / squad1.squadUnit.size);
  const unitNumberSecondPlayer = Math.round(fightSize / squad2.squadUnit.size);
  // console.log(unitNumberFirstPlayer, "-", unitNumberSecondPlayer);

  const bonuses = getAttackBonus(squad1.squadUnit, squad2.squadUnit)
  console.log(bonuses);

}

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
