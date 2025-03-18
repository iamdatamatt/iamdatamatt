import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";

interface Column {
  accessorKey: string;
  header: string;
  type?: "text" | "url";
  width?: number;
}

interface DataTableProps {
  data: Record<string, any>[];
  columns: Column[];
}

export function DataTable({ data, columns }: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const tableColumns = useMemo<ColumnDef<Record<string, any>>[]>(
    () =>
      columns.map((col) => ({
        accessorKey: col.accessorKey,
        header: col.header,
        size: col.width || 150,
        cell: (info) => {
          const value = info.getValue() as string;
          if (
            typeof value === "string" &&
            (value.startsWith("http") || value.startsWith("https"))
          ) {
            return (
              <a
                href={value}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:underline"
              >
                {value}
              </a>
            );
          }

          return value || "-";
        },
      })),
    [columns]
  );

  const table = useReactTable({
    data,
    columns: tableColumns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-black">
        <div className="flex items-center gap-2 text-black">
          <label className="whitespace-nowrap">Show</label>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            className="border rounded px-2 py-1 bg-gray-50 text-black min-w-[70px]"
            aria-label="Page Size"
          >
            {[10, 25, 50, 100].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
          <label>entries</label>
        </div>

        <div className="flex items-center gap-2 text-black w-full sm:w-auto">
          <label className="whitespace-nowrap">Search:</label>
          <input
            type="text"
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="border rounded px-3 py-1 bg-gray-50 text-black w-full sm:w-auto"
            placeholder="Filter results..."
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="p-2 text-sm text-gray-500 text-center">
          <span className="italic">Scroll right to see more details</span> ➡️
        </div>

        <div className="min-w-[640px]">
          <table className="w-full text-black">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className="border-y bg-slate-100 sticky top-0 z-10"
                >
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="text-left p-4 text-black whitespace-nowrap"
                      style={{ minWidth: `${header.getSize()}px` }}
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? "cursor-pointer select-none flex items-center gap-1"
                              : "",
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: " 🔼",
                            desc: " 🔽",
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y">
              {table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="text-center p-4 text-gray-500"
                  >
                    No results found
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="p-4"
                        style={{ minWidth: `${cell.column.getSize()}px` }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-4 border-t">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-black">
          <div className="text-center sm:text-left">
            Showing{" "}
            {table.getState().pagination.pageIndex *
              table.getState().pagination.pageSize +
              1}{" "}
            to{" "}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) *
                table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )}{" "}
            of {table.getFilteredRowModel().rows.length} entries
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            <button
              className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white min-w-[80px]"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              First
            </button>
            <button
              className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white min-w-[80px]"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </button>
            <button
              className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white min-w-[80px]"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </button>
            <button
              className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white min-w-[80px]"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              Last
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
