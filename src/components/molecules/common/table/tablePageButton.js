import React, { useContext } from "react"
import styled from "styled-components"

import { colors } from "@everlywell/leaves"

import { TableContext } from "contexts/table"

const Button = styled.div`
  display: flex;
  flex-direction: column;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border: 1px solid ${colors.green2};
  border-radius: 3px;
  margin: 3px;
  cursor: pointer;
  &:hover {
    background: rgba(214, 235, 221, 0.2);
  }
`

const DisabledButton = styled.div`
  display: flex;
  flex-direction: column;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border: 1px solid ${colors.gray1};
  border-radius: 3px;
  margin: 3px;
  cursor: not-allowed;
  color: ${colors.gray2};
`

export default ({
  label,
  page,
  fetchedPages,
  className,
  onLoadMore,
  isDisable,
  maxRowCount,
  totalRowCount,
}) => {
  const tableContext = useContext(TableContext)
  let style = {}

  if (tableContext.currentPage === page) {
    style = { backgroundColor: "rgba(214,235,221,0.2)" }
  }

  const handleClick = () => {
    let updatePage = 0
    if (page === "next") {
      updatePage = tableContext.currentPage + 1
    } else if (page === "prev") {
      updatePage = tableContext.currentPage - 1
    } else {
      updatePage = page
    }

    const info = {
      start: updatePage * maxRowCount + 1,
      end: (updatePage + 1) * maxRowCount,
      total: totalRowCount,
    }

    if (page === "next") {
      tableContext.setTable({ currentPage: tableContext.currentPage + 1, info })
      if (fetchedPages <= tableContext.currentPage + 2) {
        onLoadMore()
      }
    } else if (page === "prev") {
      tableContext.setTable({ currentPage: tableContext.currentPage - 1, info })
    } else {
      tableContext.setTable({ currentPage: page, info })
    }
  }

  if (
    (tableContext.currentPage === 0 && page === "prev") ||
    (isDisable && page === "next")
  ) {
    return (
      <DisabledButton
        id={`tablePageButton_` + page}
        className={className}
        style={style}
      >
        {label}
      </DisabledButton>
    )
  }

  return (
    <Button
      id={`tablePageButton_` + page}
      className={className}
      style={style}
      onClick={handleClick}
    >
      {label}
    </Button>
  )
}
