import React, { useState } from "react"

import {
  useOneGroup,
  useAllEnterprisePartners,
  useAllEnterpriseClients,
} from "hooks"

import {
  TertiaryButton,
  GroupUsersTable,
  EditGroupModal,
  UsersSearch,
  AddUserModal,
} from "../shared"

import { ALL_ROLES } from "../constants"

import { compareUser } from "../utils"

import * as S from "../style"

const Group = ({ id }) => {
  const [filter, setFilter] = useState("")
  const [searchText, setSearchText] = useState("")
  const [isOpenEditGroup, setIsOpenEditGroup] = useState(false)
  const [isOpenAddUser, setIsOpenAddUser] = useState(false)

  const { data } = useOneGroup({ id })
  const group = data?.findUserGroupByID || {}
  const groupUsers = group?.users?.data || []

  const { name, partner_id, client_ids, role } = group

  const { data: partners } = useAllEnterprisePartners()
  const enterprisePartners = partners?.enterprise_partners || []

  const { data: clients } = useAllEnterpriseClients()
  const enterpriseClients = clients?.enterprise_clients || []

  const partnerName = enterprisePartners.find(p => p.id === partner_id)?.name

  const clientNames = enterpriseClients
    .filter(c => (client_ids || []).includes(c.id))
    .map(c => c.name)
    .join(", ")

  const filteredRows = groupUsers.filter(user => compareUser(user, filter))

  const suggestionRows = groupUsers.filter(user =>
    compareUser(user, searchText)
  )

  return (
    <S.Wrapper>
      <S.Link to="/app/user-management/groups">{`< Back to Groups`}</S.Link>

      <S.TitleButtonWrapper>
        <S.Title>{name}</S.Title>

        <TertiaryButton onClick={() => setIsOpenEditGroup(true)}>
          Edit Group
        </TertiaryButton>
      </S.TitleButtonWrapper>

      <S.Description>
        {!!partnerName && (
          <S.Details>
            <S.Text>Partner Name:</S.Text>
            <S.BoldText>{partnerName}</S.BoldText>
          </S.Details>
        )}

        {clientNames.length > 0 && (
          <S.Details>
            <S.Text>Client Name{clientNames.length > 1 && "s"}:</S.Text>
            <S.BoldText>{clientNames}</S.BoldText>
          </S.Details>
        )}

        <S.Details>
          <S.Text>Role:</S.Text>
          <S.BoldText>{ALL_ROLES[role]}</S.BoldText>
        </S.Details>
      </S.Description>

      <S.TopWrapper>
        <UsersSearch
          rows={suggestionRows}
          setFilter={setFilter}
          searchText={searchText}
          setSearchText={setSearchText}
        />

        <S.ButtonsWrapper>
          <S.LeftButton onClick={_ => setIsOpenAddUser(true)}>
            Add User
          </S.LeftButton>

          <S.RightButton onClick={_ => alert("Import Users from CSV")}>
            Import Users from CSV
          </S.RightButton>
        </S.ButtonsWrapper>
      </S.TopWrapper>

      <GroupUsersTable
        rows={filter ? filteredRows : groupUsers}
        isFiltered={!!filter}
      />

      {isOpenEditGroup && (
        <EditGroupModal
          open={isOpenEditGroup}
          setOpen={setIsOpenEditGroup}
          partnerID={partner_id}
          clientIDs={Object.assign([], client_ids)}
          id={id}
          role={role}
          userCount={groupUsers?.length || 0}
          groupName={name}
        />
      )}

      {isOpenAddUser && (
        <AddUserModal
          isOpen={isOpenAddUser}
          setIsOpen={setIsOpenAddUser}
          defaultGroupID={id}
        />
      )}
    </S.Wrapper>
  )
}

export default Group
