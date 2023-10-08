import { useFormContext } from 'react-hook-form';
import { unitsData } from '../../public/database/units-data';
import React from 'react';

interface Row {
  player: string;
  rowNumber: string;
  flank: string;
}

export function Row({ player, rowNumber = '1', flank }: Row): JSX.Element {
  const { register } = useFormContext();

  const options = unitsData.map((groupUnit) => {
    const unit = groupUnit.subRows.map((unit) => {
      return (
        <option key={unit.id} value={JSON.stringify(unit)} label={unit.name}>
          {unit.name}
        </option>
      );
    });
    return unit;
  });

  return (
    <div className="pt-1">
      <select className="border rounded text-right" {...register(`${player}.${flank}.${rowNumber}.unitData`)}>
        {options}
      </select>
      <input
        {...register(`${player}.${flank}.${rowNumber}.unitNumber`)}
        className="w-16 mx-4 border rounded text-right"
        type="number"
        placeholder="0"
        min="0"
      />
    </div>
  );
}
