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
  defense: [FlankRow];
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
  const Player1flankRows = {
    right: 0,
    left: 0,
    center: 0,
    defense: 0,
  };
  const Player2flankRows = {
    right: 0,
    left: 0,
    center: 0,
    defense: 0,
  };

  enum FightPlace {
    front = 'front',
    defense1 = 'defense1',
    defence2 = 'defence2',
  }
  enum Flank {
    center = 'center',
    right = 'right',
    left = 'left',
    defense = 'defense',
  }

  const placeBattle1 = {
    center: Flank.center,
    right: Flank.right,
    left: Flank.left,
    defense: Flank.defense,
  };
  const placeBattle2 = {
    center: Flank.center,
    right: Flank.right,
    left: Flank.left,
    defense: Flank.defense,
  };

  let rightFightPlase = FightPlace.front;
  let leftFightPlase = FightPlace.front;
  let centerFightPlase = FightPlace.front;

  const { player1, player2 } = unitData;

  function flankFight(
    flank1: [FlankRow],
    flank2: [FlankRow],
    row1: number,
    row2: number,
    round: number,
    place1: string,
    place2: string,
  ) {
    const flankName1 = `${flank1[row1]?.squadFlank}1`;
    const flankName2 = `${flank2[row2]?.squadFlank}2`;

    if (row1 < 5 && row2 < 5) {
      const result = getResultRoundFight(flank1, flank2, row1, row2, flankName1, flankName2);

      const { flankRow1, flankRow2, alive1, alive2 } = result;

      console.log(result);

      unitData.player1[place1][row1].squadUnit.squadAlive = alive1;
      unitData.player2[place2][row2].squadUnit.squadAlive = alive2;
      unitData.player1[place1][row1].squadUnit.squadLosses =
        unitData.player1[place1][row1].squadUnit.squadNumber - alive1;
      unitData.player2[place2][row2].squadUnit.squadLosses =
        unitData.player2[place2][row2].squadUnit.squadNumber - alive2;

      logsData.push({
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
      case FightPlace.front: {
        const { flankRow1: centerFlank1, flankRow2: centerFlank2 } = flankFight(
          player1.center,
          player2.center,
          Player1flankRows.center,
          Player2flankRows.center,
          round,
          placeBattle1.center,
          placeBattle2.center,
        );
        Player1flankRows.center = centerFlank1;
        Player2flankRows.center = centerFlank2;
      }
    }
    switch (leftFightPlase) {
      case FightPlace.front: {
        const { flankRow1: leftFlank1, flankRow2: leftFlank2 } = flankFight(
          player1.left,
          player2.left,
          Player1flankRows.left,
          Player2flankRows.left,
          round,
          placeBattle1.left,
          placeBattle2.left,
        );
        Player1flankRows.left = leftFlank1;
        Player2flankRows.left = leftFlank2;
      }
    }

    // const { flankRow1: leftFlank1, flankRow2: leftFlank2 } = flankFight(
    //   player1.left,
    //   player2.left,
    //   Player1flankRows.left,
    //   Player2flankRows.left,
    //   round,
    //   placeBattle1.left,
    //   placeBattle2.left,
    // );
    // Player1flankRows.left = leftFlank1;
    // Player2flankRows.left = leftFlank2;

    //   const { flankRow1: centerFlank1, flankRow2: centerFlank2 } = flankFight(
    //     player1.center,
    //     player2.center,
    //     Player1flankRows.center,
    //     Player2flankRows.center,
    //     round,
    //   );
    //   Player1flankRows.center = centerFlank1;
    //   Player2flankRows.center = centerFlank2;
  }
  console.log(unitData);

  return { logsData, unitData };
  // setLogData(logsData);
}
