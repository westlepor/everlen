import React from "react"
import styled from "styled-components"

import { colors, typography } from "@everlywell/leaves"

import Clock from "components/atoms/icons/clock"

const Button = styled.button`
  font-family: ${typography.type.nexa};
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0.27px;
  color: ${colors.green5};
  background: white;
  border: none;
  cursor: pointer;

  display: flex;
  align-items: center;
  padding: 0;

  ${props =>
    props.disabled &&
    `
    color: ${colors.gray3};
    cursor: not-allowed;
    pointer-events: all !important;
  `}
`

const Icon = styled.span`
  margin-right: 6px;
  height: 24px;
`

const CollectSampleButton = ({ isDisabled, onClick, children }) => (
  <Button disabled={isDisabled} onClick={onClick}>
    <Icon>
      <Clock isDisabled={isDisabled} />
    </Icon>
    <span>{children}</span>
  </Button>
)

export default CollectSampleButton
