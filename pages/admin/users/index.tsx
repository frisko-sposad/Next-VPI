import React, { useEffect, useMemo, useState } from 'react';
import Header from '../../../components/Header/header';
import Table from '../../../components/Table/Table';

const Users = () => {
  const [dataUsers, setDataUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:5000/', {
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
      });

      const data = await response.json();
      console.log(data);
      setDataUsers(data);
    };
    fetchData();
  }, []);

  const columnsUsers = useMemo(
    () => [
      {
        Header: 'user_id',
        accessor: 'user_id',
      },
      {
        Header: 'login',
        accessor: 'login',
      },
      {
        Header: 'pass',
        accessor: 'pass',
      },
      {
        Header: 'role',
        accessor: 'role',
      },
      {
        Header: 'info',
        accessor: 'info',
      },
    ],
    [],
  );

  return (
    <>
      <Header />
      <div className="flex justify-center">
        <div className="flex-col">
          <div className="pt-5">
            <Table columns={columnsUsers} data={dataUsers} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
