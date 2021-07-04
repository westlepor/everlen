import React from "react"

import { colors } from "@everlywell/leaves"

export default ({ isDisabled }) => (
  <svg
    width="21px"
    height="21px"
    viewBox="0 0 24 24"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
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
        strokeWidth="1.5"
      >
        <circle
          id="Oval"
          fill={isDisabled ? colors.gray1 : colors.green1}
          cx="12.1318681"
          cy="12.1318681"
          r="11.3818681"
        />
        <line x1="5.53846154" y1="12" x2="18.4615385" y2="12" id="Path-4" />
        <line x1="12" y1="5.53846154" x2="12" y2="18.4615385" id="Path-4" />
      </g>
    </g>
  </svg>
)
