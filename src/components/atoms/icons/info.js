import React from "react"

export default ({ size, style, className, id, onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    style={style}
    id={id}
    className={className}
    onClick={onClick}
  >
    <g fill="none" fillRule="evenodd">
      <path
        stroke="#007377"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M11 0c6.075 0 11 4.925 11 11s-4.925 11-11 11S0 17.075 0 11 4.925 0 11 0z"
        transform="translate(-545 -417) translate(437 191) translate(0 124) translate(108 102) translate(1 1)"
      />
      <path
        fill="#007377"
        d="M10.255 9.525h1.8v7.2h-1.8v-7.2zM10 7.08c0-.29.107-.542.322-.758.216-.215.488-.322.818-.322.33 0 .607.102.832.308.226.205.338.462.338.772s-.112.567-.338.772c-.225.206-.502.308-.832.308-.33 0-.602-.107-.818-.322C10.107 7.622 10 7.37 10 7.08z"
        transform="translate(-545 -417) translate(437 191) translate(0 124) translate(108 102) translate(1 1)"
      />
    </g>
  </svg>
)
