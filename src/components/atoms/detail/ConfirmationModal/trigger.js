import React from "react"
import Popup from "reactjs-popup"

import { colors } from "@everlywell/leaves"

import * as S from "./style"

const ConfirmationModalTrigger = ({
  triggerButtonText,
  triggerTooltip,
  onClick,
}) => (
  <Popup
    trigger={<S.Trigger onClick={onClick}>{triggerButtonText}</S.Trigger>}
    position="bottom right"
    mouseLeaveDelay={100}
    closeOnDocumentClick
    on={["hover"]}
    contentStyle={{
      border: "none",
      padding: "6px 8px",
      backgroundColor: colors.gray4,
      boxShadow: "none",
      width: "256px",
      borderRadius: "2px",
    }}
    arrowStyle={{ backgroundColor: colors.gray4, boxShadow: "none" }}
    arrow={true}
  >
    <S.Tooltip>{triggerTooltip}</S.Tooltip>
  </Popup>
)

export default ConfirmationModalTrigger
