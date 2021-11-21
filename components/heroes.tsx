import { useFormContext } from 'react-hook-form';
import { heroesData } from '../public/database/heroes-data';

interface Heroes {
  player: string;
  flank: string;
}

export function Heroes({ player, flank }: Heroes): JSX.Element {
  const { register } = useFormContext();

  const options = heroesData.map((hero) => {
    return (
      <option key={hero.id} value={JSON.stringify(hero)} label={hero.heroName}>
        {hero.heroName}
      </option>
    );
  });

  return (
    <div>
      <select
        className="border rounded text-right"
        {...register(`${player}.${flank}.hero`)}
      >
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
