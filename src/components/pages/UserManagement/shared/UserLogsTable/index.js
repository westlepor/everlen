import React from "react"

import { Table } from "../"

const UserLogsTable = ({ rows, loading }) => {
  const data = rows || []

  let columns = [
    {
      Header: "Time",
      accessor: "time",
      minWidth: 150,
    },
    {
      Header: "Actor",
      accessor: "actor",
      minWidth: 200,
    },
    {
      Header: "Event Info",
      accessor: "event_info",
      minWidth: 200,
    },
    {
      Header: "Target",
      accessor: "target",
      minWidth: 150,
    },
  ]

  return (
    <Table
      columns={columns}
      data={data}
      loading={loading}
      zeroStateDisplay="No logs exist yet."
    />
  )
}

export default UserLogsTable
