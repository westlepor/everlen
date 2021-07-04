import React from "react"
import styled from "styled-components"

const Point = styled.span`
  height: 10px;
  width: 10px;
  border-radius: 50%;
`
const Wrapper = styled.span`
  display: flex;
  align-items: baseline;
  line-height: 1.57;
  width: 100%;
  font-size: 14px;
  text-overflow: ellipsis;
  overflow: hidden;
  word-wrap: initial;
  text-align: left;
  letter-spacing: 0.41px;
`

const Label = styled.span`
  display: inline-block;
  margin-left: 4px;
`

const PointMark = ({ label, color, pointColor, className }) => {
  const style = { color: color }

  const pointStyle = {
    backgroundColor: pointColor ? pointColor : color,
  }

  return (
    <Wrapper>
      <Point style={pointStyle} />
      <Label className={className} style={style}>
        {label}
      </Label>
    </Wrapper>
  )
}

export default PointMark
