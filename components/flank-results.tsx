import React from 'react';
import { FlankRow } from '../function/battle';

interface FlankResults {
  flank: [FlankRow];
}

const FlankResults = ({ flank }: FlankResults) => {
  const flankResults = flank?.map((squad: FlankRow, index: number) => {
    if (squad.squadUnit.squadNumber === 0) {
      return <div className="flex justify-center px-2 text-gray-300">-</div>;
    } else {
      return (
        <div key={`${squad.squadUnit.id}-${index}`}>
          <span className="px-2">{squad.squadUnit.name}</span>
          <span className="px-2 ">{squad.squadUnit.squadNumber}</span>
          <span className="px-2 text-green-600">{squad.squadUnit.squadAlive}</span>
          <span className="px-2 text-red-600">{squad.squadUnit.squadLosses}</span>
        </div>
      );
    }
  });

  return <>{flankResults}</>;
};

export default FlankResults;
