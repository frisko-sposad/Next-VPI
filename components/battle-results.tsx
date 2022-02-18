import React from 'react';
import { ParseData } from '../function/battle';
import FlankResults from './flank-results';

const BattleResults = ({ resultBattleData }: { resultBattleData: ParseData }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="p-4">
        <span className="pt-4 flex justify-center text-gray-300">Правый фланг</span>
        <FlankResults flank={resultBattleData?.player1?.right} />
        <span className="pt-4 flex justify-center text-gray-300">Тыл</span>
        <FlankResults flank={resultBattleData?.player1?.defence} />
        <span className="pt-4 flex justify-center text-gray-300">Левый Фланг</span>
        <FlankResults flank={resultBattleData?.player1?.left} />
      </div>
      <div className="p-4">
        <span className="pt-4 flex justify-center text-gray-300">Центр</span>
        <FlankResults flank={resultBattleData?.player1?.center} />
      </div>
      <div className="pt-4 pl-24">
        <span className="pt-4 flex justify-center text-gray-300">Центр</span>
        <FlankResults flank={resultBattleData?.player2?.center} />
      </div>
      <div className="p-4">
        <span className="pt-4 flex justify-center text-gray-300">Правый фланг</span>
        <FlankResults flank={resultBattleData?.player2?.right} />
        <span className="pt-4 flex justify-center text-gray-300">Тыл</span>
        <FlankResults flank={resultBattleData?.player2?.defence} />
        <span className="pt-4 flex justify-center text-gray-300">Левый Фланг</span>
        <FlankResults flank={resultBattleData?.player2?.left} />
      </div>
    </div>
  );
};

export default BattleResults;
