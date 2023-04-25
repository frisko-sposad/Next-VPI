import React, { useMemo } from 'react';
import { useExpanded, useTable } from 'react-table';
import { unitsData } from '../../public/database/units-data';
import { fortificationData } from '../../public/database/fortification-data';
import { heroesData } from '../../public/database/heroes-data';

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
        Header: 'name',
        accessor: 'name',
      },
      {
        Header: 'weapon',
        accessor: 'weapon',
      },
      {
        Header: 'attack',
        accessor: 'attack',
      },
      {
        Header: 'distanceAttack',
        accessor: 'distanceAttack',
      },
      {
        Header: 'health',
        accessor: 'health',
      },
      {
        Header: 'morality',
        accessor: 'morality',
      },
      {
        Header: 'size',
        accessor: 'size',
      },
      {
        Header: 'price',
        accessor: 'price',
      },
      {
        Header: 'Attack',
        columns: [
          {
            Header: 'Horseman',
            accessor: 'attackHorseman',
          },
          {
            Header: 'Swordsman',
            accessor: 'attackSwordsman',
          },
          {
            Header: 'Spearman',
            accessor: 'attackSpearman',
          },
        ],
      },
      {
        Header: 'Defense',
        columns: [
          {
            Header: 'cavalry',
            accessor: 'defenseHorseman',
          },
          {
            Header: 'sword',
            accessor: 'defenseSword',
          },
          {
            Header: 'spear',
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
        Header: 'heroName',
        accessor: 'heroName',
      },
      {
        Header: 'attackBonus',
        accessor: 'attackBonus',
      },

      {
        Header: 'Attack',
        columns: [
          {
            Header: 'Horseman',
            accessor: 'attackHorseman',
          },
          {
            Header: 'Swordsman',
            accessor: 'attackSwordsman',
          },
          {
            Header: 'Spearman',
            accessor: 'attackSpearman',
          },
        ],
      },
      {
        Header: 'Defense',
        columns: [
          {
            Header: 'cavalry',
            accessor: 'defenseHorseman',
          },
          {
            Header: 'sword',
            accessor: 'defenseSword',
          },
          {
            Header: 'spear',
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
        Header: 'fortificationName',
        accessor: 'fortificationName',
      },
      {
        Header: 'attackBonus',
        accessor: 'attackBonus',
      },
      {
        Header: 'Attack',
        columns: [
          {
            Header: 'Horseman',
            accessor: 'attackHorseman',
          },
          {
            Header: 'Swordsman',
            accessor: 'attackSwordsman',
          },
          {
            Header: 'Spearman',
            accessor: 'attackSpearman',
          },
        ],
      },
      {
        Header: 'Defense',
        columns: [
          {
            Header: 'cavalry',
            accessor: 'defenseHorseman',
          },
          {
            Header: 'sword',
            accessor: 'defenseSword',
          },
          {
            Header: 'spear',
            accessor: 'defenseSpear',
          },
        ],
      },
    ],
    [],
  );

  return (
    <div className="flex justify-center">
      <div className="flex-col">
        <div className="pb-10">
          <Table columns={columnsUnits} data={dataUnits} />
        </div>
        <div className="pb-10">
          <Table columns={columnsHeroes} data={dataHeroes} />
        </div>
        <div className="pb-10">
          <Table columns={columnsFortification} data={dataFortification} />
        </div>
      </div>
    </div>
  );
};

export default StatsTable;
