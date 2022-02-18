import React from 'react';
import { FlankRow } from '../function/battle';
import { squads } from '../public/database/squads';

const FlankResults = ({ flank }: { flank: [FlankRow] }) => {
  const flankResults = flank?.map((squad: FlankRow, index: number) => {
    if (squad.squadUnit.squadNumber === 0) {
      return <div>&nbsp;</div>;
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
