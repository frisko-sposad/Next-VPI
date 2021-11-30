import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { LogData, Logs } from '../../components/logs';
import PlayerArmy from '../../components/player-army';

import { battle, ParseData } from '../../function/battle';
import { getParseData } from '../../function/get-parse-data';
import { UnitData } from '../../public/database/units-data';

const App = () => {
  const [unitsData, setUnitsData] = useState({} as ParseData);
  const [logData, setLogData] = useState({} as LogData);
  const methods = useForm();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = methods;

  const onSubmit = (data: ParseData) => {
    setUnitsData(getParseData(data));
  };

  useEffect(() => {
    Object.keys(unitsData).length !== 0 && battle(unitsData, setLogData);
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
      {Object.keys(logData).length !== 0 && <Logs logData={logData} />}
    </>
  );
};

export default App;
