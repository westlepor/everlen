import React from "react"

import { STATUSES } from "../../constants"

import * as S from "./style"

const Status = ({ value: statusValue }) => {
  const value = statusValue?.toLowerCase() || ""

  const { color, name } = STATUSES[value] || { name: value }

  return (
    <S.Status circleColor={color} textColor={color}>
      {name}
    </S.Status>
  )
}

export default Status
