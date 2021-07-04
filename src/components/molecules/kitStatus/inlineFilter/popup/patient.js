import React, { useState, useContext } from "react"
import styled from "styled-components"

import { colors, CheckMark } from "@everlywell/leaves"

import Popup from "components/molecules/kitStatus/inlineFilter/popup/popup"
import ArrowUp from "components/atoms/icons/arrowUp"
import ArrowDown from "components/atoms/icons/arrowDown1"

import { TableContext } from "contexts/table"
import Field from "utils/fields"

const MenuItem = styled.label`
  padding: 8px 0;
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
`

const MenuLabel = styled.div`
  font-size: 18px;
  color: ${colors.gray4};
  line-height: 1.78;
  font-weight: normal;
  margin-left: 22px;
`

const IconCheckMark = styled(CheckMark)`
  position: absolute;
  right: 0;
  color: ${colors.green4};
  height: 24px;
`

const IconArrowUp = styled(ArrowUp)`
  fill: ${colors.gray4};
  width: 15px;
  height: 20px;
`

const IconArrowDown = styled(ArrowDown)`
  stroke: ${colors.gray4};
  width: 15px;
  height: 20px;
`

const PopupPatient = ({ sorted }) => {
  const tableContext = useContext(TableContext)
  const {
    sort: { direction, field },
  } = tableContext
  const [filterPatient, setFilterPatient] = useState(
    field === Field.name.name ? direction : ""
  )

  const doFilter = () => {
    if (["asc_nulls_last", "asc_nulls_last"].includes(filterPatient)) {
      tableContext.setTable({
        sort: {
          direction: filterPatient,
          field: Field.name.name,
        },
        currentPage: 0,
        descendingOption: "", // should remove other sorts
      })
    }
  }

  const doReset = () => {
    tableContext.setTable({
      sort: {
        direction: "",
        field: "",
      },
    })
    setFilterPatient("")
  }

  const doClose = () => {
    setFilterPatient(field === Field.name.name ? direction : "")
  }

  const menus = (
    <>
      <MenuItem onClick={() => setFilterPatient("asc_nulls_last")}>
        <IconArrowUp />
        <MenuLabel>Sort A - Z</MenuLabel>
        {filterPatient === "asc_nulls_last" && <IconCheckMark />}
      </MenuItem>
      <MenuItem onClick={() => setFilterPatient("desc_nulls_last")}>
        <IconArrowDown />
        <MenuLabel>Sort Z - A</MenuLabel>
        {filterPatient === "desc_nulls_last" && <IconCheckMark />}
      </MenuItem>
    </>
  )

  return (
    <Popup
      menus={<>{menus}</>}
      onApply={doFilter}
      onReset={doReset}
      onClose={doClose}
      isFiltered={field === Field.name.name}
      width={336}
      buttonWidth={130}
      sorted={sorted}
    />
  )
}

export default PopupPatient
