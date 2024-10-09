import { useTable, usePagination } from "react-table";
import { useEffect, useMemo } from "react";
import fakeData from "../../Test-Data/Piston-Data.json";
import "./Table.css";

interface Data {
  piston_code: string;
  brand: string;
  model: string;
  tact: string;
  diameter: number;
  pin_diameter: number;
  compression_height: number;
  total_height: number;
  oversize: number;
}

function Table() {
  const data: Data[] = useMemo(() => fakeData, []);
  const columns = useMemo(
    () => [
      {
        Header: "Piston Code",
        accessor: "piston_code" as const,
      },
      {
        Header: "Brand",
        accessor: "brand" as const,
      },
      {
        Header: "Model",
        accessor: "model" as const,
      },
      {
        Header: "Tact",
        accessor: "tact" as const,
      },
      {
        Header: "Diameter(mm)",
        accessor: "diameter" as const,
      },
      {
        Header: "Pin Diameter(mm)",
        accessor: "pin_diameter" as const,
      },
      {
        Header: "Compression Height(mm)",
        accessor: "compression_height" as const,
      },
      {
        Header: "Total Height(mm)",
        accessor: "total_height" as const,
      },
      {
        Header: "Oversize(mm)",
        accessor: "oversize" as const,
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    prepareRow,
  } = useTable({ columns, data }, usePagination);

  const { pageIndex } = state;

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
          {page.map((row) => {
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
      <div className="pagination__div">
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>
      </div>
    </div>
  );
}

export default Table;
