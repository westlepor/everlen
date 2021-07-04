import React from "react"

import { colors } from "@everlywell/leaves"

export default ({ isDisabled }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <g fill="none" fillRule="evenodd" strokeLinejoin="round">
      <g stroke={isDisabled ? colors.gray3 : colors.green5} strokeWidth="1.5">
        <g>
          <g>
            <g transform="translate(-333 -755) translate(85 667) translate(248 52) translate(0 36)">
              <rect
                width="13"
                height="3"
                x="5"
                y="2"
                fill={isDisabled ? colors.gray2 : colors.green2}
                rx="1.5"
              />
              <g transform="translate(3 5)">
                <circle
                  cx="9"
                  cy="9"
                  r="9"
                  fill={isDisabled ? colors.gray1 : colors.green1}
                />
                <path strokeLinecap="round" d="M8.5 3.5L8.5 8.5M13.5 9L8.5 9" />
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
)
