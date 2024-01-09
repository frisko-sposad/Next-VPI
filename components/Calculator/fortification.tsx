import { useFormContext } from 'react-hook-form';
import { fortificationData } from '../../public/database/fortification-data';
import React from 'react';
import { Flank } from '../../function/battle';

interface Fortification {
  player: string;
  flank: string;
}

export function Fortification({ player, flank }: Fortification): JSX.Element {
  const { register } = useFormContext();

  const options = fortificationData.map((fortification) => {
    return (
      <option key={fortification.id} value={JSON.stringify(fortification)} label={fortification.fortificationName}>
        {fortification.fortificationName}
      </option>
    );
  });

  return (
    <div className="pt-1">
      <select className="border rounded text-right" {...register(`${player}.${flank}.fortification`)}>
        {options}
      </select>
    </div>
  );
}

{
  /* <option key={unit.id} value={JSON.stringify(unit)} label={unit.name}>
          {unit.name}
        </option> */
}
