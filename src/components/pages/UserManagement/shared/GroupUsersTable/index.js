import React from "react"

import { URL } from "utils/constants"

import { Table, Status } from "../"

import * as S from "../Table/style"

const GroupUsersTable = ({ rows, loading }) => {
  const data = rows || []

  let columns = [
    {
      Header: "Person",
      accessor: "id",
      Cell: ({
        row: {
          original: { id, full_name },
        },
      }) => {
        const to = `${URL.userManagement}/users/${id}`

        return <S.Link to={to}>{full_name}</S.Link>
      },
      maxWidth: 200,
    },
    {
      Header: "Email",
      accessor: "email",
      maxWidth: 200,
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ value }) => <Status value={value} />,
    },
  ]

  return (
    <Table
      columns={columns}
      data={data}
      loading={loading}
      zeroStateDisplay={
        <>
          You have no users assigned to this group yet.
          <br /> Use “Add User” to assign new users to this group.
        </>
      }
    />
  )
}

export default GroupUsersTable
