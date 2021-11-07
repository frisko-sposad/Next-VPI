import React from 'react';
import BattleFront from './battle-front';

interface PlayerArmy {
  player: string;
}

enum front {
  right = 'Правый фланг',
  defence = 'Тыл',
  center = 'Центр',
  left = 'Левый Фланг',
}

const PlayerArmy = ({ player }: PlayerArmy) => {
  if (player === 'player1') {
    return (
      <div className="px-10">
        <div className="flex justify-start">
          <BattleFront player={player} front={front.right} />
        </div>
        <div className="flex">
          <BattleFront player={player} front={front.defence} />
          <BattleFront player={player} front={front.center} />
        </div>
        <div className="flex justify-start">
          <BattleFront player={player} front={front.left} />
        </div>
      </div>
    );
  } else if (player === 'player2') {
    return (
      <div className="px-10">
        <div className="flex justify-end">
          <BattleFront player={player} front={front.right} />
        </div>

        <div className="flex">
          <BattleFront player={player} front={front.center} />
          <BattleFront player={player} front={front.defence} />
        </div>
        <div className="flex justify-end">
          <BattleFront player={player} front={front.left} />
        </div>
      </div>
    );
  }
  return null;
};

export default PlayerArmy;