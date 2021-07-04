import React from "react"

export default ({ color, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={12}
    fill={color}
    className={className}
    viewBox="0 0 14 12"
  >
    <path
      fill="#1E824C"
      fillRule="evenodd"
      d="M14 10v2h-3v-2h3zm0-5v2H5V5h9zm0-5v2H0V0h14z"
    />
  </svg>
)
