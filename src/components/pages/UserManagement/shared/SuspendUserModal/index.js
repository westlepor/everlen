import PropTypes from "prop-types"
import React from "react"

import { Button } from "@everlywell/leaves"

import ConfirmationModal from "../ConfirmationModal"

import * as S from "./style"

const SuspendUserModal = ({
  isOpen,
  setOpenModal,
  userName,
  loading,
  onSuspendUserButtonClick,
}) => {
  const closeModal = () => setOpenModal(false)

  const handleSuspendUserButtonClick = () => {
    onSuspendUserButtonClick()
  }

  const Description = (
    <>
      Are you sure you want to suspend the user <strong>{userName}</strong>?
    </>
  )

  const Actions = (
    <S.Actions>
      <Button appearance="secondary" onClick={closeModal}>
        Cancel
      </Button>

      <S.SuspendButton
        disabled={loading}
        onClick={handleSuspendUserButtonClick}
      >
        {loading ? <div className="loader" /> : "Suspend"}
      </S.SuspendButton>
    </S.Actions>
  )

  return (
    <ConfirmationModal
      title="Suspend User"
      description={Description}
      actions={Actions}
      isOpen={isOpen}
      openHandler={setOpenModal}
    />
  )
}

SuspendUserModal.propTypes = {
  isOpen: PropTypes.bool,
  setOpenModal: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  onSuspendUserButtonClick: PropTypes.func.isRequired,
}

SuspendUserModal.defaultProps = {
  isOpen: false,
}

export default SuspendUserModal
