import React from 'react';
import { useForm } from 'react-hook-form';

interface HomeProps {
  isLogined: boolean;
  getLogin: (option: boolean) => () => void;
}

type FormData = {
  login: string;
  password: string;
};

export const Login = ({ isLogined, getLogin }: HomeProps) => {
  console.log({ isLogined });

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ mode: 'onBlur' });

  const onSubmit = handleSubmit((data) => {
    reset();
    console.log(data);
  });
  // login and password will have correct type

  return (
    <div>
      <div className="text-gray-500 font-bold mb-2 text-center">{isLogined ? <p>login</p> : <p>not login</p>}</div>

      <form className="w-full max-w-sm" onSubmit={onSubmit}>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Login</label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-full-name"
              type="text"
              placeholder="Login"
              required
              {...register('login', {
                required: 'Введите логин',
                maxLength: 20,
                minLength: { value: 5, message: 'Минимум 5 символов' },
              })}
            />
            <div className="h-3 text-red-500">{errors?.login?.message}</div>
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Password</label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-password"
              type="password"
              placeholder="******************"
              required
              {...register('password', {
                required: 'Введите пароль',
                maxLength: 20,
                minLength: { value: 5, message: 'Минимум 5 символов' },
              })}
            />
            <div className="h-3 text-red-500">{errors?.password?.message}</div>
          </div>
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
              // onClick={isLogined ? getLogin(false) : getLogin(true)}
              onClick={isLogined ? getLogin(false) : getLogin(true)}
            >
              Sign In
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
