import React, { useContext } from "react"

import Row from "./tableRow"
import EmptyPage from "./tableEmpty"

import { TableContext } from "contexts/table"
import { SessionContext } from "contexts/session"
import { useSuperAdmin } from "../../../../hooks"

const TableBody = ({ data, maxRowCount }) => {
  // we show the part of rows by the current page number
  const tableContext = useContext(TableContext)
  const { currentPage } = tableContext

  const { user, targetUser } = useContext(SessionContext)
  const { isEverlywellSuperAdmin, targetRole } = useSuperAdmin(user, targetUser)

  // build rows
  const rowsCom = () => {
    return data.rows.reduce((acc, elem, key) => {
      if (parseInt(key / maxRowCount) === currentPage) {
        acc.push(<Row key={key} row={elem.row} menus={data.menus} />)
      }
      return acc
    }, [])
  }

  // render
  if (rowsCom().length > 0) {
    return <>{rowsCom()}</>
  } else {
    return <EmptyPage isSuperAdmin={isEverlywellSuperAdmin && !targetRole} />
  }
}

export default TableBody
