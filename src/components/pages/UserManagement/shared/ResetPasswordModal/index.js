import PropTypes from "prop-types"
import React, { useState } from "react"

import { Button } from "@everlywell/leaves"

import ConfirmationModal from "../ConfirmationModal"

import * as S from "./style"

const RESET_PASSWORD_LINK = "reset-password-link"
const TEMPORARY_PASSWORD = "temporary-password"

const ResetPasswordModal = ({
  isOpen,
  setOpenModal,
  userName,
  onSendButtonClick,
}) => {
  const [option, updateOption] = useState(RESET_PASSWORD_LINK)

  const closeModal = () => setOpenModal(false)

  const handleSendButtonClick = () => {
    onSendButtonClick({ option })
    closeModal()
  }

  const handleOptionChange = event => {
    updateOption(event.target.id)
  }

  const Description = (
    <S.DescriptionWrapper>
      <S.Description>
        Are you sure you want to reset <strong>{userName}’</strong> password?
      </S.Description>

      <S.RadioButton
        id={RESET_PASSWORD_LINK}
        label={
          <S.Label>
            <S.LabelName>Reset Passwork Link</S.LabelName>
            <S.LabelDescription>
              A password reset link is sent to this user's primary and secondary
              email address; the password is not automatically reset. The
              password reset link will expire 2 days after it is sent.
            </S.LabelDescription>
          </S.Label>
        }
        checked={option === RESET_PASSWORD_LINK}
        onChange={handleOptionChange}
      />
      <S.RadioButton
        id={TEMPORARY_PASSWORD}
        label={
          <S.Label>
            <S.LabelName>Temporary Password</S.LabelName>
            <S.LabelDescription>
              A temporary password will be created for the account and shown to
              you. The account will be marked as expired so that the user will
              be required to change the password when they login.
            </S.LabelDescription>
          </S.Label>
        }
        checked={option === TEMPORARY_PASSWORD}
        onChange={handleOptionChange}
      />
    </S.DescriptionWrapper>
  )

  const Actions = (
    <S.Actions>
      <Button appearance="secondary" onClick={closeModal}>
        Cancel
      </Button>

      <Button onClick={handleSendButtonClick}>Send</Button>
    </S.Actions>
  )

  return (
    <ConfirmationModal
      title="Reset Password"
      description={Description}
      actions={Actions}
      isOpen={isOpen}
      openHandler={setOpenModal}
    />
  )
}

ResetPasswordModal.propTypes = {
  isOpen: PropTypes.bool,
  setOpenModal: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  onSendButtonClick: PropTypes.func.isRequired,
}

ResetPasswordModal.defaultProps = {
  isOpen: false,
}

export default ResetPasswordModal
