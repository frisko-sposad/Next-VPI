import React from 'react';
import { Heroes } from './heroes';
import { Row } from './row';
import { Fortification } from './fortification';

interface BattleFlank {
  player: string;
  flank: string[];
}

const BattleFlank = ({ flank, player }: BattleFlank) => {
  return (
    <div className="p-2">
      <p>{flank[0]}</p>
      <Heroes player={player} flank={flank[1]} />
      <Row player={player} rowNumber="1" flank={flank[1]} />
      <Row player={player} rowNumber="2" flank={flank[1]} />
      <Row player={player} rowNumber="3" flank={flank[1]} />
      <Row player={player} rowNumber="4" flank={flank[1]} />
      <Row player={player} rowNumber="5" flank={flank[1]} />
      <Fortification player={player} flank={flank[1]} />
    </div>
  );
};

export default BattleFlank;
