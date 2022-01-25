import React from 'react';
import { FlankRow, ParseData, squadUnit } from '../function/battle';

const BattleResults = ({ resultBattleData }: ParseData) => {
  // console.log(resultBattleData);

  // const {
  //   player1: { center: center1, right: right1, left: left1, defense: defense1 },
  //   player2: { center: center2, right: right2, left: left2, defense: defense2 },
  // } = resultBattleData;

  // console.log(center1);

  const center11 = resultBattleData?.player1?.center?.map((squad: FlankRow, index: number) => {
    // console.log(squad);

    return (
      <div key={`${squad.squadUnit.id}-${index}`}>
        <span className="px-2">{squad.squadFlank}</span>
        <span className="px-2">{squad.squadUnit.name}</span>
        <span className="px-2 ">{squad.squadUnit.squadNumber}</span>
        <span className="px-2 text-green-600">{squad.squadUnit.squadAlive}</span>
        <span className="px-2 text-red-600">{squad.squadUnit.squadLosses}</span>
      </div>
    );
  });

  return <>{center11}1</>;
};

export default BattleResults;
