import PropTypes from "prop-types"
import React from "react"
import { navigate } from "gatsby"

import { Button } from "@everlywell/leaves"

import ConfirmationModal from "../ConfirmationModal"

import * as S from "./style"

const AbandonUserCreationModal = ({
  isOpen,
  setOpenModal,
  email,
  profileURL,
}) => {
  const closeModal = () => setOpenModal(false)

  const onProceedToViewProfileButtonClick = () => {
    navigate(profileURL)
    closeModal()
  }

  const Description = (
    <>
      Are you sure you want to abandon this user creation and view the{" "}
      <strong>{email}</strong> profile?
    </>
  )

  const Actions = (
    <S.Actions>
      <Button onClick={closeModal}>Cancel and Go Back</Button>
      <Button
        appearance="secondary"
        onClick={onProceedToViewProfileButtonClick}
      >
        Proceed to View Profile
      </Button>
    </S.Actions>
  )

  return (
    <ConfirmationModal
      title="Abandon User Creation?"
      description={Description}
      actions={Actions}
      isOpen={isOpen}
      openHandler={setOpenModal}
    />
  )
}

AbandonUserCreationModal.propTypes = {
  isOpen: PropTypes.bool,
  setOpenModal: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  profileURL: PropTypes.string.isRequired,
}

AbandonUserCreationModal.defaultProps = {
  isOpen: false,
}

export default AbandonUserCreationModal
