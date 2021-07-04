import React from "react"
import Popup from "reactjs-popup"

import * as S from "./style"

const WIDTH = 515

const ConfirmationModal = ({
  open,
  question,
  description,
  noButtonText,
  yesButtonText,
  onNoButtonClick,
  onYesButtonClick,
  offsetX,
  offsetY,
  withStandalone,
  onClose,
}) => (
  <Popup
    open={open}
    trigger={<div></div>}
    position="bottom right"
    mouseLeaveDelay={100}
    contentStyle={{
      width: `${WIDTH}px`,
      boxShadow:
        "0 7px 25px -3px rgba(189, 196, 197, 0.45), 0 5px 10px -1px rgba(181, 194, 195, 0.15)",
      border: "none",
      padding: "0",
    }}
    offsetX={offsetX ? offsetX : withStandalone ? -65 : 5}
    offsetY={offsetY ? offsetY : -37}
    arrow={false}
    onClose={onClose}
  >
    <S.Container id="confirmation-modal">
      <S.Question>{question}</S.Question>
      <S.Description>{description}</S.Description>
      <S.NoButton appearance="secondary" onClick={onNoButtonClick}>
        {noButtonText}
      </S.NoButton>
      <S.YesButton onClick={onYesButtonClick}>{yesButtonText}</S.YesButton>
    </S.Container>
  </Popup>
)

export default ConfirmationModal
