import React, { useMemo } from 'react';
import { useExpanded, useTable } from 'react-table';
import { unitsData } from '../../public/database/units-data';
import { fortificationData } from '../../public/database/fortification-data';
import { heroesData } from '../../public/database/heroes-data';
import Link from 'next/link';

const Table = ({ columns: userColumns, data }: any) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    { columns: userColumns, data },
    useExpanded,
  );

  return (
    <table {...getTableProps()} className="border-0">
      <thead>
        {headerGroups.map((headerGroup) => (
          // eslint-disable-next-line react/jsx-key
          <tr className="p-2 text-center border-2 bg-red-50" {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => {
              const columnProps = column.getHeaderProps();

              return (
                <React.Fragment key={columnProps.key}>
                  <th className="p-2 text-center border-2 border-white" {...columnProps}>
                    {column.render('Header')}
                  </th>
                </React.Fragment>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          const rowProps = row.getRowProps();
          return (
            <React.Fragment key={rowProps.key}>
              <tr {...rowProps}>
                {row.cells.map((cell) => {
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <td className="p-2 text-right border-2 bg-green-50 border-white" {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );
};

const StatsTable = () => {
  const dataUnits = useMemo(() => unitsData, []);

  const columnsUnits = useMemo(
    () => [
      {
        id: 'expander',
        Header: '',
        Cell: ({ row }: any) =>
          row.canExpand ? (
            <span
              {...row.getToggleRowExpandedProps({
                style: {
                  paddingLeft: `${row.depth * 2}rem`,
                },
              })}
            >
              {row.isExpanded ? '-' : '+'}
            </span>
          ) : null,
      },
      {
        Header: 'id',
        accessor: 'id',
      },
      {
        Header: 'Тип Юнита',
        accessor: 'name',
      },
      {
        Header: 'Оружие',
        accessor: 'weapon',
      },
      {
        Header: 'Атака',
        accessor: 'attack',
      },
      {
        Header: 'Дальняя атака',
        accessor: 'distanceAttack',
      },
      {
        Header: 'Здоровье',
        accessor: 'health',
      },
      {
        Header: 'Мораль',
        accessor: 'morality',
      },
      {
        Header: 'Размер(Вес)',
        accessor: 'size',
      },
      {
        Header: 'Цена(Золото)',
        accessor: 'price',
      },
      {
        Header: 'Бонус в Атаке по',
        columns: [
          {
            Header: 'Всадникам',
            accessor: 'attackHorseman',
          },
          {
            Header: 'Мечникам',
            accessor: 'attackSwordsman',
          },
          {
            Header: 'Копейщикам',
            accessor: 'attackSpearman',
          },
        ],
      },
      {
        Header: 'Бонус в Тылу от',
        columns: [
          {
            Header: 'Всадников',
            accessor: 'defenseHorseman',
          },
          {
            Header: 'Мечников',
            accessor: 'defenseSword',
          },
          {
            Header: 'Копейщиков',
            accessor: 'defenseSpear',
          },
        ],
      },
    ],
    [],
  );

  const dataHeroes = useMemo(() => heroesData, []);

  const columnsHeroes = useMemo(
    () => [
      {
        id: 'expander',
        Header: '',
        Cell: ({ row }: any) =>
          row.canExpand ? (
            <span
              {...row.getToggleRowExpandedProps({
                style: {
                  paddingLeft: `${row.depth * 2}rem`,
                },
              })}
            >
              {row.isExpanded ? '-' : '+'}
            </span>
          ) : null,
      },
      {
        Header: 'id',
        accessor: 'id',
      },
      {
        Header: 'Командир',
        accessor: 'heroName',
      },

      {
        Header: 'Постоянный бонус',
        columns: [
          {
            Header: 'Атака',
            accessor: 'attackBonus',
          },
          {
            Header: 'Здоровье',
            accessor: 'healthBonus',
          },
          {
            Header: 'Мораль',
            accessor: 'moralityBonus',
          },
        ],
      },
      {
        Header: 'Бонус в Атаке по',
        columns: [
          {
            Header: 'Всадникам',
            accessor: 'attackHorseman',
          },
          {
            Header: 'Мечниками',
            accessor: 'attackSwordsman',
          },
          {
            Header: 'Копейщикам',
            accessor: 'attackSpearman',
          },
        ],
      },
      {
        Header: 'Бонус в тылу от',
        columns: [
          {
            Header: 'Всадников',
            accessor: 'defenseHorseman',
          },
          {
            Header: 'Мечников',
            accessor: 'defenseSword',
          },
          {
            Header: 'Копейщиков',
            accessor: 'defenseSpear',
          },
        ],
      },
    ],
    [],
  );

  const dataFortification = useMemo(() => fortificationData, []);

  const columnsFortification = useMemo(
    () => [
      {
        id: 'expander',
        Header: '',
        Cell: ({ row }: any) =>
          row.canExpand ? (
            <span
              {...row.getToggleRowExpandedProps({
                style: {
                  paddingLeft: `${row.depth * 2}rem`,
                },
              })}
            >
              {row.isExpanded ? '-' : '+'}
            </span>
          ) : null,
      },
      {
        Header: 'id',
        accessor: 'id',
      },
      {
        Header: 'Укрепления',
        accessor: 'fortificationName',
      },
      {
        Header: 'attackBonus',
        accessor: 'attackBonus',
      },
      {
        Header: 'Бонус в Атаке по',
        columns: [
          {
            Header: 'Всадникам',
            accessor: 'attackHorseman',
          },
          {
            Header: 'Мечниками',
            accessor: 'attackSwordsman',
          },
          {
            Header: 'Копейщикам',
            accessor: 'attackSpearman',
          },
        ],
      },
      {
        Header: 'Бонус в тылу от',
        columns: [
          {
            Header: 'Всадников',
            accessor: 'defenseHorseman',
          },
          {
            Header: 'Мечников',
            accessor: 'defenseSword',
          },
          {
            Header: 'Копейщиков',
            accessor: 'defenseSpear',
          },
        ],
      },
    ],
    [],
  );

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
      <div className="flex justify-center">
        <div className="flex-col">
          <div className="pt-5">
            <Table columns={columnsUnits} data={dataUnits} />
          </div>
          <div className="pt-5">
            <Table columns={columnsHeroes} data={dataHeroes} />
          </div>
          <div className="pt-5">
            <Table columns={columnsFortification} data={dataFortification} />
          </div>
        </div>
      </div>
    </>
  );
};

export default StatsTable;
