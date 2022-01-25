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

export function battle(unitData: ParseData): LogData[] {
  const logsData = [] as unknown as LogData[];
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
    flank1: [FlankRow],
    flank2: [FlankRow],
    row1: number,
    row2: number,
    round: number,
    currentUnit1: number | undefined,
    currentUnit2: number | undefined,
  ) {
    const flankName11 = `${flank1[row1]?.squadFlank}`;
    const flankName22 = `${flank2[row2]?.squadFlank}`;
    const flankName1 = `${flank1[row1]?.squadFlank}1`;
    const flankName2 = `${flank2[row2]?.squadFlank}2`;
    // const squadUnit1 = flank1[row1]?.squadUnit;
    // const squadUnit2 = flank2[row2]?.squadUnit;

    if (row1 < 5 && row2 < 5 && placeBattle) {
      const result = getResultRoundFight(
        flank1,
        flank2,
        row1,
        row2,
        currentUnit1,
        currentUnit2,
        flankName1,
        flankName2,
      );

      const { flankRow1, flankRow2, alive1, alive2, losses1, losses2 } = result;

      // const squadUnit = unitData.player1[`${flank1[row1]?.squadFlank}`][row1].squadUnit;
      // const squadUnit = { squadAlive: alive1, squadLosses: flankRow1 - alive1 };
      console.log();

      unitData.player1[`${flank1[row1]?.squadFlank}`][row1].squadUnit.squadAlive = alive1;
      unitData.player1[`${flank1[row1]?.squadFlank}`][row1].squadUnit.squadLosses =
        unitData.player1[`${flank1[row1]?.squadFlank}`][row1].squadUnit.squadNumber - alive1;
      unitData.player1[`${flank1[row2]?.squadFlank}`][row2].squadUnit.squadAlive = alive1;
      unitData.player1[`${flank1[row2]?.squadFlank}`][row2].squadUnit.squadLosses = losses1;

      row1 === flankRow1 ? (currentUnit[flankName1] = alive1) : (currentUnit[flankName1] = 0);
      row2 === flankRow2 && flankRow2 !== 5 ? (currentUnit[flankName2] = alive2) : (currentUnit[flankName2] = 0);

      if (flankRow1 == 5) {
        result.status = 'Победа по центру у игрока 2';
        currentUnit[flankName2] = alive2;
      }
      if (flankRow2 == 5) {
        result.status = 'Победа по центру у игрока 1';
        currentUnit[flankName1] = alive1;
      }

      flankRows.centerFlank1 = flankRow1;
      flankRows.centerFlank2 = flankRow2;

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
    flankFight(
      center1,
      center2,
      flankRows.centerFlank1,
      flankRows.centerFlank2,
      round,
      currentUnit.center1,
      currentUnit.center2,
    );
  }

  console.log(unitData);

  return { logsData, unitData };
  // setLogData(logsData);
}
