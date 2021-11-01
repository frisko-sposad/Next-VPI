import React, { useState } from 'react';
import { unitsData } from '../public/database/units-data';

const BattleFront = () => {
  //   const unitsType = "Конница";
  //   return (
  //     <div>
  //       <select>
  //         {unitsData.map((groupUnit) => {
  //           if (groupUnit.name === unitsType) {
  //             console.log(groupUnit.name);
  //             groupUnit.subRows.map((unitType) => {
  //               console.log(unitType.name);

  //               return <option key={unitType.id}>{unitType.name}</option>;
  //             });
  //           }
  //         })}

  //         <option>1</option>
  //         <option>2</option>
  //         <option>3</option>
  //       </select>
  //     </div>
  //   );
  // };

  const [value, setValue] = useState(''); // запоминаем выбор из
  const [number, setNumber] = useState('22'); // запоминаем количество
  // console.log(value);
  // console.log(number);

  const unitsType = 'Пехота';

  const options = unitsData.map((groupUnit, index) => {
    if (groupUnit.name === unitsType) {
      const unit = groupUnit.subRows.map((unit) => {
        // console.log(unit.name);
        // console.log(index);

        return <option key={unit.id}>{unit.name}</option>;
      });
      // console.log(unit);
      return unit;
    }
  });

  return (
    <div>
      <title>Назавание фланга</title>
      <select
        className="border rounded text-right"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      >
        {options}
      </select>
      <input
        className="w-16 mx-4 border rounded text-right"
        type="number"
        placeholder={number}
        min="0"
        onChange={(event) => setNumber(event.target.value)}
      />
      <span>
        ваш выбор: {value}, {number}
      </span>
    </div>
  );
};

export default BattleFront;
