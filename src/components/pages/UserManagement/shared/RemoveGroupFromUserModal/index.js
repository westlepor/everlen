import PropTypes from "prop-types"
import React from "react"

import { Button } from "@everlywell/leaves"

import ConfirmationModal from "../ConfirmationModal"

import * as S from "./style"

const RemoveGroupFromUserModal = ({
  isOpen,
  setOpenModal,
  groupName,
  userName,
  onAddAnotherGroupButtonClick,
}) => {
  const closeModal = () => setOpenModal(false)

  const handleAddAnotherGroupButtonClick = () => {
    onAddAnotherGroupButtonClick()
    closeModal()
  }

  const Description = (
    <>
      Before you can delete the group <strong>{groupName}</strong> from the user{" "}
      <strong>{userName}</strong>, you need to add them to another group.
    </>
  )

  const Actions = (
    <S.Actions>
      <Button appearance="secondary" onClick={closeModal}>
        Go Back
      </Button>
      <Button onClick={handleAddAnotherGroupButtonClick}>Change Group</Button>
    </S.Actions>
  )

  return (
    <ConfirmationModal
      title="Remove Group from User"
      description={Description}
      actions={Actions}
      isOpen={isOpen}
      openHandler={setOpenModal}
    />
  )
}

RemoveGroupFromUserModal.propTypes = {
  isOpen: PropTypes.bool,
  setOpenModal: PropTypes.func.isRequired,
  groupName: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  onAddAnotherGroupButtonClick: PropTypes.func.isRequired,
}

RemoveGroupFromUserModal.defaultProps = {
  isOpen: false,
}

export default RemoveGroupFromUserModal
