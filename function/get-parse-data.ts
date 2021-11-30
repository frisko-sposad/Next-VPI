import { Flank, ParseData } from './battle';

export function getParseData(data: ParseData) {
  const newData = {};

  for (const player in data) {
    const newDataFlank = {};

    for (const flank in data[player]) {
      const newDataSquad = [];

      for (const squad in data[player][flank]) {
        const squadInfo = data[player][flank][squad];

        const squadNumber = Number(squadInfo.unitNumber);
        const squadHero = JSON.parse(data[player][flank].hero);
        const squadUnit = squadInfo.unitData && JSON.parse(squadInfo.unitData);

        if (squadUnit) {
          squadUnit['squadNumber'] = squadNumber;
        }

        if (squad !== 'hero') {
          newDataSquad.push({ squadUnit, squadHero });
        }
      }

      newDataFlank[`${flank}`] = newDataSquad;
    }
    newData[`${player}`] = newDataFlank;
  }
  // console.log(newData);

  return newData;
}
