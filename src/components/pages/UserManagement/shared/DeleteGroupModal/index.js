import PropTypes from "prop-types"
import React from "react"

import { Button } from "@everlywell/leaves"

import ConfirmationModal from "../ConfirmationModal"

import * as S from "./style"

const DeleteGroupModal = ({ isOpen, setOpenModal, groupName }) => {
  const closeModal = () => setOpenModal(false)

  const Description = (
    <S.DescriptionWrapper>
      <S.Description>
        You cannot delete the group <strong>{groupName}</strong> because there
        are still users in this group.
      </S.Description>

      <S.Description>
        To delete this group, please remove all of the users and assign them to
        another group.
      </S.Description>
    </S.DescriptionWrapper>
  )

  const Actions = (
    <S.Actions>
      <Button onClick={closeModal}>Dismiss</Button>
    </S.Actions>
  )

  return (
    <ConfirmationModal
      title="Delete Group"
      description={Description}
      actions={Actions}
      isOpen={isOpen}
      openHandler={setOpenModal}
    />
  )
}

DeleteGroupModal.propTypes = {
  isOpen: PropTypes.bool,
  setOpenModal: PropTypes.func.isRequired,
  groupName: PropTypes.string.isRequired,
}

DeleteGroupModal.defaultProps = {
  isOpen: false,
}

export default DeleteGroupModal
