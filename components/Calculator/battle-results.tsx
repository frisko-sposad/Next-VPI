import React from 'react';

import FlankResults from './flank-results';
import { ParseData } from '../../function/battle';

const BattleResults = ({ resultBattleData: { player1, player2 } }: { resultBattleData: ParseData }) => {
  return (
    <div>
      <div className="flex items-center justify-center">
        <span className="pt-10 flex justify-center text-gray-300">Результаты боя</span>
      </div>
      <div className="flex items-center justify-center">
        <div className="p-4">
          <span className="pt-4 flex justify-center text-gray-300">Правый фланг</span>
          <FlankResults flank={player1?.right} />
          <span className="pt-4 flex justify-center text-gray-300">Тыл</span>
          <FlankResults flank={player1?.defence} />
          <span className="pt-4 flex justify-center text-gray-300">Левый Фланг</span>
          <FlankResults flank={player1?.left} />
        </div>
        <div className="p-4">
          <span className="pt-4 flex justify-center text-gray-300">Центр</span>
          <FlankResults flank={player1?.center} />
        </div>
        <div className="p-4 pl-24">
          <span className="pt-4 flex justify-center text-gray-300">Центр</span>
          <FlankResults flank={player2?.center} />
        </div>
        <div className="p-4">
          <span className="pt-4 flex justify-center text-gray-300">Правый фланг</span>
          <FlankResults flank={player2?.right} />
          <span className="pt-4 flex justify-center text-gray-300">Тыл</span>
          <FlankResults flank={player2?.defence} />
          <span className="pt-4 flex justify-center text-gray-300">Левый Фланг</span>
          <FlankResults flank={player2?.left} />
        </div>
      </div>
    </div>
  );
};

export default BattleResults;
