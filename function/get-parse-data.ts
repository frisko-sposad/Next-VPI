import { ParseData } from './battle';

export function getParseData(data: ParseData) {
  const newData = {};
  // console.log(data);

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
        }

        if (squad !== 'hero') {
          newDataSquad.push({ squadUnit, squadHero, squadFlank });
        }
      }

      newDataFlank[`${flank}`] = newDataSquad;
    }
    newData[`${player}`] = newDataFlank;
  }

  // console.log(newData);

  return newData;
}
