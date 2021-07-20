import { units } from "../../public/database/units";
import { useTable, useExpanded } from "react-table";
import { useMemo } from "react";
import React from "react";

const Table = ({ columns: userColumns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns: userColumns, data }, useExpanded);

  return (
    <table {...getTableProps()} className="border-0">
      <thead>
        {headerGroups.map((headerGroup) => (
          // eslint-disable-next-line react/jsx-key
          <tr
            className="p-2 text-center border-2 bg-red-50"
            {...headerGroup.getHeaderGroupProps()}
          >
            {headerGroup.headers.map((column) => {
              const columnProps = column.getHeaderProps();

              return (
                <React.Fragment key={columnProps.key}>
                  <th
                    className="p-2 text-center border-2 border-white"
                    {...columnProps}
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
              <tr {...rowProps}>
                {row.cells.map((cell) => {
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <td
                      className="p-2 text-right border-2 bg-green-50 border-white"
                      {...cell.getCellProps()}
                    >
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

const Units = () => {
  const data = useMemo(() => units, []);

  const columns = useMemo(
    () => [
      {
        id: "expander",
        Header: "",
        Cell: ({ row }) =>
          row.canExpand ? (
            <span
              {...row.getToggleRowExpandedProps({
                style: {
                  paddingLeft: `${row.depth * 2}rem`,
                },
              })}
            >
              {row.isExpanded ? "-" : "+"}
            </span>
          ) : null,
      },
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

  return (
    <div className="flex justify-center">
      <Table columns={columns} data={data} />
    </div>
  );
};

export default Units;
