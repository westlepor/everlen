import React from "react"
import styled from "styled-components"

import NoResult from "components/atoms/icons/noResult"

import { Container, H4, colors } from "@everlywell/leaves"

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  padding: 53px 0;
`

const ImageView = styled.div`
  margin: 0 auto 33px auto;
`

const EmptyText = styled.div`
  text-align: center;
  font-size: 16px;
  color: ${colors.gray4};
`

const StyledH4 = styled(H4)`
  margin: 0 0 4px 0;
`

const TableEmpty = ({ isSuperAdmin }) => {
  return (
    <StyledContainer>
      <ImageView>
        <NoResult />
      </ImageView>

      <EmptyText>
        <StyledH4>
          {isSuperAdmin ? "No Test Kits" : "No Results Found"}
        </StyledH4>
      </EmptyText>

      {!isSuperAdmin && (
        <EmptyText>
          Please adjust your selected filters and try again.
        </EmptyText>
      )}
    </StyledContainer>
  )
}

export default TableEmpty
