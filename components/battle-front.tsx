import React from "react";
import { unitsData } from "../public/database/units-data";

const BattleFront = () => {
  const unitsType = "Конница";
  return (
    <div>
      <select>
        {unitsData.map((gorupUnit) => {
          if (gorupUnit.name === unitsType) {
            console.log(gorupUnit.name);
            gorupUnit.subRows.map((unitType) => {
              console.log(unitType.name);

              return <option key={unitType.id}>{unitType.name}</option>;
            });
          }
        })}

        <option>1</option>
        <option>2</option>
        <option>3</option>
      </select>
    </div>
  );
};

export default BattleFront;
