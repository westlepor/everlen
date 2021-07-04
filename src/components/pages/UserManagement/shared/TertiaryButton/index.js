import React from "react"

import * as S from "./style"

const TertiaryButton = ({ children, ...rest }) => {
  return (
    <S.TertiaryButton {...rest} appearance="tertiary">
      {children}
    </S.TertiaryButton>
  )
}

export default TertiaryButton
