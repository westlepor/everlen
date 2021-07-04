import React from "react"
import styled from "styled-components"
import { colors } from "@everlywell/leaves"

const StyledSvg = styled.svg`
  display: ${props => (props.isLoading ? "block" : "none")};
  animation: rotate 2s linear infinite;
  z-index: 2;
  position: absolute;
  top: 50%;
  left: 30px;
  margin: -25px 0 0 -25px;
  width: 50px;
  height: 50px;
`
const StyledCircle = styled.circle`
  stroke: ${colors.green5};
  stroke-linecap: round;
  animation: dash 1.5s ease-in-out infinite;

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`

export default ({ isLoading }) => {
  return (
    <StyledSvg isLoading={isLoading} cviewBox="0 0 50 50">
      <StyledCircle cx="25" cy="25" r="20" fill="none" strokeWidth="5" />
    </StyledSvg>
  )
}
