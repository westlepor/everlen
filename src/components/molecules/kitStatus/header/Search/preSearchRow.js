import React from "react"
import styled from "styled-components"

import { colors, size } from "@everlywell/leaves"

import Cell from "./preSearchCell"

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  margin: 0 ${size.lg}px;
  cursor: pointer;
  border-bottom: ${props =>
    !props.isLast ? `4px solid ${colors.teal1}` : "none"};
`

export default ({ row, openDetailView, isLast }) => {
  const styles = ["19%", "21%", "23%", "38%"]
  const cells = row.cells.map((elem, key) => (
    <Cell key={key} cell={elem} width={styles[key]} />
  ))

  return (
    <StyledDiv onClick={openDetailView} isLast={isLast}>
      {cells}
    </StyledDiv>
  )
}
