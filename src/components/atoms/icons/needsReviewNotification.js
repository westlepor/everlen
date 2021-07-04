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
      <filter id="aab16mc17a">
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
            <g
              filter="url(#aab16mc17a)"
              transform="translate(-940 -143) translate(911 56) translate(12 76)"
            >
              <g stroke="#FFF" strokeWidth="1.5">
                <path
                  d="M19.515 22.17L4.48 22.17 4.48 1.83 14.21 1.83 19.515 7.135z"
                  transform="translate(17 11)"
                />
                <path
                  d="M14.21 1.83L14.21 7.135 19.515 7.135M7.135 17.75L16.865 17.75M7.135 19.515L16.865 19.515M15.095 10.675L13.325 10.675 13.325 8.905 10.675 8.905 10.675 10.675 8.905 10.675 8.905 13.325 10.675 13.325 10.675 15.095 13.325 15.095 13.325 13.325 15.095 13.325z"
                  transform="translate(17 11)"
                />
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
)
