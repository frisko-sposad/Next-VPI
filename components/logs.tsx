import React from 'react';
import { memo } from 'react';

export interface LogData {
  logData: {
    alive1: number;
    alive2: number;
    losses1: number;
    losses2: number;
    name1: string;
    name2: string;
    number1: number;
    number2: number;
    round: number;
  }[];
}

export function Logs({ logData }: LogData): JSX.Element {
  console.log(logData);

  const logs = logData?.map((round, index) => {
    return (
      <div key={`${round.round}-${index}`}>
        <span className="px-2">{round.round}</span>
        <span className="pr-2">{round.name1}</span>
        <span className="pr-2">{round.number1}</span>
        <span className="pr-2"> x </span>
        <span className="pr-2">{round.name2}</span>
        <span className="pr-10">{round.number2}</span>
        <span className="pr-2">Потери:</span>
        <span className="pr-2">{round.losses1}</span>
        <span className="pr-2"> x </span>
        <span className="pr-10">{round.losses2}</span>
        <span className="pr-2">Выжившие:</span>
        <span className="pr-2">{round.alive1}</span>
        <span className="pr-2"> x </span>
        <span className="pr-2">{round.alive2}</span>
      </div>
    );
  });

  return <div>{logs} </div>;
}

// function Cell({ value }): JSX.Element {
//   return <span className="px-1">{value}</span>;
// }

// function Player({ flank, name }) {
//   const flankReport = flank.map((squad, index) => {
//     return (
//       <div key={`${index}-${squad.squadUnit.id}`}>
//         <Cell value={squad.squadUnit.name} />
//         <Cell value={squad.squadUnit.squadNumber} />
//         <Cell value={squad.squadHero.heroName} />
//       </div>
//     );
//   });

//   return (
//     <>
//       <div>{name}</div>
//       {flankReport}
//     </>
//   );
// }

export default memo(Logs);
