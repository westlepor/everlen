import React from "react"
import styled from "styled-components"

const Icon = styled.svg`
  padding-bottom: 1px;
`

export default ({ size }) => (
  <Icon
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 12 12"
    width={size}
    height={size}
  >
    <path
      fill="#E97F72"
      fillRule="evenodd"
      stroke="#E97F72"
      strokeLinejoin="round"
      d="M6 1.333L10.667 10.667 1.333 10.667z"
    />
  </Icon>
)
