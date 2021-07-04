import React from "react"

export default () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 22 22"
  >
    <defs>
      <filter
        id="d2f41ivc8a"
        width="122.2%"
        height="164.4%"
        x="-11.1%"
        y="-30.5%"
        filterUnits="objectBoundingBox"
      >
        <feOffset dy="2" in="SourceAlpha" result="shadowOffsetOuter1" />
        <feGaussianBlur
          in="shadowOffsetOuter1"
          result="shadowBlurOuter1"
          stdDeviation="5"
        />
        <feColorMatrix
          in="shadowBlurOuter1"
          result="shadowMatrixOuter1"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0"
        />
        <feMerge>
          <feMergeNode in="shadowMatrixOuter1" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    <g fill="none" fillRule="evenodd">
      <circle cx="11.5" cy="11.5" r="10.5" fill="#e7936e" />
      <g filter="url(#d2f41ivc8a)" transform="translate(-11 -12)">
        <g>
          <g>
            <g>
              <path
                fill="#FFF"
                d="M10.255 9.525h1.8v7.2h-1.8v-7.2zM10 7.08c0-.29.107-.542.322-.758.216-.215.488-.322.818-.322.33 0 .607.102.832.308.226.205.338.462.338.772s-.112.567-.338.772c-.225.206-.502.308-.832.308-.33 0-.602-.107-.818-.322C10.107 7.622 10 7.37 10 7.08z"
                transform="translate(11 12) matrix(1 0 0 -1 0 24) translate(1 1)"
              />
              <path
                fillRule="nonzero"
                d="M11 0c6.075 0 11 4.925 11 11s-4.925 11-11 11S0 17.075 0 11 4.925 0 11 0z"
                transform="translate(11 12) matrix(1 0 0 -1 0 24) translate(1 1)"
              />
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
)
