import React from "react"
import { useTable } from "react-table"
import { navigate } from "gatsby"

import { URL } from "utils/constants"

import * as S from "./style"

const SuggestionsTable = ({ columns, data, type, ...rest }) => {
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, getTableBodyProps, prepareRow, rows } = useTable({
    columns,
    data,
  })

  const onKeyDown = event => {
    event.preventDefault()

    if (event.key === "ArrowDown" || (event.key === "Tab" && !event.shiftKey)) {
      if (document.activeElement.nextElementSibling) {
        document.activeElement.nextElementSibling.focus()
      } else {
        document.getElementById("search").focus()
      }
    } else if (
      event.key === "ArrowUp" ||
      (event.key === "Tab" && event.shiftKey)
    ) {
      if (document.activeElement.previousElementSibling) {
        document.activeElement.previousElementSibling.focus()
      } else {
        document.getElementById("search").focus()
      }
    }
  }

  // Render the UI for your table
  return (
    <S.TableOuterWrapper onKeyDown={onKeyDown}>
      <S.TableInnerWrapper {...rest}>
        <table {...getTableProps()}>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row)

              return (
                <tr
                  tabIndex="0"
                  key={`row-${row.id}`}
                  id={`row-${row.id}`}
                  {...row.getRowProps()}
                  onKeyDown={e => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      navigate(
                        `${URL.userManagement}/${type}/${data[row.id].id}`
                      )
                    }
                  }}
                  onClick={() =>
                    navigate(`${URL.userManagement}/${type}/${data[row.id].id}`)
                  }
                >
                  {row.cells.map((cell, index) => (
                    <S.TD
                      key={`cell-${index}`}
                      textAlign={cell.column.textAlign}
                      minWidth={cell.column.minWidth}
                    >
                      {cell.render("Cell")}
                    </S.TD>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </S.TableInnerWrapper>
    </S.TableOuterWrapper>
  )
}

export default SuggestionsTable
