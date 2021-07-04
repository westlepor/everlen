import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { useForm } from "react-hook-form"

import { GroupAutoSuggest } from ".."

import { useAllGroups } from "hooks"

import * as S from "../AddUserModal/style"

const ChangeGroupModal = ({ isOpen, setIsOpen, defaultGroupID, userId }) => {
  const { handleSubmit, clearErrors } = useForm()

  const { data } = useAllGroups()
  let groupItems = data?.allUserGroups?.data || []

  const [groupID, setGroupID] = useState(undefined)

  useEffect(() => {
    setGroupID(defaultGroupID)
  }, [defaultGroupID])

  const onSubmit = data => {
    const group = groupItems.find(g => g.id === groupID)

    let result = {
      ...data,
      groupId: group?.okta_id,
      userId,
    }

    console.log(result)

    handleModalOpen(false)
  }

  const handleModalOpen = open => {
    if (!open) {
      clearErrors()
    }
    setIsOpen(open)
  }

  return (
    <S.Modal
      open={isOpen}
      openHandler={handleModalOpen}
      className="user-modal"
      id="changeGroupModal"
    >
      <S.Wrapper onSubmit={handleSubmit(onSubmit)}>
        <S.Title>Change Group</S.Title>

        <GroupAutoSuggest
          label="Group"
          selectedID={groupID}
          setSelectedID={setGroupID}
        />

        <S.ChangeGroupButton
          type="submit"
          disabled={groupID === defaultGroupID || !groupID}
        >
          Save
        </S.ChangeGroupButton>
      </S.Wrapper>
    </S.Modal>
  )
}

ChangeGroupModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  defaultGroupID: PropTypes.string,
}

ChangeGroupModal.defaultProps = {
  isOpen: false,
  defaultGroupID: undefined,
}

export default ChangeGroupModal
