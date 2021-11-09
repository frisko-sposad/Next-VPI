import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import PlayerArmy from '../../components/player-army';

const App = () => {
  const methods = useForm();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = methods;

  const onSubmit = (data) => console.log(JSON.parse(data['player1-center'].['1'].unitName));

  return (
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
  );
};

export default App;
