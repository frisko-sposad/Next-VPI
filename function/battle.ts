import { LogData, LogsData } from '../components/logs';
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

export function battle(unitData: ParseData): LogData[] {
  const logsData = [] as unknown as LogsData;
  const roundNumber = 20;
  const flankRows = {
    rightFlank1: 0,
    rightFlank2: 0,
    leftFlank1: 0,
    leftFlank2: 0,
    centerFlank1: 0,
    centerFlank2: 0,
    defenseFlank1: 0,
    defenseFlank2: 0,
  };

  const placeBattle = {
    center: true,
    right: true,
    left: true,
    defense1: false,
    defense2: false,
  };

  const {
    player1: { center: center1, right: right1, left: left1, defense: defense1 },
    player2: { center: center2, right: right2, left: left2, defense: defense2 },
  } = unitData;

  const currentUnit: Record<string, number | undefined> = {
    center1: center1[0].squadUnit.squadNumber,
    center2: center2[0].squadUnit.squadNumber,
    right1: right1[0].squadUnit.squadNumber,
    right2: right2[0].squadUnit.squadNumber,
    left1: left1[0].squadUnit.squadNumber,
    left2: left2[0].squadUnit.squadNumber,
    defense1: defense1[0].squadUnit.squadNumber,
    defense2: defense2[0].squadUnit.squadNumber,
  };
  // console.log(currentUnit);

  function flankFight(
    row1: number,
    row2: number,
    round: number,
    currentUnit1: number | undefined,
    currentUnit2: number | undefined,
  ) {
    console.log({ row1, currentUnit1, row2, currentUnit2 });
    if (row1 < 5 && row2 < 5 && placeBattle) {
      const result = getResultRoundFight(center1, center2, row1, row2, currentUnit1, currentUnit2);

      row1 === result.flankRow1 ? (currentUnit.center1 = result.alive1) : (currentUnit.center1 = 0);
      row2 === result.flankRow2 && result.flankRow2 !== 5
        ? (currentUnit.center2 = result.alive2)
        : (currentUnit.center2 = 0);

      if (result.flankRow1 == 5) {
        console.log('Победа по центру у игрка 2');
        currentUnit.center2 = result.alive2;
      }
      if (result.flankRow2 == 5) {
        console.log('Победа по центру у игрка 1');
        currentUnit.center1 = result.alive1;
      }
      flankRows.centerFlank1 = result.flankRow1;
      flankRows.centerFlank2 = result.flankRow2;

      logsData.push({
        round,
        // расчёт ряда, чтоб не превышал 5
        row1: flankRows.centerFlank1 < 5 ? flankRows.centerFlank1 : 4,
        row2: flankRows.centerFlank2 < 5 ? flankRows.centerFlank2 : 4,
        ...result,
      });
    } else {
      // flankRows.centerFlank1 === 5 && console.log('Победа по центру у игрка 2');
      // flankRows.centerFlank2 === 5 && console.log('Победа по центру у игрка 1');
      placeBattle.center = false;
      placeBattle.defense1 = true;
    }
  }

  for (let round = 1; round <= roundNumber; round++) {
    flankFight(flankRows.centerFlank1, flankRows.centerFlank2, round, currentUnit.center1, currentUnit.center2);

    // if (flankRows.centerFlank1 < 5 && flankRows.centerFlank2 < 5 && placeBattle.center) {
    //   const result = getResultRoundFight(
    //     center1,
    //     center2,
    //     flankRows.centerFlank1,
    //     flankRows.centerFlank2,
    //     currentUnitsCenter1,
    //     currentUnitsCenter2,
    //   );

    //   flankRows.centerFlank1 === result.flankRow1
    //     ? (currentUnitsCenter1 = result.alive1)
    //     : (currentUnitsCenter1 = undefined);
    //   flankRows.centerFlank2 === result.flankRow2 && result.flankRow2 !== 5
    //     ? (currentUnitsCenter2 = result.alive2)
    //     : (currentUnitsCenter2 = undefined);

    //   if (result.flankRow1 == 5) {
    //     console.log('Победа по центру у игрка 2');
    //     currentUnitsCenter2 = result.alive2;
    //   }
    //   if (result.flankRow2 == 5) {
    //     console.log('Победа по центру у игрка 1');
    //     currentUnitsCenter1 = result.alive1;
    //   }

    //   // console.log(round, flankRows.centerFlank2, result.flankRow2, currentUnitsCenter2, result.alive2);

    //   flankRows.centerFlank1 = result.flankRow1;
    //   flankRows.centerFlank2 = result.flankRow2;

    //   logsData.push({
    //     round,
    //     // расчёт ряда, чтоб не превышал 5
    //     row1: flankRows.centerFlank1 < 5 ? flankRows.centerFlank1 : 4,
    //     row2: flankRows.centerFlank2 < 5 ? flankRows.centerFlank2 : 4,
    //     ...result,
    //   });
    // } else {
    //   // flankRows.centerFlank1 === 5 && console.log('Победа по центру у игрка 2');
    //   // flankRows.centerFlank2 === 5 && console.log('Победа по центру у игрка 1');
    //   placeBattle.center = false;
    //   placeBattle.defense1 = true;
    // }

    // --------------Тыл игрока 1-------------
    // if (flankRows.defenseFlank1 < 5 && flankRows.centerFlank2 < 5 && placeBattle.defense1) {
    //   const result = getResultRoundFight(
    //     defense1,
    //     center2,
    //     flankRows.defenseFlank1,
    //     flankRows.centerFlank2,
    //     currentUnitsDefense1,
    //     currentUnitsCenter2,
    //   );
    //   // console.log(result.status);
    //   // console.log(round, flankRows.centerFlank1, result.flankRow1, currentUnitsCenter2);
    //   flankRows.defenseFlank1 === result.flankRow1
    //     ? (currentUnitsDefense1 = result.alive1)
    //     : (currentUnitsDefense1 = undefined);
    //   flankRows.centerFlank2 === result.flankRow2
    //     ? (currentUnitsCenter2 = result.alive2)
    //     : (currentUnitsCenter2 = undefined);
    //   // console.log(round, flankRows.centerFlank1, result.flankRow1, currentUnitsCenter2);
    //   flankRows.defenseFlank1 = result.flankRow1;
    //   flankRows.centerFlank2 = result.flankRow2;

    //   logsData.push({
    //     round,
    //     ...result,
    //   });
    // } else {
    //   // flankRows.defenseFlank1 === 5 && console.log('Победа по центру у игрка 2');
    //   // flankRows.centerFlank2 === 5 && console.log('Победа по центру у игрка 1');
    //   placeBattle.defense1 = false;
    // }
  }
  // console.log(logsData);
  // console.log(logsData);

  return logsData;
  // setLogData(logsData);
}
