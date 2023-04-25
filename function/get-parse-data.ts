import { ParseData } from './battle';

type RawFlankRow = Record<string, string>;
type RawFlank = Record<string, RawFlankRow>;
type RawData = Record<string, RawFlank>;

export function getParseData(data: Record<string, RawData>) {
  const newData = {} as ParseData;

  for (const player in data) {
    const newDataFlank = {};

    for (const flank in data[player]) {
      const newDataSquad = [];

      const squadFlank = flank;

      for (const squad in data[player][flank]) {
        const squadInfo = data[player][flank][squad];

        const squadNumber = Number(squadInfo.unitNumber);
        const squadHero = JSON.parse(`${data[player][flank].hero}`);
        const squadFortification =
          data[player][flank].fortification && JSON.parse(`${data[player][flank].fortification}`);
        const squadUnit = squadInfo.unitData && JSON.parse(squadInfo.unitData);

        if (squadUnit) {
          squadUnit['squadNumber'] = squadNumber;
          squadUnit['squadAlive'] = squadNumber;
          squadUnit['squadLosses'] = 0;
        }

        if (squad !== 'hero' && squad !== 'fortification') {
          newDataSquad.push({ squadUnit, squadHero, squadFlank, squadFortification });
        }
      }

      newDataFlank[`${flank}`] = newDataSquad;
    }
    newData[`${player}`] = newDataFlank;
  }
  // console.log({ newData, data });

  return newData;
}
