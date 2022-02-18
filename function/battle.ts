import { LogData } from '../components/logs';
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
  cavalryDefense: number;
  swordDefense: number;
  spearDefense: number;
  squadNumber: number;
  squadAlive: number;
  squadLosses: number;
}

export interface FlankRow {
  squadUnit: squadUnit;
  squadHero: Hero;
  squadFlank: string;
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

export function battle(unitData: ParseData): { logsData: LogData[]; unitData: ParseData } {
  const logsData = [] as unknown as LogData[];
  const roundNumber = 20;
  const flankRows1 = {
    right: 0,
    left: 0,
    center: 0,
    defence: 0,
  };
  const flankRows2 = {
    right: 0,
    left: 0,
    center: 0,
    defence: 0,
  };

  enum FightPlace {
    front = 'front',
    defence1 = 'defence1',
    defence2 = 'defence2',
  }
  enum Flank {
    center = 'center',
    right = 'right',
    left = 'left',
    defence = 'defence',
  }

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
  ) {
    const flankName1 = `${flankData1[row1]?.squadFlank}1`;
    const flankName2 = `${flankData2[row2]?.squadFlank}2`;

    if (row1 < 5 && row2 < 5) {
      const result = getResultRoundFight(flankData1, flankData2, row1, row2, flankName1, flankName2);

      const { flankRow1, flankRow2, alive1, alive2 } = result;

      // нужно как стартовые войска в 1 раунде и остальных
      const number1 = unitData.player1[place1][row1].squadUnit.squadAlive;
      const number2 = unitData.player2[place2][row2].squadUnit.squadAlive;

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

        // расчёт ряда, чтоб не превышал 5
        // row1: flankRows.centerFlank1 < 5 ? flankRows.centerFlank1 : 4,
        // row2: flankRows.centerFlank2 < 5 ? flankRows.centerFlank2 : 4,
        ...result,
      });
      // console.log(`if ${round}`);

      return { flankRow1, flankRow2 };
    } else {
      // flankRows.centerFlank1 === 5 && console.log('Победа по центру у игрка 2');
      // flankRows.centerFlank2 === 5 && console.log('Победа по центру у игрка 1');
      // console.log(`else ${round}`);

      return { flankRow1: row1, flankRow2: row2 };
    }
  }

  for (let round = 1; round <= roundNumber; round++) {
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
          );
          flankRows1.defence = defenceFlank1;
          flankRows2.center = centerFlank2;
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
          );
          flankRows1.center = centerFlank1;
          flankRows2.defence = defenceFlank2;
        }
        break;
    }
    // switch (leftFightPlase) {
    //   case FightPlace.front: {
    //     const { flankRow1: leftFlank1, flankRow2: leftFlank2 } = flankFight(
    //       player1.left,
    //       player2.left,
    //       flankRows1.left,
    //       flankRows2.left,
    //       round,
    //       Flank.left,
    //       Flank.left,
    //     );
    //     flankRows1.left = leftFlank1;
    //     flankRows2.left = leftFlank2;
    //   }
    // }

    // const { flankRow1: leftFlank1, flankRow2: leftFlank2 } = flankFight(
    //   player1.left,
    //   player2.left,
    //   flankRows1.left,
    //   flankRows2.left,
    //   round,
    //   placeBattle1.left,
    //   placeBattle2.left,
    // );
    // flankRows1.left = leftFlank1;
    // flankRows2.left = leftFlank2;

    //   const { flankRow1: centerFlank1, flankRow2: centerFlank2 } = flankFight(
    //     player1.center,
    //     player2.center,
    //     flankRows1.center,
    //     flankRows2.center,
    //     round,
    //   );
    //   flankRows1.center = centerFlank1;
    //   flankRows2.center = centerFlank2;
  }
  console.log(unitData);

  return { logsData, unitData };
  // setLogData(logsData);
}
