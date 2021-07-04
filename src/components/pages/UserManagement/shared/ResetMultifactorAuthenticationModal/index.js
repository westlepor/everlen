import PropTypes from "prop-types"
import React, { useState } from "react"

import { Button } from "@everlywell/leaves"

import ConfirmationModal from "../ConfirmationModal"

import * as S from "./style"

const ResetMultifactorAuthenticationModal = ({
  isOpen,
  setOpenModal,
  onResetFactorsButtonClick,
}) => {
  const [isOktaVerifyChecked, toggleOktaVerify] = useState(false)

  const closeModal = () => setOpenModal(false)

  const handleResetFactorsButtonClick = () => {
    onResetFactorsButtonClick({ isOktaVerifyChecked })
    closeModal()
  }

  const Description = (
    <S.DescriptionWrapper>
      <S.Description>
        Select authentication factor(s) to reset. This will wipe away the
        credentials for all configured factors and allow users to set up their
        factors again.
      </S.Description>

      <S.Checkbox
        label="Okta Verify"
        onChange={() => toggleOktaVerify(!isOktaVerifyChecked)}
        checked={isOktaVerifyChecked}
      />
    </S.DescriptionWrapper>
  )

  const Actions = (
    <S.Actions>
      <Button appearance="secondary" onClick={closeModal}>
        Cancel
      </Button>

      <Button onClick={handleResetFactorsButtonClick}>Reset Factors</Button>
    </S.Actions>
  )

  return (
    <ConfirmationModal
      title="Reset Multifactor Authentication"
      description={Description}
      actions={Actions}
      isOpen={isOpen}
      openHandler={setOpenModal}
    />
  )
}

ResetMultifactorAuthenticationModal.propTypes = {
  isOpen: PropTypes.bool,
  setOpenModal: PropTypes.func.isRequired,
  onResetFactorsButtonClick: PropTypes.func.isRequired,
}

ResetMultifactorAuthenticationModal.defaultProps = {
  isOpen: false,
}

export default ResetMultifactorAuthenticationModal
