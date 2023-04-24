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
  number1: number;
  number2: number;
  ready1: boolean;
  ready2: boolean;
}

// export interface LogsData {
//   [x: string]: any;
//   Data: LogData[];
// }

type Data = Record<string, LogData[]>;

export function Logs({ logsData }: Data): JSX.Element {
  // console.log(logsData);

  const logs = logsData?.map((round: LogData, index: number) => {
    const {
      round: roundNumber,
      alive1,
      alive2,
      losses1,
      losses2,
      name1,
      name2,
      flankName1,
      flankName2,
      status,
      row1,
      row2,
      number1,
      number2,
      ready1, // статус отступают или нет
      ready2,
    } = round;

    return (
      <div key={`${roundNumber}-${index}`}>
        <span className="px-2">{roundNumber}</span>
        <span className="pr-2">{flankName1}1</span>
        <span className="pr-2">ряд{row1 + 1}</span>
        <span className="pr-2"> x </span>
        <span className="pr-2">{flankName2}2</span>
        <span className="pr-10">ряд{row2 + 1}</span>
        {number1 !== 0 && (
          <span className="pr-2">
            {name1}
            {ready1 ? '(+)' : '(-)'}
          </span>
        )}
        {number1 ? <span className="pr-2">{number1}</span> : <span className="pr-2">Не задано</span>}
        <span className="pr-2"> x </span>
        {number2 !== 0 && (
          <span className="pr-2">
            {name2}
            {ready2 ? '(+)' : '(-)'}
          </span>
        )}
        {number2 ? <span className="pr-2">{number2}</span> : <span className="pr-2">Не задано</span>}

        {number1 !== 0 && number2 !== 0 && (
          <>
            <span className="pr-2">Потери:</span>
            <span className="pr-2">{losses1}</span>

            <span className="pr-2"> x </span>
            <span className="pr-2">{losses2}</span>
          </>
        )}
        {number1 !== 0 && number2 !== 0 && (
          <>
            <span className="pr-2">Выжившие:</span>
            <span className="pr-2">{alive1}</span>

            <span className="pr-2"> x </span>
            <span className="pr-2">{alive2}</span>
          </>
        )}

        <span className="pr-2 text-red-600">Статус:</span>
        <span className="pr-2 ">{status}</span>
      </div>
    );
  });

  return <>{logs} </>;
}

export default memo(Logs);
