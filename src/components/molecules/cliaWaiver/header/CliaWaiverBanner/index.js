import React from "react"

import * as S from "./style"

const CliaWaiverBanner = ({
  hasHCPEnteredCLIAWaiverNumber,
  cliaWaiverNumber,
}) => {
  if (!hasHCPEnteredCLIAWaiverNumber) {
    return null
  }

  return (
    <S.Content data-cy="clia-waiver-banner">
      Current CLIA Waiver #: {cliaWaiverNumber}
    </S.Content>
  )
}

export default CliaWaiverBanner
