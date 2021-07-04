import React from "react"
import styled from "styled-components"

import { colors, typography } from "@everlywell/leaves"

import NotFound from "components/molecules/common/table/tableEmpty"

const ZeroStateWrapper = styled.tr`
  text-align: center;
`

const NoAccessCodes = styled.div`
  font-size: 28.8px;
  line-height: 1.11;
  letter-spacing: 0.63px;
  color: ${colors.teal6};
  margin: 54px 0 6px;
`

const ZeroStateHint = styled.div`
  font-weight: ${typography.weight.book};
  font-size: 16px;
  line-height: 1.75;
  color: ${colors.gray4};
  margin-bottom: 56px;
`

const NoData = () => {
  return (
    <>
      <NoAccessCodes>No Access Codes</NoAccessCodes>
      <ZeroStateHint>
        Create your first access code by clicking “Create Access Code” above
      </ZeroStateHint>
    </>
  )
}

const ZeroState = ({ hasData }) => {
  return (
    <ZeroStateWrapper>
      <td colSpan={9}>
        {hasData && <NotFound />}
        {!hasData && <NoData />}
      </td>
    </ZeroStateWrapper>
  )
}

export default ZeroState
