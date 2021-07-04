import React, { useState, useContext, useEffect } from "react"
import styled from "styled-components"

import { colors } from "@everlywell/leaves"

import { TableContext } from "contexts/table"

import { TABLE_PAGER_COUNT } from "utils/constants"

import Button from "./tablePageButton"
import Info from "./tableInfo"

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ButtonGroup = styled.div`
  color: ${colors.green5};
  word-wrap: break-word;
  font-size: 16px;
  display: flex;
  justify-content: center;
`

const Gap = styled.div`
  width: 250px;
`

export default ({
  count,
  totalRowCount,
  maxRowCount,
  fetchedPages,
  className,
  onLoadMore,
}) => {
  const { currentPage } = useContext(TableContext)
  const [isDisable, setIsDisable] = useState(false)

  let pageCom = []
  let startPage = 0
  let endPage = 0

  useEffect(() => {
    if (currentPage === count - 1) {
      setIsDisable(true)
    } else {
      setIsDisable(false)
    }
  }, [fetchedPages, currentPage, count])

  // add prev pagination button
  pageCom.push(
    <Button
      key={-1}
      page="prev"
      label="<<"
      maxRowCount={maxRowCount}
      totalRowCount={totalRowCount}
    />
  )

  startPage = parseInt(currentPage / TABLE_PAGER_COUNT, 10) * TABLE_PAGER_COUNT
  endPage =
    parseInt((currentPage + TABLE_PAGER_COUNT) / TABLE_PAGER_COUNT, 10) *
    TABLE_PAGER_COUNT

  // add number of pagination buttons
  for (let i = startPage; i < endPage; i++) {
    if (i < count) {
      pageCom.push(
        <Button
          key={i}
          page={i}
          label={i + 1}
          maxRowCount={maxRowCount}
          totalRowCount={totalRowCount}
        />
      )
    }
  }

  // add next pagination button
  pageCom.push(
    <Button
      key={count}
      page="next"
      label=">>"
      isDisable={isDisable}
      onLoadMore={onLoadMore}
      fetchedPages={fetchedPages}
      maxRowCount={maxRowCount}
      totalRowCount={totalRowCount}
    />
  )

  return (
    <StyledDiv className={className}>
      <Info />
      <ButtonGroup>{pageCom}</ButtonGroup>
      <Gap />
    </StyledDiv>
  )
}
