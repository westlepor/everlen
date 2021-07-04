import React, { useContext } from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

import { colors } from "@everlywell/leaves"

import Skeleton from "components/atoms/common/skeleton"
import PointMark from "components/atoms/kitStatus/pointMark"
import IssueMark from "components/atoms/kitStatus/issueMark"

import { cellType } from "utils/constants"
import { MENU_WIDTH_IN_PERCENTAGE, FAKE_CELL_W_PC } from "utils/fields"
import { TableContext } from "contexts/table"

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: unset;
  padding: 15px 16px 15px;
  box-sizing: border-box;
  flex-shrink: 1;
  border-bottom: ${props =>
    props.isFake ? `2px solid ${colors.gray1}` : `4px solid ${colors.teal1}`};
`

const FakeWrapper = styled(StyledDiv)`
  align-items: unset;
`

const Span = styled.span`
  width: 100%;
  display: block;
  overflow-wrap: anywhere;
`

const Cell = ({ cell }) => {
  const { columnCount } = useContext(TableContext)

  let style = {
    width: `${(100 - MENU_WIDTH_IN_PERCENTAGE) / columnCount}%`,
  }

  if (cell.width && !cell.isFake) {
    style.width = `${cell.width}%`
  }

  if (cell.minWidth && !cell.isFake) {
    style.minWidth = `${cell.minWidth + 32}px`
  }

  if (cell.isFake) {
    style.width = `${FAKE_CELL_W_PC}%`
    const fakeComs = <Skeleton row={cell.fakes} />
    return (
      <FakeWrapper style={style} isFake={true}>
        {fakeComs}
      </FakeWrapper>
    )
  }

  if (cell.type === cellType.MARK) {
    return (
      <StyledDiv data-cy="table-cell" style={style}>
        <PointMark status={cell.value} />
      </StyledDiv>
    )
  } else if (cell.type === cellType.TIME && cell.value !== "-") {
    const dateValue = cell.value.split(" ")[0]
    const timeValue = cell.value.substring(dateValue.length)

    return (
      <StyledDiv data-cy="table-cell" style={style}>
        <Span>{dateValue}</Span>
        <Span>{timeValue}</Span>
      </StyledDiv>
    )
  } else if (cell.isFake) {
    const fakeComs = <Skeleton row={cell.fakes} />
    return (
      <StyledDiv data-cy="table-cell" style={style}>
        {fakeComs}
      </StyledDiv>
    )
  } else if (cell.type === cellType.ISSUE && cell.value !== "-") {
    return (
      <StyledDiv data-cy="table-cell" style={style}>
        <IssueMark value={cell.value} size={8} />
      </StyledDiv>
    )
  } else {
    return (
      <StyledDiv data-cy="table-cell" style={style}>
        <Span>{cell.value || "-"}</Span>
      </StyledDiv>
    )
  }
}

Cell.propTypes = {
  cell: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    type: PropTypes.oneOf([cellType.MARK, cellType.TIME, cellType.ISSUE, ""]),
    width: PropTypes.number,
    minWidth: PropTypes.number,
  }),
}

Cell.defaultProps = {}

export default Cell
