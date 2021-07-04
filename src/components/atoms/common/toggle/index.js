import React, { useState } from "react"

import styled from "styled-components"
import BaseToggle from "react-switch"

import { colors } from "@everlywell/leaves"

const StyledBaseToggle = styled(BaseToggle)`
  opacity: ${props => props.disabled && props.checked && "0.66 !important"};
  .react-switch-bg,
  .react-switch-handle {
    cursor: ${props => (props.disabled ? "not-allowed !important" : "pointer")};
  }
  .react-switch-bg {
    ${props =>
      props.disabled &&
      !props.checked &&
      `
      box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, 0.08);
      background-color: rgba(37, 34, 40, 0.05) !important;
    `}
    ${props =>
      !props.disabled &&
      !props.checked &&
      `
      background-color: ${colors.gray2} !important;
    `}
  }
  .react-switch-handle {
    box-shadow: ${props =>
      props.checked
        ? "-2px -2px 4px 0 rgba(0, 0, 0, 0.2) !important"
        : "2px 2px 4px 0 rgba(0, 0, 0, 0.2) !important"};
    ${props =>
      props.disabled &&
      !props.checked &&
      `
        opacity: 0.77;
    `}
  }
`

const Toggle = ({
  id,
  isChecked,
  defaultIsChecked,
  isDisabled,
  onChange,
  width,
  height,
}) => {
  const [toggle, setToggle] = useState(defaultIsChecked)

  const isControlled = isChecked !== undefined
  const handleDiameter = height - 4

  const handleChange = checked => {
    if (!isDisabled) {
      setToggle(checked)
      onChange && onChange(checked)
    }
  }

  return (
    <StyledBaseToggle
      id={id}
      checked={isControlled ? isChecked : toggle}
      onChange={handleChange}
      width={width}
      height={height}
      handleDiameter={handleDiameter}
      onColor={isDisabled ? colors.green3 : colors.green5}
      offColor={colors.gray2}
      onHandleColor={colors.white}
      offHandleColor={colors.white}
      disabled={isDisabled}
      checkedIcon={false}
      uncheckedIcon={false}
      boxShadow="none"
      activeBoxShadow="none"
    />
  )
}

Toggle.defaultProps = {
  width: 56,
  height: 28,
  isDisabled: false,
}

export default Toggle
