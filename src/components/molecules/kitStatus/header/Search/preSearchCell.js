import React, { useContext } from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

import { colors, size } from "@everlywell/leaves"

import Mark from "components/atoms/kitStatus/pointMark"

import { TableContext } from "contexts/table"
import { cellType } from "utils/constants"

const StyledDiv = styled.div`
  display: inline-block;
  padding: ${size.md}px 0px;
  box-sizing: border-box;
`

const Span = styled.span`
  width: 100%;
  display: block;
  text-overflow: ellipsis;
  overflow: hidden;
  color: ${colors.gray4};
`

const Cell = ({ cell, width }) => {
  const tableContext = useContext(TableContext)
  const { preSearchText } = tableContext
  const style = { width }
  const searchOffset = cell.value
    .toLowerCase()
    .indexOf(preSearchText.toLowerCase())
  let valCom = <Span>{cell.value}</Span>
  if (searchOffset >= 0) {
    valCom = (
      <Span>
        {cell.value.substring(0, searchOffset)}
        <strong>
          {cell.value.substring(
            searchOffset,
            searchOffset + preSearchText.length
          )}
        </strong>
        {cell.value.substring(searchOffset + preSearchText.length)}
      </Span>
    )
  }

  if (cell.type === cellType.MARK) {
    return (
      <StyledDiv style={style}>
        <Mark status={cell.value} />
      </StyledDiv>
    )
  }

  return <StyledDiv style={style}>{valCom}</StyledDiv>
}

Cell.propTypes = {
  cell: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    type: PropTypes.oneOf([cellType.MARK, ""]),
    width: PropTypes.number,
    minWidth: PropTypes.number,
  }),
}

Cell.defaultProps = {}

export default Cell
