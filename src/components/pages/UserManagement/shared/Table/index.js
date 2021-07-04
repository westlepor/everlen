import React from "react"
import { useTable, usePagination } from "react-table"

import ZeroState from "../TableZeroState"

import * as S from "./style"

const PAGE_SIZE = 100

const Table = ({
  columns,
  data,
  loading,
  zeroStateDisplay,
  hidePagination = false,
  ...rest
}) => {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    rows,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: PAGE_SIZE },
    },
    usePagination
  )

  // Pagination
  const from = pageSize * (pageIndex + 1) - pageSize + 1
  const to = pageSize * (pageIndex + 1) - (pageSize - page.length)
  const total = rows.length

  // Render the UI for your table
  return (
    <S.TableOuterWrapper hidePagination={hidePagination}>
      <S.TableInnerWrapper {...rest}>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <S.TH
                    {...column.getHeaderProps()}
                    key={`header-${column.id}`}
                    data-cy="table-header-cell"
                    minWidth={column.minWidth}
                    textAlign={column.textAlign}
                  >
                    <div>{column.render("Header")}</div>
                  </S.TH>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {page.length > 0
              ? page.map(row => {
                  prepareRow(row)

                  return (
                    <tr key={`row-${row.id}`} {...row.getRowProps()}>
                      {row.cells.map((cell, index) => (
                        <S.TD
                          textAlign={cell.column.textAlign}
                          key={`cell-${index}`}
                        >
                          {cell.render("Cell")}
                        </S.TD>
                      ))}
                    </tr>
                  )
                })
              : loading || <ZeroState zeroStateDisplay={zeroStateDisplay} />}
          </tbody>
        </table>
      </S.TableInnerWrapper>

      {!hidePagination && total > 0 && (
        <S.Pagination>
          <S.ItemCount>
            Showing {from} - {to} out of {total}
          </S.ItemCount>

          <S.PageNumbers />
        </S.Pagination>
      )}
    </S.TableOuterWrapper>
  )
}

export default Table
