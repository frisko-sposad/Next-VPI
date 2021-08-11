import React, { useState } from "react";
import { unitsData } from "../public/database/units-data";

const BattleFront = () => {
  //   const unitsType = "Конница";
  //   return (
  //     <div>
  //       <select>
  //         {unitsData.map((gorupUnit) => {
  //           if (gorupUnit.name === unitsType) {
  //             console.log(gorupUnit.name);
  //             gorupUnit.subRows.map((unitType) => {
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

  const [value, setValue] = useState(""); // запоминаем выбор из
  const [number, setNumber] = useState("22"); // запоминаем количество

  const unitsType = "Пехота";

  const options = unitsData.map((gorupUnit, index) => {
    if (gorupUnit.name === unitsType) {
      const unit = gorupUnit.subRows.map((unit) => {
        console.log(unit.name);
        console.log(index);

        return <option key={unit.id}>{unit.name}</option>;
      });
      console.log(unit);
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
