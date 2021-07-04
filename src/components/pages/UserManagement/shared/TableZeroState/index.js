import React from "react"

import * as S from "./style"

const ZeroState = ({ zeroStateDisplay }) => (
  <tr>
    <td colSpan={10}>
      <S.ZeroStateHint>{zeroStateDisplay}</S.ZeroStateHint>
    </td>
  </tr>
)

export default ZeroState
