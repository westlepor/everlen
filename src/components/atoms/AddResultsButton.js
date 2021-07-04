import React from "react"
import styled from "styled-components"

import { colors, typography } from "@everlywell/leaves"

import AddCircle from "components/atoms/icons/addCircle"

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

const AddResultsButton = ({ isDisabled, onClick, children }) => (
  <Button onClick={onClick} disabled={isDisabled}>
    <Icon>
      <AddCircle isDisabled={isDisabled} />
    </Icon>
    <span data-cy={isDisabled}>{children}</span>
  </Button>
)

export default AddResultsButton
