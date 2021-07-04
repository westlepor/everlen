import React, { useState } from "react"

import { useAllGroups } from "hooks"

import { GroupsTable, GroupsSearch, AddGroupModal } from "../shared"

import * as S from "../style"

const Groups = () => {
  const { data } = useAllGroups()
  const groups = data?.allUserGroups?.data || []

  const [filter, setFilter] = useState("")
  const [searchText, setSearchText] = useState("")
  const [isOpenAddGroup, setIsOpenAddGroup] = useState(false)

  const filteredRows = groups.filter(group =>
    group.name.toLowerCase().includes(filter.toString().trim().toLowerCase())
  )

  const suggestionRows = groups.filter(group =>
    group.name
      .toLowerCase()
      .includes(searchText.toString().trim().toLowerCase())
  )

  return (
    <S.Wrapper>
      <S.TitleButtonWrapper>
        <S.Title>Groups</S.Title>
      </S.TitleButtonWrapper>

      <S.TopWrapper>
        <GroupsSearch
          rows={suggestionRows}
          setFilter={setFilter}
          searchText={searchText}
          setSearchText={setSearchText}
        />

        <S.RightButton onClick={_ => setIsOpenAddGroup(true)}>
          Add Group
        </S.RightButton>
      </S.TopWrapper>

      <GroupsTable
        rows={filter ? filteredRows : groups}
        isFiltered={!!filter}
      />
      {isOpenAddGroup && (
        <AddGroupModal open={isOpenAddGroup} setOpen={setIsOpenAddGroup} />
      )}
    </S.Wrapper>
  )
}

export default Groups
