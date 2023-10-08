import React, { useMemo } from 'react';
import { unitsData } from '../../public/database/units-data';
import { fortificationData } from '../../public/database/fortification-data';
import { heroesData } from '../../public/database/heroes-data';
import Header from '../../components/Header/header';
import Table from '../../components/Table/Table';

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
      <Header />
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
