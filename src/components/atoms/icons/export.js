import React from "react"
import { colors } from "@everlywell/leaves"

export default ({ isDisabled, style, className }) => {
  const color = !!isDisabled ? colors.gray3 : "white"

  return (
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 18 18"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style={style}
      className={className}
    >
      <g
        id="Icons/Export"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g
          id="Group"
          transform="translate(1.000000, 3.000000)"
          stroke={color}
          strokeWidth="1.5"
        >
          <polyline
            id="Path"
            points="13.3900156 7 16 7 16 13 0 13 0 7 2.41434822 7"
          />
          <line
            x1="8.020969"
            y1="9.13418412"
            x2="8.020969"
            y2="2.84217094e-14"
            id="Path-5"
          />
          <polyline
            id="Path-6"
            points="4 2.36393757 8.01746956 2.44249065e-15 12.0349391 2.36393757"
          />
        </g>
      </g>
    </svg>
  )
}
