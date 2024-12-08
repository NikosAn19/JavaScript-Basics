import { useTable, usePagination } from "react-table";
import { useMemo, useState, MouseEvent, useEffect } from "react";
import "./Table.css";
import { PistonFields } from "../../Types/PistonFields";
import ClickPopup from "../Popups/ClickPopup/ClickPopup";

type TableProps = {
  pistonData: PistonFields[];
  // prop drilling here
  triggerUpdate: () => void;
};

function Table({ pistonData, triggerUpdate }: TableProps) {
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupPosition, setPopupPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });
  const [selectedRow, setSelectedRow] = useState<PistonFields | null>(null);

  const handleRowClick = (
    event: MouseEvent<HTMLTableRowElement>,
    row: PistonFields
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();

    setPopupPosition({
      top: rect.top + window.scrollY - rect.height * 2, // Βρίσκουμε τη θέση `top`
      left: rect.left * 1.5 + window.scrollX, // Βρίσκουμε τη θέση `left`
    });

    setSelectedRow(row); // Αποθηκεύουμε τη γραμμή που επιλέχθηκε
    setPopupVisible(true); // Εμφανίζουμε το popup
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
    setSelectedRow(null);
  };

  const data = useMemo(() => pistonData, [pistonData]);
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
    [data]
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
            const isHighlighted =
              (row.original.piston_code as PistonFields) ===
              selectedRow?.piston_code;
            return (
              <tr
                className={isHighlighted ? "highlighted__row" : ""}
                {...row.getRowProps()}
                onClick={(event) =>
                  handleRowClick(event, row.original as PistonFields)
                }
              >
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      {popupVisible && selectedRow && (
        <ClickPopup
          top={popupPosition.top}
          left={popupPosition.left}
          selectedRow={selectedRow}
          onClose={handleClosePopup}
          triggerUpdate={triggerUpdate}
        />
      )}

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
