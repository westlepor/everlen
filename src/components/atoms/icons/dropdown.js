import React from "react"

export default ({ width = 17, height = 9 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 17 9"
  >
    <defs>
      <filter id="jn0c51ng4a">
        <feColorMatrix
          in="SourceGraphic"
          values="0 0 0 0 0.666667 0 0 0 0 0.662745 0 0 0 0 0.674510 0 0 0 1.000000 0"
        />
      </filter>
    </defs>
    <g
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <g>
        <g>
          <g>
            <g>
              <g
                filter="url(#jn0c51ng4a)"
                transform="translate(-954 -388) translate(398 128) translate(51 120) translate(0 94) translate(0 26)"
              >
                <g>
                  <path
                    stroke="#FFF"
                    strokeWidth="1.962"
                    d="M5.286 -2.692L11.714 4.519 5.286 11.692"
                    transform="translate(505 20) rotate(90 8.5 4.5)"
                  />
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
)
