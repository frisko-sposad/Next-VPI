import { ParseData } from './battle';

interface RawData {
  player1: RawFlank;
  player2: RawFlank;
}

interface RawFlank {
  center: RawFlankRow;
  defense: RawFlankRow;
  left: RawFlankRow;
  right: RawFlankRow;
}

interface RawFlankRow {
  unitData: string;
  unitNumber: string;
}

enum FlankName {
  center,
  defense,
  left,
  right,
}

export function getParseData(data: Record<string, RawFlank>) {
  const newData = {} as ParseData;

  for (const player in data) {
    const newDataFlank = {};

    for (const flank in data[player]) {
      const newDataSquad = [];

      const squadFlank = flank;

      for (const squad in data[player][flank]) {
        const squadInfo = data[player][flank][squad];

        const squadNumber = Number(squadInfo.unitNumber);
        const squadHero = JSON.parse(data[player][flank].hero);
        const squadUnit = squadInfo.unitData && JSON.parse(squadInfo.unitData);

        if (squadUnit) {
          squadUnit['squadNumber'] = squadNumber;
          squadUnit['squadAlive'] = 0;
          squadUnit['squadLosses'] = 0;
        }

        if (squad !== 'hero') {
          newDataSquad.push({ squadUnit, squadHero, squadFlank });
        }
      }

      newDataFlank[`${flank}`] = newDataSquad;
    }
    newData[`${player}`] = newDataFlank;
  }

  return newData;
}
