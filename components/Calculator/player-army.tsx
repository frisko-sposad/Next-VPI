import React from 'react';
import BattleFlank from './battle-flank';

interface PlayerArmy {
  player: string;
}

const flank = {
  right: ['Правый фланг', 'right'],
  defence: ['Тыл', 'defence'],
  center: ['Центр', 'center'],
  left: ['Левый Фланг', 'left'],
};

const PlayerArmy = ({ player }: PlayerArmy) => {
  if (player === 'player1') {
    return (
      <div className="px-10">
        <div className="flex justify-start">
          <BattleFlank player={player} flank={flank.right} />
        </div>
        <div className="flex">
          <BattleFlank player={player} flank={flank.defence} />
          <BattleFlank player={player} flank={flank.center} />
        </div>
        <div className="flex justify-start">
          <BattleFlank player={player} flank={flank.left} />
        </div>
      </div>
    );
  } else if (player === 'player2') {
    return (
      <div className="px-10">
        <div className="flex justify-end">
          <BattleFlank player={player} flank={flank.right} />
        </div>

        <div className="flex">
          <BattleFlank player={player} flank={flank.center} />
          <BattleFlank player={player} flank={flank.defence} />
        </div>
        <div className="flex justify-end">
          <BattleFlank player={player} flank={flank.left} />
        </div>
      </div>
    );
  }
  return null;
};

export default PlayerArmy;
