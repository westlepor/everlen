import React from "react"

import { Table, Status } from "../"

import * as S from "../Table/style"

const UsersTable = ({ rows, loading }) => {
  const data = rows || []

  let columns = [
    {
      Header: "Person",
      accessor: "id",
      Cell: ({
        row: {
          original: { id, full_name },
        },
      }) => <S.Link to={id}>{full_name}</S.Link>,
      maxWidth: 200,
    },
    {
      Header: "Email",
      accessor: "email",
      maxWidth: 200,
    },
    {
      Header: "Group",
      accessor: "group.name",
      maxWidth: 200,
    },
    {
      Header: "Status",
      accessor: "status",
      minWidth: 155,
      Cell: ({ value }) => <Status value={value} />,
    },
    {
      Header: "",
      id: "empty-space",
      minWidth: 0,
    },
  ]

  return (
    <Table
      columns={columns}
      data={data}
      loading={loading}
      zeroStateDisplay='There are no users created yet. Use "Add User" to create one.'
    />
  )
}

export default UsersTable
