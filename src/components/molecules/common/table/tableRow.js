import React from "react"
import styled from "styled-components"

import { colors } from "@everlywell/leaves"

import PopupMenu from "components/molecules/common/popup/popup"
import Skeleton from "components/atoms/common/skeleton"

import Cell from "./tableCell"

import { FAKE_CELL_W_PC } from "utils/fields"

const StyledDiv = styled.div`
  display: flex;
  align-items: stretch;
  position: relative;
`

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  align-items: center;
  box-sizing: border-box;
  width: 3%;
  flex-shrink: 1;
  border-bottom: 4px solid ${colors.teal1};
`

const FakeMenuWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: ${FAKE_CELL_W_PC}%;
  align-self: flex-end;
  border-bottom: 2px solid ${colors.gray1};
  padding: 0 16px;
`

const MenuSkeleton = styled(Skeleton)`
  width: 100%;
  margin-bottom: 54px;
`

export default ({ row, menus }) => {
  const cells = row.cells.map((elem, key) => <Cell key={key} cell={elem} />)

  return (
    <StyledDiv data-cy="table-row">
      {cells}

      {row.isFake ? (
        <FakeMenuWrapper>
          <MenuSkeleton row={10} />
        </FakeMenuWrapper>
      ) : (
        <MenuWrapper>
          <PopupMenu
            list={menus}
            detailId={row.id}
            isPdfExist={row.isPdfExist}
          />
        </MenuWrapper>
      )}
    </StyledDiv>
  )
}
