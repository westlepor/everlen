import React, { useState, useContext, useEffect } from "react"

import PopupTimes from "./times"

import { TableContext } from "contexts/table"
import { PopupContext } from "contexts/popup"
import { getFilterTimestamp, getCurrentLocalDate } from "utils/datetime"
import Field from "utils/fields"

const PopupOrdered = ({ handleOpen, sorted }) => {
  const tableContext = useContext(TableContext)
  const { open } = useContext(PopupContext)

  const { filterOrdered, filterOrderedOption, descendingOption } = tableContext
  const popupOpen = open === Field.ordered.name

  const [selectedOption, setSelectedOption] = useState(filterOrderedOption)
  const [isCustomView, setCustomView] = useState(
    filterOrderedOption === 5 ? true : false
  )
  const [beginDate, setBeginDate] = useState(
    filterOrdered?.from ? filterOrdered.from : getCurrentLocalDate()
  )

  const [endDate, setEndDate] = useState(
    filterOrdered?.to ? filterOrdered.to : null
  )

  const [isDescending, setDescending] = useState(descendingOption === "ordered")

  const doFilter = () => {
    if (!isCustomView && selectedOption === 0) {
      doReset()
      return
    }

    tableContext.setTable({
      filterOrdered: isCustomView
        ? {
            from: beginDate,
            to: endDate,
          }
        : getFilterTimestamp(selectedOption),
      filterOrderedOption: isCustomView ? 5 : selectedOption,
      descendingOption: isDescending ? "ordered" : "",
      currentPage: 0,
    })
  }

  const doReset = () => {
    tableContext.setTable({
      filterOrdered: "",
      filterOrderedOption: 0,
      descendingOption: "",
    })
    setBeginDate(getCurrentLocalDate)
    setEndDate(null)
    setCustomView(false)
    setSelectedOption(0)
  }

  const doSelectFilter = option => {
    setSelectedOption(option)
  }

  const doUpdateDescending = () => {
    setDescending(!isDescending)
  }

  const onOpen = () => {
    handleOpen && handleOpen(true)
  }

  const onClose = () => {
    handleOpen && handleOpen(false)
  }

  useEffect(() => {
    setDescending(descendingOption === "ordered")
  }, [descendingOption])

  return (
    <PopupTimes
      open={popupOpen}
      beginDate={beginDate}
      setBeginDate={setBeginDate}
      endDate={endDate}
      setEndDate={setEndDate}
      isCustomView={isCustomView}
      setCustomView={setCustomView}
      doFilter={doFilter}
      doReset={doReset}
      doSelectFilter={doSelectFilter}
      onOpen={onOpen}
      onClose={onClose}
      selectedOption={selectedOption}
      filter={filterOrdered}
      isDescending={isDescending}
      hasDescendingOption={descendingOption === "ordered"}
      showLatestOrder={false}
      doUpdateDescending={doUpdateDescending}
      sorted={sorted}
    />
  )
}

export default PopupOrdered
