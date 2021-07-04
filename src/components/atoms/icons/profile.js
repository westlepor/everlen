import React from "react"

export default () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <defs>
      <circle id="prefix__a" cx="11" cy="11" r="10.5" />
    </defs>
    <g fill="none" fillRule="evenodd" transform="translate(1 1)">
      <circle
        cx="11"
        cy="11"
        r="11"
        fill="#EDF5F1"
        stroke="#1E824C"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <mask id="prefix__b" fill="#fff">
        <use xlinkHref="#prefix__a" />
      </mask>
      <circle
        cx="11"
        cy="7.5"
        r="3.5"
        fill="#D6EBDD"
        stroke="#1E824C"
        strokeLinejoin="round"
        strokeWidth="1.5"
        mask="url(#prefix__b)"
      />
      <circle
        cx="11"
        cy="21.5"
        r="7.5"
        fill="#D6EBDD"
        stroke="#1E824C"
        strokeLinejoin="round"
        strokeWidth="1.5"
        mask="url(#prefix__b)"
      />
    </g>
  </svg>
)
