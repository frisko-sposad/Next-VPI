import { units } from "../../public/database/units";
import { useTable } from "react-table";
import { useMemo } from "react";
import React from "react";

const Units = () => {
  const data = useMemo(() => units, []);

  const columns = useMemo(
    () => [
      {
        Header: "id",
        accessor: "id",
      },
      {
        Header: "name",
        accessor: "name",
      },
      {
        Header: "attack",
        accessor: "attack",
      },
      {
        Header: "morality",
        accessor: "morality",
      },
      {
        Header: "size",
        accessor: "size",
      },
      {
        Header: "price",
        accessor: "price",
      },
      {
        Header: "Attack",
        columns: [
          {
            Header: "Horseman",
            accessor: "attackHorseman",
          },
          {
            Header: "Swordsman",
            accessor: "attackSwordsman",
          },
          {
            Header: "Spearman",
            accessor: "attackSpearman",
          },
        ],
      },
      {
        Header: "Defense",
        columns: [
          {
            Header: "cavalry",
            accessor: "cavalryDefense",
          },
          {
            Header: "sword",
            accessor: "swordDefense",
          },
          {
            Header: "spear",
            accessor: "spearDefense",
          },
        ],
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <table {...getTableProps()} className="border-0">
      <thead>
        {headerGroups.map((headerGroup) => (
          // eslint-disable-next-line react/jsx-key
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => {
              const columnProps = column.getHeaderProps();

              return (
                <React.Fragment key={columnProps.key}>
                  <th
                    {...column.getHeaderProps()}
                    style={{
                      borderBottom: "solid 3px red",
                      background: "aliceblue",
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    {column.render("Header")}
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
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <td className="p-2" {...cell.getCellProps()}>
                      {cell.render("Cell")}
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
export default Units;
