import React from "react"
import styled from "styled-components"
import { fonts } from "utils/styles"
import { colors } from "@everlywell/leaves"

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  &:focus-within {
    .label {
      color: ${colors.teal4};
    }
  }
`
const StyledLabel = styled.label`
  color: ${colors.gray4};
  font-family: ${fonts.normal};
  font-weight: 600;
  font-size: 16px;
`
const StyledInput = styled.input`
  word-wrap: break-word;
  border: 1px solid ${colors.gray2};
  height: 56px;
  color: ${colors.gray4};
  padding: 0px 16px;
  margin-top: 5px;
  font-size: 18px;
  border-radius: 1px;
  box-shadow: 4px 4px 6px -5px rgba(0, 0, 0, 0.1);
  &:focus {
    border-color: ${colors.teal5};
    border-bottom-width: 3px;
    color: ${colors.teal4};
  }
  &::placeholder {
    color: ${colors.gray3};
  }
  &:disabled {
    background-color: rgba(37, 34, 40, 0.05);
  }
`
const Error = styled.label`
  color: ${colors.red3};
  font-family: ${fonts.normal};
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  height: 24px;
`

export default ({ label, placeholder, error, className, style, disabled }) => {
  let labelStyle = {}
  let inputStyle = {}
  if (error) {
    labelStyle = { color: colors.red3 }
    inputStyle = {
      border: "1px solid",
      borderColor: colors.red3,
      borderBottomWidth: "3px",
    }
  } else if (disabled) {
    labelStyle = { color: colors.gray3 }
    inputStyle = { color: colors.gray3 }
  }
  return (
    <StyledDiv className={className} style={style}>
      <StyledLabel className="label" style={labelStyle}>
        {label}
      </StyledLabel>
      <StyledInput
        className="input"
        placeholder={placeholder}
        disabled={disabled}
        style={inputStyle}
      ></StyledInput>
      <Error className="error">{error}</Error>
    </StyledDiv>
  )
}
