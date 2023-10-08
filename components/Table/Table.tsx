import React from 'react';
import { useExpanded, useTable } from 'react-table';

const Table = ({ columns, data }: any) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data }, useExpanded);

  return (
    <table {...getTableProps()} className="border-0">
      <thead>
        {headerGroups.map((headerGroup) => (
          // eslint-disable-next-line react/jsx-key
          <tr className="p-2 text-center border-2 bg-gray-200" {...headerGroup.getHeaderGroupProps()}>
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
                    <td className="p-2 text-right border-2 bg-gray-50 border-white" {...cell.getCellProps()}>
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

export default Table;
