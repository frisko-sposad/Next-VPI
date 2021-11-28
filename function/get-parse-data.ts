import { UnitData } from '../public/database/units-data';

export function getParseData(data: UnitData) {
  // console.log(data);

  let newData = {};

  for (let player in data) {
    let newDataFlank = {};
    for (let flank in data[player]) {
      let newDataSquad = [];
      for (let squad in data[player][flank]) {
        let squadInfo = data[player][flank][squad];

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
