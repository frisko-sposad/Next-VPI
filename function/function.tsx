export function getParseData(data: {
  [x: string]: { [x: string]: { hero: string } } | { hero: string };
}) {
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
  return newData;
}
