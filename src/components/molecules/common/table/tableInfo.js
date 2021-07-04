import React, { useContext } from "react"
import styled from "styled-components"

import { typography } from "@everlywell/leaves"

import { TableContext } from "contexts/table"

const Wrapper = styled.div`
  font-weight: ${typography.weight.book};
`

export default () => {
  const tableContext = useContext(TableContext)
  const { info } = tableContext || {}
  const { start, end, total } = info || {}

  const endNumber = total > end ? end : total

  return total > 0 ? (
    <Wrapper>
      Showing {start} to {endNumber} of {total} entries
    </Wrapper>
  ) : null
}
