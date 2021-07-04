import React from "react"

import { colors } from "@everlywell/leaves"

export default ({ isDisabled, style, className }) => (
  <svg
    width="21px"
    height="21px"
    viewBox="0 0 24 24"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    style={style}
    className={className}
  >
    <g
      id="Atoms/Badge/Add-to-Cart"
      stroke="none"
      strokeWidth="1"
      fill="none"
      fillRule="evenodd"
    >
      <g
        id="Add"
        stroke={isDisabled ? colors.gray3 : colors.green5}
        strokeWidth="2"
      >
        <line x1="4" y1="12" x2="20" y2="12" id="Path-4" />
        <line x1="12" y1="4" x2="12" y2="20" id="Path-4" />
      </g>
    </g>
  </svg>
)
