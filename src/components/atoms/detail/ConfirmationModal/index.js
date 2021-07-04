import React, { useState } from "react"

import Trigger from "./trigger"
import Modal from "./modal"

const ConfirmationModalWrapper = ({
  triggerButtonText,
  triggerTooltip,
  question,
  description,
  noButtonText,
  yesButtonText,
  onYesButtonClick,
  offsetX,
  offsetY,
  withStandalone,
}) => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <div>
      <Trigger
        triggerButtonText={triggerButtonText}
        triggerTooltip={triggerTooltip}
        onClick={() => setOpenModal(true)}
      />

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        question={question}
        description={description}
        noButtonText={noButtonText}
        yesButtonText={yesButtonText}
        onNoButtonClick={() => setOpenModal(false)}
        onYesButtonClick={() => {
          setOpenModal(false)
          onYesButtonClick()
        }}
        withStandalone={withStandalone}
        offsetX={offsetX}
        offsetY={offsetY}
      />
    </div>
  )
}

export default ConfirmationModalWrapper
