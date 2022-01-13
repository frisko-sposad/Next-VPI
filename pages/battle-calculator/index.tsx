import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Logs, LogData } from '../../components/logs';
import PlayerArmy from '../../components/player-army';

import { battle, ParseData } from '../../function/battle';
import { getParseData } from '../../function/get-parse-data';

const App = () => {
  const [unitsData, setUnitsData] = useState({} as unknown as ParseData);
  const [logsData, setLogData] = useState([] as unknown as LogData[]);
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
      setLogData(battle(unitsData));
    }
  }, [unitsData]);

  return (
    <>
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
      {Object.keys(logsData).length !== 0 && <Logs logsData={logsData} />}
    </>
  );
};

export default App;
