import { useTable } from "react-table";
import { useEffect, useMemo } from "react";
import fakeData from "../../FakeData.json";
import "./Table.css";

interface Data {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  university: string;
}

function Table() {
  const data: Data[] = useMemo(() => fakeData, []);
  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id" as const,
      },
      {
        Header: "First Name",
        accessor: "first_name" as const,
      },
      {
        Header: "Last Name",
        accessor: "last_name" as const,
      },
      {
        Header: "Email",
        accessor: "email" as const,
      },
      {
        Header: "Gender",
        accessor: "gender" as const,
      },
      {
        Header: "University",
        accessor: "university" as const,
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className="container__table">
      <table className="main__table" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
