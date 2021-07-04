import React, { useState } from "react"

import { URL } from "utils/constants"

import { useAllEnterprisePartners, useAllEnterpriseClients } from "hooks"

import CloseIcon from "components/atoms/icons/closeIcon"

import { Table, Badges, RemoveGroupFromUserModal, ChangeGroupModal } from "../"

import * as S from "../Table/style"

const UserGroupsTable = ({ user, rows, loading }) => {
  const { data: partners } = useAllEnterprisePartners()
  const enterprisePartners = partners?.enterprise_partners || []

  const { data: clients } = useAllEnterpriseClients()
  const enterpriseClients = clients?.enterprise_clients || []

  const data = rows || []

  const [selectedGroupId, selectGroupId] = useState(null)
  const [isOpenEditUser, setIsOpenEditUser] = useState(false)

  const activeGroup = data.find(g => g.id === selectedGroupId)

  const onAddAnotherGroupButtonClick = () => {
    setIsOpenEditUser(true)
    console.log("Add Another Group", { user, activeGroup })
  }

  let columns = [
    {
      Header: "Group Name",
      accessor: "id",
      Cell: ({
        row: {
          original: { id, name },
        },
      }) => {
        const to = `${URL.userManagement}/groups/${id}`

        return <S.Link to={to}>{name}</S.Link>
      },
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
      Header: "",
      id: "action",
      minWidth: 0,
      Cell: ({
        row: {
          original: { id },
        },
      }) => {
        return (
          <S.CloseButtonWrapper>
            <S.CloseButton onClick={() => selectGroupId(id)}>
              <CloseIcon />
            </S.CloseButton>
          </S.CloseButtonWrapper>
        )
      },
    },
  ]

  return (
    <>
      <Table
        columns={columns}
        data={data}
        loading={loading}
        hidePagination={true}
        zeroStateDisplay='You have no groups assigned to this user yet. Use "Add Another Group" to assign new group to this user.'
      />

      {selectedGroupId && (
        <RemoveGroupFromUserModal
          isOpen={!!selectedGroupId}
          setOpenModal={selectGroupId}
          groupName={activeGroup?.name}
          userName={user?.full_name}
          onAddAnotherGroupButtonClick={onAddAnotherGroupButtonClick}
        />
      )}

      {isOpenEditUser && (
        <ChangeGroupModal
          isOpen={isOpenEditUser}
          setIsOpen={setIsOpenEditUser}
          defaultGroupID={user?.group?.id}
          userId={user.id}
        />
      )}
    </>
  )
}

export default UserGroupsTable
