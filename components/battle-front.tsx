import React from 'react';
import { unitsData } from '../public/database/units-data';
import { Heroes } from './heroes';
import { Row } from './row';

interface BattleFront {
  player: string;
  front: string;
}

const BattleFront = ({ front, player }: BattleFront) => {
  const options = unitsData.map((groupUnit, index) => {
    const unit = groupUnit.subRows.map((unit) => {
      return <option key={unit.id}>{unit.name}</option>;
    });

    return unit;
  });

  return (
    <div className="p-2">
      <p>{front}</p>
      <Heroes player={player} front={front} />
      <Row player={player} rowNumber="1" front={front} />
      <Row player={player} rowNumber="2" front={front} />
      <Row player={player} rowNumber="3" front={front} />
      <Row player={player} rowNumber="4" front={front} />
      <Row player={player} rowNumber="5" front={front} />
    </div>
  );
};

export default BattleFront;
