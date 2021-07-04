import React from "react"
import styled from "styled-components"

import { colors, size } from "@everlywell/leaves"

const StatusWrapper = styled.span``

const Status = styled.span`
  color: ${props => props.color};
  font-size: 0.875rem;
  line-height: 1.57;
  letter-spacing: 0.41px;
`

const Circle = styled.span`
  display: inline-block;
  margin-right: ${size.xs2}px;
  width: 0.625rem;
  height: 0.625rem;
  border-radius: 12px;
  background-color: ${props => props.color};
`

const StatusIndicator = ({ value }) => {
  const circleColor =
    value === "Expired"
      ? colors.gray2
      : value === "Active"
      ? colors.teal4
      : colors.gray3

  const labelColor =
    value === "Expired"
      ? colors.gray4
      : value === "Active"
      ? colors.teal6
      : colors.gray4

  return (
    <StatusWrapper>
      <Circle color={circleColor} />
      <Status color={labelColor}>{value}</Status>
    </StatusWrapper>
  )
}

export default StatusIndicator
