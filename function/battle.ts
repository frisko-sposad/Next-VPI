interface squadUnit {
  id: number;
  name: string;
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

interface Front {
  center: [squadUnit, squadHero];
  defence: [squadUnit, squadHero],
  left: [squadUnit, squadHero],
  right: [squadUnit, squadHero],
}

interface ParseData {
  player1: Front,
  player2: Front,

}

export function battle(unitData: ParseData) {
  const { player1, player2 } = unitData;
  fight(player1.center[0], player2.center[0]);
}

function fight(squad1, squad2) {
  console.log("squad1", squad1, "squad2", squad2);
  let fightSize = 0;
  squad1.squadUnit.squadNumber <= 0 && console.log("Units p1 not found", squad1.squadUnit.squadNumber)
  squad2.squadUnit.squadNumber <= 0 && console.log("Units p2 not found", squad2.squadUnit.squadNumber)




  if (squad1.squadUnit.squadNumber * squad1.squadUnit.size <= squad2.squadUnit.squadNumber * squad2.squadUnit.size) {
    fightSize = squad1.squadUnit.squadNumber * squad1.squadUnit.size
  }
  else {
    fightSize = squad2.squadUnit.squadNumber * squad2.squadUnit.size
  };
  console.log("fightSize:", fightSize);

}