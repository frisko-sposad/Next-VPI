import React, { useEffect, useMemo, useState } from 'react';
import Header from '../../components/Header/header';
import Table from '../../components/Table/Table';
import { useRouter } from 'next/router';

const UserInfo = () => {
  const [dataUsers, setDataUsers] = useState([]);
  console.log(dataUsers);

  const router = useRouter();
  console.log(router.query.id);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:5000/user/${router.query.id}`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
      });

      console.log(response);

      const data = await response.json();
      setDataUsers(data);
    };
    fetchData();
  }, [router.query.id]);

  const columnsUsers = useMemo(
    () => [
      {
        Header: 'Игрок',
        accessor: 'login',
      },
      {
        Header: 'Персонаж',
        accessor: 'hero_name',
      },
      {
        Header: 'Местонахождение',
        accessor: 'locations_name',
      },
      {
        Header: 'Описание',
        accessor: 'hero_title',
      },
      {
        Header: 'Номер игры',
        accessor: 'games_id',
      },
      {
        Header: 'Перемещение',
        accessor: 'concat_loc',
      },
    ],
    [],
  );

  return (
    <>
      <Header />
      <div className="flex justify-center">
        <div className="flex-col">
          <div>Игрок: {dataUsers[0] && dataUsers[0].login}</div>
          <div className="pt-5">
            <Table columns={columnsUsers} data={dataUsers} />
            <select name="ids" id="ids">
              <option value="1">Id 1</option>
              <option value="2">Id 2</option>
              <option value="3">Id 3</option>
              <option value="4">Id 4</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
