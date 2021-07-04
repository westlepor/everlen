import PropTypes from "prop-types"
import React from "react"

import * as S from "./style"

const ConfirmationModal = ({
  isOpen,
  openHandler,
  title,
  description,
  actions,
}) => {
  return (
    <S.Modal open={isOpen} openHandler={openHandler}>
      <S.Title>{title}</S.Title>

      <S.BodyText>{description}</S.BodyText>

      {actions}
    </S.Modal>
  )
}

ConfirmationModal.propTypes = {
  isOpen: PropTypes.bool,
  openHandler: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.node.isRequired,
  actions: PropTypes.node.isRequired,
}

ConfirmationModal.defaultProps = {
  isOpen: false,
}

export default ConfirmationModal
