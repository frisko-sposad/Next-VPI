import { useFormContext } from 'react-hook-form';
import { heroesData } from '../public/database/heroes-data';

interface Heroes {
  player: string;
  front: string;
}

export function Heroes({ player, front }: Heroes): JSX.Element {
  const { register } = useFormContext();

  const options = heroesData.map((hero) => {
    return (
      <option key={hero.id} value={hero.heroName}>
        {hero.heroName}
      </option>
    );
  });

  return (
    <div>
      <select
        className="border rounded text-right"
        {...register(`${player}-${front}-Hero`)}
      >
        {options}
      </select>
    </div>
  );
}
