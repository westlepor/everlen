import React from "react"

export default ({ width, height, color, className }) => (
  <svg
    width={width}
    height={height}
    fill={color}
    className={className}
    viewBox="0 0 24 22"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Icons/General/Primary/Shipment</title>
    <defs>
      <filter id="filter-1">
        <feColorMatrix
          in="SourceGraphic"
          type="matrix"
          values="0 0 0 0 0.635294 0 0 0 0 0.635294 0 0 0 0 0.635294 0 0 0 1.000000 0"
        ></feColorMatrix>
      </filter>
    </defs>
    <g
      id="Symbols"
      stroke="none"
      strokeWidth="1"
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <g
        id="Notfication/Alert-Combined"
        transform="translate(-17.000000, -12.000000)"
      >
        <g
          id="Icons/General/Primary/Tests"
          transform="translate(17.000000, 11.000000)"
          filter="url(#filter-1)"
        >
          <g
            id="Group"
            transform="translate(1.500000, 2.500000)"
            stroke="#FFFFFF"
            strokeWidth="1.5"
          >
            <polygon id="Shape" points="21 19 0 19 0 7 21 7"></polygon>
            <polygon
              id="Shape"
              points="17.5 15.5 12.5 15.5 12.5 9.5 17.5 9.5"
            ></polygon>
            <polygon
              id="Shape"
              transform="translate(10.500000, 3.500000) scale(1, -1) translate(-10.500000, -3.500000) "
              points="18.2065181 7 2.09511141 7 0 -2.40918396e-14 21 -2.40918396e-14"
            ></polygon>
            <line
              x1="1.5"
              y1="3.25"
              x2="19.4124414"
              y2="3.25"
              id="Path-4"
            ></line>
          </g>
        </g>
      </g>
    </g>
  </svg>
)
