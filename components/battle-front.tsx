import React, { useState } from "react";
import { unitsData } from "../public/database/units-data";
import { unitsDataTest } from "../public/database/units-data-test";

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

    // return <option key={index}>{unit.name}</option>;
  });

  return (
    <div>
      <select value={value} onChange={(event) => setValue(event.target.value)}>
        {options}
      </select>
      <p>ваш выбор: {value}</p>
    </div>
  );
};

export default BattleFront;

//   const [value, setValue] = useState(""); // запоминаем выбор из

//   const options = unitsDataTest.map((unit, index) => {
//     return <option key={index}>{unit.name}</option>;
//   });

//   return (
//     <div>
//       <select value={value} onChange={(event) => setValue(event.target.value)}>
//         {options}
//       </select>
//       <p>ваш выбор: {value}</p>
//     </div>
//   );
// };
