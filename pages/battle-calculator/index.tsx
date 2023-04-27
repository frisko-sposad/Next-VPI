import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import BattleResults from '../../components/battle-results';
import { Logs, LogData } from '../../components/logs';
import PlayerArmy from '../../components/player-army';

import { battle, ParseData } from '../../function/battle';
import { getParseData } from '../../function/get-parse-data';
import Link from 'next/link';

const App = () => {
  const [unitsData, setUnitsData] = useState({} as unknown as ParseData);
  const [logsData, setLogData] = useState([] as unknown as LogData[]);
  const [resultBattleData, setResultBattleData] = useState(unitsData);

  const methods = useForm();
  const {
    // register,
    handleSubmit,
    // watch,
    // formState: { errors },
  } = methods;

  const onSubmit = (data: ParseData) => {
    setUnitsData(getParseData(data));
  };

  useEffect(() => {
    if (Object.keys(unitsData).length !== 0) {
      const { logsData, unitData } = battle(unitsData);

      setResultBattleData(unitData);
      setLogData(logsData);
    }
  }, [unitsData]);

  return (
    <>
      <nav
        className="relative flex w-full items-center justify-between bg-white py-2 text-neutral-600 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 dark:text-neutral-200 md:flex-wrap md:justify-start"
        data-te-navbar-ref
      >
        <div className="flex w-full flex-wrap items-center justify-between px-3">
          <div>
            <ul className="mr-auto flex flex-col lg:flex-row" data-te-navbar-nav-ref>
              <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
                <Link href="/battle-calculator">
                  <a className="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90">
                    <h2>battle-calculator</h2>
                  </a>
                </Link>
              </li>
              <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
                <Link href="/units">
                  <a className="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90">
                    <h2>Units</h2>
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-center">
            <PlayerArmy player="player1" />
            <PlayerArmy player="player2" />
          </div>
          <div className="flex justify-center">
            <input
              type="submit"
              className="w-32 py-2 rounded-md text-white bg-green-300 hover:bg-green-500 active:bg-green-700"
            />
          </div>
        </form>
      </FormProvider>
      {/* {Object.keys(unitsData).length !== 0 && <Report data={unitsData} />} */}
      <BattleResults resultBattleData={resultBattleData} />
      {Object.keys(logsData).length !== 0 && <Logs logsData={logsData} />}
    </>
  );
};

export default App;
