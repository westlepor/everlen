import React from "react"

import { useAllEnterprisePartners, useAllEnterpriseClients } from "hooks"

import { Table, Badges } from "../"

import * as S from "../Table/style"

const GroupsTable = ({ rows, loading, isFiltered }) => {
  const { data: partners } = useAllEnterprisePartners()
  const enterprisePartners = partners?.enterprise_partners || []

  const { data: clients } = useAllEnterpriseClients()
  const enterpriseClients = clients?.enterprise_clients || []

  const data = rows || []

  let columns = [
    {
      Header: "Group Name",
      accessor: "id",
      Cell: ({
        row: {
          original: { id, name },
        },
      }) => <S.Link to={id}>{name}</S.Link>,
      minWidth: 100,
    },
    {
      Header: "Partner Name",
      accessor: "partner_id",
      Cell: ({ value }) => {
        return enterprisePartners.find(p => p.id === value)?.name || "-"
      },
      minWidth: 100,
    },
    {
      Header: "Client Name(s)",
      accessor: "client_ids",
      Cell: ({ value = [] }) => {
        const items = enterpriseClients.filter(c => value.includes(c.id))

        return <Badges id="table" items={items} />
      },
      minWidth: 100,
    },
    {
      Header: "Users",
      accessor: "user_count",
      minWidth: 100,
      textAlign: "right",
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
      zeroStateDisplay={
        isFiltered
          ? "Not Found"
          : 'There are no groups created yet. Use "Add Group" to create one.'
      }
    />
  )
}

export default GroupsTable
