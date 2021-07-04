import React from "react"

export default ({ width, height, color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="29"
    height="28"
    viewBox="0 0 29 28"
    fill={color}
  >
    <defs>
      <filter
        id="kvbra8pffa"
        width="114.6%"
        height="179.1%"
        x="-7.3%"
        y="-41.9%"
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
    <g fillRule="evenodd">
      <g>
        <g>
          <g
            filter="url(#kvbra8pffa)"
            transform="translate(-910 -130) translate(864) translate(32 118)"
          >
            <g>
              <g>
                <g>
                  <path
                    fillRule="nonzero"
                    d="M12.833 0c7.088 0 12.834 5.746 12.834 12.833 0 7.088-5.746 12.834-12.834 12.834C5.746 25.667 0 19.92 0 12.833 0 5.746 5.746 0 12.833 0z"
                    transform="translate(14 12) translate(.184) translate(1.167 1.167)"
                  />
                  <path
                    fill="#FFF"
                    d="M12.114 11.419h1.8v7.2h-1.8v-7.2zm-.255-2.445c0-.29.108-.543.323-.758.215-.215.487-.322.817-.322.33 0 .608.102.833.307.225.205.337.463.337.773s-.112.567-.337.772c-.225.205-.503.308-.833.308-.33 0-.602-.108-.817-.323-.215-.215-.323-.467-.323-.757z"
                    transform="translate(14 12) translate(.184) translate(1.167 1.167) matrix(1 0 0 -1 0 26.512)"
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
