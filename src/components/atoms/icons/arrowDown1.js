import React from "react"

export default ({ width, height, color, className, style }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 14 17"
    className={className}
    style={style}
    width={width}
    height={height}
    stroke={color}
  >
    <g fill="none" fillRule="evenodd" strokeLinecap="round">
      <g strokeWidth="1.5">
        <g>
          <g>
            <path
              d="M0 7L6 0 12 7M6 0L6 13.298"
              transform="translate(-399 -361) translate(368 287) matrix(1 0 0 -1 32 89)"
            />
          </g>
        </g>
      </g>
    </g>
  </svg>
)
