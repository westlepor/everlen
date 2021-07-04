import React from "react"
import styled from "styled-components"

import { colors } from "@everlywell/leaves"

const StyledLabel = styled.label`
  user-select: none;
  font-size: 18px;
  font-weight: normal;
  line-height: 1.78;
  color: ${colors.gray4};
  cursor: ${props => (props.isDisabled ? "not-allowed !important" : "pointer")};
`

const Label = ({ htmlFor, isDisabled, children }) => (
  <StyledLabel htmlFor={htmlFor} isDisabled={isDisabled}>
    {children}
  </StyledLabel>
)

Label.defaultProps = {
  isDisabled: false,
}

export default Label
