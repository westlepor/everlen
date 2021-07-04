import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import Cell from "./tableHeaderCell"
import Field from "utils/fields"

const StyledDiv = styled.div`
  display: flex;
  color: #252228;
  border-radius: 4px;
`

const TableHeader = ({ header, className }) => {
  const cellsItem = header.cells.map((elem, index) => (
    <Cell
      key={index}
      cell={elem}
      sortable={
        elem.value === Field.id.name ||
        elem.value === Field.name.name ||
        elem.value === Field.test.name ||
        elem.value === Field.client.name ||
        elem.value === Field.dob.name ||
        elem.value === Field.approveTime.name ||
        elem.value === Field.ordered.name ||
        elem.value === Field.participantViewedAt.name ||
        elem.value === Field.result.name
      }
      filterable={
        elem.value !== Field.id.name &&
        elem.value !== Field.name.name &&
        elem.value !== Field.email.name &&
        elem.value !== Field.dob.name &&
        elem.value !== Field.phone.name &&
        elem.value !== Field.thirdPartyMember.name
      }
    />
  ))

  return (
    <StyledDiv data-cy="table-header" className={className}>
      {cellsItem}
    </StyledDiv>
  )
}

TableHeader.propTypes = {
  isFake: PropTypes.bool,
}

TableHeader.defaultProps = { isFake: false }

export default TableHeader
