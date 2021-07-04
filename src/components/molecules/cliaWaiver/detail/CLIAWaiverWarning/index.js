import React, { useContext } from "react"

import { colors } from "@everlywell/leaves"

import { CliaWaiverContext } from "contexts/cliaWaiver"

import WarningIcon from "components/atoms/icons/warningCircle"

import * as S from "./style"

const CLIAWaiverWarning = () => {
  const { hasHCPEnteredCLIAWaiverNumber, openModal } = useContext(
    CliaWaiverContext
  )

  if (hasHCPEnteredCLIAWaiverNumber) {
    return null
  }

  return (
    <S.Wrapper>
      <WarningIcon color={colors.orange1} />
      <S.Content>
        Please enter your CLIA Waiver Number{" "}
        <S.Link onClick={openModal} data-cy="clia-waiver-warning-link">
          HERE
        </S.Link>{" "}
        before collecting samples.
      </S.Content>
    </S.Wrapper>
  )
}

export default CLIAWaiverWarning
