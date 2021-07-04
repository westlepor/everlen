import React from "react"

export default ({ className, style }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className={className}
    style={style}
  >
    <defs>
      <filter id="vjkkr8nfra">
        <feColorMatrix
          in="SourceGraphic"
          values="0 0 0 0 0.635294 0 0 0 0 0.635294 0 0 0 0 0.635294 0 0 0 1.000000 0"
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
                filter="url(#vjkkr8nfra)"
                transform="translate(-940 -519) translate(911 56) translate(12 76) translate(0 376)"
              >
                <g>
                  <g stroke="#FFF" strokeWidth="1.5">
                    <path
                      d="M21 19L0 19 0 7 21 7z"
                      transform="translate(17 11) translate(1.5 2.5)"
                    />
                    <path
                      d="M17.5 15.5L12.5 15.5 12.5 9.5 17.5 9.5z"
                      transform="translate(17 11) translate(1.5 2.5)"
                    />
                    <path
                      d="M18.207 7L2.095 7 0 0 21 0z"
                      transform="translate(17 11) translate(1.5 2.5) matrix(1 0 0 -1 0 7)"
                    />
                    <path
                      d="M1.5 3.25L19.412 3.25"
                      transform="translate(17 11) translate(1.5 2.5)"
                    />
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
)
