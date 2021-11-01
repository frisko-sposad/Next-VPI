import React, { useState } from 'react';
import BattleFront from '../../components/battle-front';
import { battlefield } from '../../public/database/battlefield';
import { unitsData } from '../../public/database/units-data';

const options = unitsData.map((groupUnit, index) => {
  const unit = groupUnit.subRows.map((unit) => {
    return <option key={unit.id}>{unit.name}</option>;
  });

  return unit;
});

const BattleCalculator = () => {
  const [battleUnit, setBattleUnit] = useState(battlefield);

  const update = (e) => {
    setBattleUnit({
      ...battleUnit,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.name);
    console.log(e.target.value);
  };

  console.log(battleUnit);
  const player1 = battleUnit.player1.left.row.map((el) => {
    return (
      <div key={el.id}>
        <select className="border rounded text-right">{options}</select>
        <input
          className="w-16 mx-4 border rounded text-right"
          type="number"
          placeholder="0"
          min="0"
          onChange={(event) => update(event)}
        />
      </div>
    );
  });

  const all = battleUnit.player1.left.row.map((el) => {
    return (
      <div key={el.id}>
        <span>{el.name}</span>
        <span>{el.number}</span>
      </div>
    );
  });

  return (
    <div>
      <p>{battleUnit.player1.left.location}</p>
      {player1}
      <br></br>
      <BattleFront />
      <BattleFront />
      <BattleFront />
      {all}
    </div>
  );
};

export default BattleCalculator;
