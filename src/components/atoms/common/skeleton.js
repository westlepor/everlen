import React from "react"
import styled from "styled-components"

import Skeleton from "@material-ui/lab/Skeleton"

import { colors } from "@everlywell/leaves"

const StyledSkeleton = styled(Skeleton)`
  border-radius: 12.5px;
  padding: 9px 0;
  background-color: ${colors.gray1};
`

const LoadingSkeleton = ({ row, className, style }) => {
  return (
    <>
      <StyledSkeleton className={className} style={style} />
      {row === 2 && (
        <StyledSkeleton
          className={className}
          style={{ ...style, width: "75%" }}
        />
      )}
    </>
  )
}

export default LoadingSkeleton
