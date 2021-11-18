import { UnitData } from "../public/database/units-data";

export function getParseData(data: UnitData
) {

  // console.log(data);


  let newData = {};

  for (let player in data) {
    let newDataFront = {};
    for (let front in data[player]) {
      let newDataSquad = [];
      for (let squad in data[player][front]) {
        let squadInfo = data[player][front][squad];

        const squadNumber = squadInfo.unitNumber;
        const squadHero = JSON.parse(data[player][front].hero);
        const squadUnit = squadInfo.unitData && JSON.parse(squadInfo.unitData);

        if (squadUnit) {
          squadUnit['squadNumber'] = squadNumber;
        }

        if (squad !== 'hero') {
          newDataSquad.push({ squadUnit, squadHero });
        }
      }

      newDataFront[`${front}`] = newDataSquad;
    }
    newData[`${player}`] = newDataFront;
  }
  // console.log(newData);

  return newData;
}
