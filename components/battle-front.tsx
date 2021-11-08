import React from 'react';
import { unitsData } from '../public/database/units-data';
import { Heroes } from './heroes';
import { Row } from './row';

interface BattleFront {
  player: string;
  front: string[];
}

const BattleFront = ({ front, player }: BattleFront) => {
  return (
    <div className="p-2">
      <p>{front[0]}</p>
      <Heroes player={player} front={front[1]} />
      <Row player={player} rowNumber="1" front={front[1]} />
      <Row player={player} rowNumber="2" front={front[1]} />
      <Row player={player} rowNumber="3" front={front[1]} />
      <Row player={player} rowNumber="4" front={front[1]} />
      <Row player={player} rowNumber="5" front={front[1]} />
    </div>
  );
};

export default BattleFront;
