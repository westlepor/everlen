import React, { useState } from "react"

import { UsersTable, UsersSearch, AddUserModal } from "../shared"

import { useAllUsers } from "hooks"

import { compareUser } from "../utils"

import * as S from "../style"

const Users = () => {
  const { data } = useAllUsers()
  const users = data?.allUsers?.data || []

  const [filter, setFilter] = useState("")
  const [searchText, setSearchText] = useState("")
  const [isOpenAddUser, setIsOpenAddUser] = useState(false)

  const filteredRows = users.filter(user => compareUser(user, filter))

  const suggestionRows = users.filter(user => compareUser(user, searchText))

  return (
    <S.Wrapper>
      <S.TitleButtonWrapper>
        <S.Title>Users</S.Title>
      </S.TitleButtonWrapper>

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

      <UsersTable rows={filter ? filteredRows : users} isFiltered={!!filter} />

      {isOpenAddUser && (
        <AddUserModal isOpen={isOpenAddUser} setIsOpen={setIsOpenAddUser} />
      )}
    </S.Wrapper>
  )
}

export default Users
