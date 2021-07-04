import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

const Button = styled.span`
  display: inline-block;
  padding: 3px 8px;
  border: 1px solid;
  border-radius: 10px;
  height: 16px;
  line-height: 16px;
  font-size: 12.6px;
  text-overflow: ellipsis;
  overflow: hidden;
  word-wrap: initial;
  text-align: center;
`

const Mark = ({ label, bgColor, borderColor, color, className }) => {
  const style = {
    background: bgColor,
    borderColor,
    color,
  }
  return (
    <Button className={className} style={style}>
      {label}
    </Button>
  )
}

Mark.propTypes = {
  label: PropTypes.string,
  bgColor: PropTypes.string,
}

Mark.defaultProps = {}

export default Mark
