import React, { useState, useContext } from "react"

import { colors } from "@everlywell/leaves"

import PopupNormal from "./normal"
import PopupStartDate from "./startDate"
import PopupEndDate from "./endDate"

import Trigger, {
  FilteredIcon,
} from "components/molecules/kitStatus/inlineFilter/styles/trigger"
import IconFilter from "components/atoms/icons/filter"

import { PopupContext } from "contexts/popup"

import * as S from "components/pages/admin/AccessCode/AccessCodesTable/style"

const HeaderFilter = ({ data, column }) => {
  const {
    id,
    Header,
    canSort,
    filterValue,
    isSortedDesc,
    toggleSortBy,
  } = column
  const [hoverFilter, setHoverFilter] = useState(false)
  const { open: curPopup, setPopup } = useContext(PopupContext)
  const popupOpen = curPopup === id
  const filters = filterValue || []
  const isFiltered = filters.length > 0

  const setPopupOpen = isOpen => {
    if (!isOpen && id === curPopup) {
      setPopup({ open: "" })
    }
  }

  const openPopup = e => {
    e.preventDefault()
    e.stopPropagation()

    if (popupOpen) {
      setPopup({ open: "" })
    } else {
      const offsetX = e.currentTarget.offsetParent.offsetLeft + 8
      const offsetY = e.currentTarget.offsetParent.offsetTop + 2

      setPopup({
        open: id,
        offsetX: offsetX,
        offsetY: offsetY,
      })
    }
  }

  const trigger = (
    <div>
      <Trigger
        id={id}
        data-cy={`${id}-table-filter`}
        style={
          popupOpen
            ? {
                backgroundImage:
                  "linear-gradient(to bottom, rgb(204, 227, 213), rgb(204, 227, 213))",
              }
            : {}
        }
        onMouseEnter={() => setHoverFilter(true)}
        onMouseLeave={() => setHoverFilter(false)}
        onClick={openPopup}
      >
        {!isFiltered && <IconFilter color={colors.green5} />}
        {isFiltered && (
          <>
            <IconFilter color={colors.green5} />
            <FilteredIcon />
          </>
        )}
      </Trigger>
      <S.SortWrapper
        onClick={() => canSort && toggleSortBy(!isSortedDesc, false)}
      >
        <div data-cy="header-cell">{Header}</div>
        {(column.isSorted || (!hoverFilter && !popupOpen)) && (
          <S.ArrowIcon
            isSorted={column.isSorted}
            isSortedDesc={column.isSortedDesc}
          />
        )}
      </S.SortWrapper>
    </div>
  )

  let popup = (
    <PopupNormal
      open={popupOpen}
      column={column}
      data={data}
      handleOpen={setPopupOpen}
    />
  )
  if (id === "opens_at") {
    popup = (
      <PopupStartDate
        open={popupOpen}
        column={column}
        handleOpen={setPopupOpen}
      />
    )
  } else if (id === "closes_at") {
    popup = (
      <PopupEndDate
        open={popupOpen}
        column={column}
        handleOpen={setPopupOpen}
      />
    )
  }

  return (
    <>
      {popup}
      {trigger}
    </>
  )
}

export default HeaderFilter
