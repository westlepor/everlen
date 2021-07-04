import React from "react"
import { useTable, useFilters, useSortBy } from "react-table"

import ZeroState from "./ZeroState"
import HeaderFilter from "components/molecules/admin/accessCode/inlineFilter/headerFilter"

import * as S from "./style"

const Table = ({ columns, data, loading }) => {
  const defaultColumn = React.useMemo(() => ({ Filter: HeaderFilter }), [])

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      disableFilters: true,
      initialState: {
        sortBy: [
          {
            id: "opens_at",
            desc: true,
          },
        ],
      },
      disableSortRemove: true,
    },
    useFilters,
    useSortBy
  )

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => {
              return (
                <S.TH
                  {...column.getHeaderProps()}
                  minWidth={column.minWidth}
                  canSort={column.canSort}
                  isSorted={column.isSorted}
                  id={`header-${column.id}`}
                  data-cy="table-header-cell"
                >
                  {column.enableFilter ? (
                    column.render("Filter")
                  ) : (
                    <div
                      aria-hidden="true"
                      onKeyDown={() =>
                        column.canSort &&
                        column.toggleSortBy(!column.isSortedDesc, false)
                      }
                      onClick={() =>
                        column.canSort &&
                        column.toggleSortBy(!column.isSortedDesc, false)
                      }
                    >
                      <span data-cy="header-cell">
                        {column.render("Header")}
                      </span>

                      {column.canSort && (
                        <S.ArrowIcon
                          isSorted={column.isSorted}
                          isSortedDesc={column.isSortedDesc}
                        />
                      )}
                    </div>
                  )}
                </S.TH>
              )
            })}
          </tr>
        ))}
      </thead>

      <tbody {...getTableBodyProps()}>
        {rows.length > 0
          ? rows.map(row => {
              prepareRow(row)

              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    )
                  })}
                </tr>
              )
            })
          : loading || <ZeroState hasData={!!data.length} />}
      </tbody>
    </table>
  )
}

export default Table
