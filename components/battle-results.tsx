import React from 'react';
import { FlankRow, ParseData } from '../function/battle';

const BattleResults = ({ resultBattleData }: ParseData) => {
  const center1 = resultBattleData?.player1?.center?.map((squad: FlankRow, index: number) => {
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
  const center2 = resultBattleData?.player2?.center?.map((squad: FlankRow, index: number) => {
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

  return (
    <div className="flex">
      <div>
        <p>игрок 1</p>
        {center1}
      </div>
      <div>
        <p>игрок 2</p>
        {center2}
      </div>
    </div>
  );
};

export default BattleResults;
