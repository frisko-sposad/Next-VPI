import { LogData } from '../components/Calculator/logs';
import { Fortification } from '../public/database/fortification-data';
import { Hero } from '../public/database/heroes-data';
import { squadUnitOld, Weapon } from '../public/database/units-data';
import { getResultRoundFight } from './fight';

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
  defenseHorseman: number;
  defenseSword: number;
  defenseSpear: number;
  squadNumber: number;
  squadAlive: number;
  squadLosses: number;
}

export interface FlankRow {
  squadUnit: squadUnit;
  squadHero: Hero;
  squadFortification: Fortification;
  squadFlank: string;
}

export interface FlankData {
  center: [FlankRow];
  defence: [FlankRow];
  left: [FlankRow];
  right: [FlankRow];
}

export interface ParseData {
  player1: FlankData;
  player2: FlankData;
}

enum FightPlace {
  front = 'front',
  defence1 = 'defence1',
  defence2 = 'defence2',
  notSet = 'notSet',
}

export enum Flank {
  center = 'center',
  right = 'right',
  left = 'left',
  defence = 'defence',
}

export enum Direction {
  inOrder,
  inReverse,
}

export function battle(unitData: ParseData): { logsData: LogData[]; unitData: ParseData } {
  const logsData = [] as unknown as LogData[];
  const roundNumber = 50;
  const flankRows1 = {
    right: 0,
    left: 0,
    center: 0,
    defence: 0,
    defenceReverse: 4,
  };
  const flankRows2 = {
    right: 0,
    left: 0,
    center: 0,
    defence: 0,
    defenceReverse: 4,
  };

  let rightFightPlase = FightPlace.front;
  let leftFightPlase = FightPlace.front;
  let centerFightPlase = FightPlace.front;

  const { player1, player2 } = unitData;

  function flankFight(
    flankData1: [FlankRow],
    flankData2: [FlankRow],
    row1: number,
    row2: number,
    round: number,
    place1: Flank,
    place2: Flank,
    direction1: Direction,
    direction2: Direction,
  ) {
    const flankName1 = `${flankData1[row1]?.squadFlank}`;
    const flankName2 = `${flankData2[row2]?.squadFlank}`;

    if (row1 < 5 && row1 >= 0 && row2 < 5 && row2 >= 0) {
      const result = getResultRoundFight(
        flankData1,
        flankData2,
        row1,
        row2,
        flankName1,
        flankName2,
        direction1,
        direction2,
        place1,
        place2,
      );

      const { flankRow1, flankRow2, alive1, alive2, ready1, ready2 } = result;

      // нужно как стартовые войска в 1 раунде и остальных
      const number1 = unitData.player1[place1][row1].squadUnit.squadAlive;
      const number2 = unitData.player2[place2][row2].squadUnit.squadAlive;

      unitData.player1[place1][row1].squadUnit.ready = ready1;
      unitData.player2[place2][row2].squadUnit.ready = ready2;
      unitData.player1[place1][row1].squadUnit.squadAlive = alive1;
      unitData.player2[place2][row2].squadUnit.squadAlive = alive2;
      unitData.player1[place1][row1].squadUnit.squadLosses = Number(
        (unitData.player1[place1][row1].squadUnit.squadNumber - alive1).toFixed(2),
      );
      unitData.player2[place2][row2].squadUnit.squadLosses = Number(
        (unitData.player2[place2][row2].squadUnit.squadNumber - alive2).toFixed(2),
      );

      logsData.push({
        number1,
        number2,
        round,
        row1,
        row2,
        ...result,
      });

      return { flankRow1, flankRow2 };
    } else {
      return { flankRow1: row1, flankRow2: row2 };
    }
  }

  for (let round = 1; round <= roundNumber; round++) {
    // center
    switch (centerFightPlase) {
      case FightPlace.front:
        {
          const { flankRow1: centerFlank1, flankRow2: centerFlank2 } = flankFight(
            player1.center,
            player2.center,
            flankRows1.center,
            flankRows2.center,
            round,
            Flank.center,
            Flank.center,
            Direction.inOrder,
            Direction.inOrder,
          );
          flankRows1.center = centerFlank1;
          flankRows2.center = centerFlank2;
          if (centerFlank1 === 5) centerFightPlase = FightPlace.defence1;
          if (centerFlank2 === 5) centerFightPlase = FightPlace.defence2;
        }
        break;
      case FightPlace.defence1:
        {
          const { flankRow1: defenceFlank1, flankRow2: centerFlank2 } = flankFight(
            player1.defence,
            player2.center,
            flankRows1.defence,
            flankRows2.center,
            round,
            Flank.defence,
            Flank.center,
            Direction.inOrder,
            Direction.inOrder,
          );
          flankRows1.defence = defenceFlank1;
          flankRows2.center = centerFlank2;
          if (defenceFlank1 === 5) {
            centerFightPlase = FightPlace.notSet;
            rightFightPlase = FightPlace.notSet;
            leftFightPlase = FightPlace.notSet;
          }
        }
        break;
      case FightPlace.defence2:
        {
          const { flankRow1: centerFlank1, flankRow2: defenceFlank2 } = flankFight(
            player1.center,
            player2.defence,
            flankRows1.center,
            flankRows2.defence,
            round,
            Flank.center,
            Flank.defence,
            Direction.inOrder,
            Direction.inOrder,
          );
          flankRows1.center = centerFlank1;
          flankRows2.defence = defenceFlank2;
          if (defenceFlank2 === 5) {
            centerFightPlase = FightPlace.notSet;
            rightFightPlase = FightPlace.notSet;
            leftFightPlase = FightPlace.notSet;
          }
        }
        break;
    }

    // right
    switch (rightFightPlase) {
      case FightPlace.front:
        {
          const { flankRow1: rightFlank1, flankRow2: rightFlank2 } = flankFight(
            player1.right,
            player2.right,
            flankRows1.right,
            flankRows2.right,
            round,
            Flank.right,
            Flank.right,
            Direction.inOrder,
            Direction.inOrder,
          );
          flankRows1.right = rightFlank1;
          flankRows2.right = rightFlank2;
          if (rightFlank1 === 5) rightFightPlase = FightPlace.defence1;
          if (rightFlank2 === 5) rightFightPlase = FightPlace.defence2;
        }
        break;
      case FightPlace.defence1:
        {
          const { flankRow1: defenceFlank1, flankRow2: rightFlank2 } = flankFight(
            player1.defence,
            player2.right,
            flankRows1.defenceReverse,
            flankRows2.right,
            round,
            Flank.defence,
            Flank.right,
            Direction.inReverse,
            Direction.inOrder,
          );
          flankRows1.defenceReverse = defenceFlank1;
          flankRows2.right = rightFlank2;
          if (defenceFlank1 === 5) {
            centerFightPlase = FightPlace.notSet;
            rightFightPlase = FightPlace.notSet;
            leftFightPlase = FightPlace.notSet;
          }
        }
        break;
      case FightPlace.defence2:
        {
          const { flankRow1: rightFlank1, flankRow2: defenceFlank2 } = flankFight(
            player1.right,
            player2.defence,
            flankRows1.right,
            flankRows2.defenceReverse,
            round,
            Flank.right,
            Flank.defence,
            Direction.inOrder,
            Direction.inReverse,
          );
          flankRows1.right = rightFlank1;
          flankRows2.defenceReverse = defenceFlank2;
          if (defenceFlank2 === 5) {
            centerFightPlase = FightPlace.notSet;
            rightFightPlase = FightPlace.notSet;
            leftFightPlase = FightPlace.notSet;
          }
        }
        break;
    }
    // left
    switch (leftFightPlase) {
      case FightPlace.front:
        {
          const { flankRow1: leftFlank1, flankRow2: leftFlank2 } = flankFight(
            player1.left,
            player2.left,
            flankRows1.left,
            flankRows2.left,
            round,
            Flank.left,
            Flank.left,
            Direction.inOrder,
            Direction.inOrder,
          );
          flankRows1.left = leftFlank1;
          flankRows2.left = leftFlank2;
          if (leftFlank1 === 5) leftFightPlase = FightPlace.defence1;
          if (leftFlank2 === 5) leftFightPlase = FightPlace.defence2;
        }
        break;
      case FightPlace.defence1:
        {
          const { flankRow1: defenceFlank1, flankRow2: leftFlank2 } = flankFight(
            player1.defence,
            player2.left,
            flankRows1.defenceReverse,
            flankRows2.left,
            round,
            Flank.defence,
            Flank.left,
            Direction.inReverse,
            Direction.inOrder,
          );
          flankRows1.defenceReverse = defenceFlank1;
          flankRows2.left = leftFlank2;
          if (defenceFlank1 === 5) {
            centerFightPlase = FightPlace.notSet;
            rightFightPlase = FightPlace.notSet;
            leftFightPlase = FightPlace.notSet;
          }
        }
        break;
      case FightPlace.defence2:
        {
          const { flankRow1: leftFlank1, flankRow2: defenceFlank2 } = flankFight(
            player1.left,
            player2.defence,
            flankRows1.left,
            flankRows2.defenceReverse,
            round,
            Flank.left,
            Flank.defence,
            Direction.inOrder,
            Direction.inReverse,
          );
          flankRows1.left = leftFlank1;
          flankRows2.defenceReverse = defenceFlank2;
          if (defenceFlank2 === 5) {
            centerFightPlase = FightPlace.notSet;
            rightFightPlase = FightPlace.notSet;
            leftFightPlase = FightPlace.notSet;
          }
        }
        break;
    }
  }
  // console.log(unitData);

  return { logsData, unitData };
  // setLogData(logsData);
}
