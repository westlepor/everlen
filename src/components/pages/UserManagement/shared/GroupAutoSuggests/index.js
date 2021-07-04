import React from "react"

import { GroupAutoSuggest } from "../"

import * as S from "./style"

const GroupAutoSuggests = ({
  isAddingGroup,
  setIsAddingGroup,
  currentGroupID,
  setCurrentGroupID,
  groupIDs,
  setGroupIDs,
}) => {
  const changeGroupID = (id, oldID) => {
    let newGroupIDs = []
    if (id) {
      groupIDs.push(id)
    } else {
      const index = groupIDs.findIndex(c => c === oldID)
      groupIDs.splice(index, 1)
    }

    newGroupIDs = [...groupIDs]

    if (newGroupIDs.length === 0) {
      setIsAddingGroup(true)
      setCurrentGroupID(undefined)
    } else {
      if (id) {
        setIsAddingGroup(false)
      }
      // the last selector for the currently adding group should become 'label'
      // when not 'isAddingGroup' state.
      // if 'id' is true, it means 'isAddingGroup' becomes false
      if (!isAddingGroup || id) {
        setCurrentGroupID(newGroupIDs[newGroupIDs.length - 1])
      }
    }

    setGroupIDs(newGroupIDs)
  }

  return (
    <>
      <S.Field>
        {groupIDs.map((groupID, index) => {
          if (index === groupIDs.length - 1 && !isAddingGroup) {
            return <div key={groupID} />
          }

          return (
            <div key={groupID}>
              <GroupAutoSuggest
                id={groupID}
                hideLabel={index !== 0}
                selectedID={groupID}
                excludeIDs={groupIDs}
                setSelectedID={id => changeGroupID(id, groupID)}
              />
              <S.Devider />
            </div>
          )
        })}
      </S.Field>

      {!currentGroupID && groupIDs.length > 0 && <S.FieldDivider />}

      <GroupAutoSuggest
        hideLabel={!!currentGroupID && groupIDs.length > 1}
        label="Group"
        selectedID={currentGroupID}
        excludeIDs={groupIDs}
        setSelectedID={id => changeGroupID(id, currentGroupID)}
      />
    </>
  )
}

export default GroupAutoSuggests
