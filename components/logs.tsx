import React from 'react';
import { memo } from 'react';

export interface LogData {
  round: number;
  alive1: number;
  alive2: number;
  losses1: number;
  losses2: number;
  name1: string;
  name2: string;
  flankRow1: number;
  flankRow2: number;
  flankName1: string;
  flankName2: string;
  status: string;
  row1: number;
  row2: number;
}

// export interface LogsData {
//   [x: string]: any;
//   Data: LogData[];
// }

type Data = Record<string, LogData[]>;

export function Logs({ logsData }: Data): JSX.Element {
  // console.log(logsData);

  const logs = logsData?.map((round: LogData, index: number) => {
    return (
      <div key={`${round.round}-${index}`}>
        <span className="px-2">{round.round}</span>
        <span className="pr-2">{round.flankName1}</span>
        <span className="pr-2">ряд{round.row1 + 1}</span>
        <span className="pr-2"> x </span>
        <span className="pr-2">{round.flankName2}</span>
        <span className="pr-10">ряд{round.row2 + 1}</span>
        <span className="pr-2">{round.name1}</span>
        <span className="pr-2">{round.alive1}</span>
        <span className="pr-2"> x </span>
        <span className="pr-2">{round.name2}</span>
        <span className="pr-10">{round.alive2}</span>
        <span className="pr-2">Потери:</span>
        <span className="pr-2">{round.losses1 ? round.losses1 : 0}</span>
        <span className="pr-2"> x </span>
        <span className="pr-10">{round.losses2 ? round.losses2 : 0}</span>
        <span className="pr-2">Выжившие:</span>
        <span className="pr-2">{round.alive1 ? round.alive1 : 0}</span>
        <span className="pr-2"> x </span>
        <span className="pr-2">{round.alive2 ? round.alive2 : 0}</span>
        <span className="pr-2 text-red-600">Статус:</span>
        <span className="pr-2 ">{round.status}</span>
      </div>
    );
  });

  return <>{logs} </>;
}

export default memo(Logs);
