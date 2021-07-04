import React, { useState, useContext } from "react"

import PopupTimes from "./times"

import { TableContext } from "contexts/table"
import { PopupContext } from "contexts/popup"
import { getFilterTimestamp, getCurrentLocalDate } from "utils/datetime"
import Field from "utils/fields"

const PopupApproved = ({ handleOpen, sorted }) => {
  const tableContext = useContext(TableContext)
  const { open } = useContext(PopupContext)

  const { filterApproved, filterApprovedOption } = tableContext
  const popupOpen = open === Field.approveTime.name

  const [selectedOption, setSelectedOption] = useState(filterApprovedOption)
  const [isCustomView, setCustomView] = useState(
    filterApprovedOption === 5 ? true : false
  )
  const [beginDate, setBeginDate] = useState(
    filterApproved?.from ? filterApproved.from : getCurrentLocalDate()
  )

  const [endDate, setEndDate] = useState(
    filterApproved?.to ? filterApproved.to : null
  )

  const doFilter = () => {
    if (!isCustomView && selectedOption === 0) {
      doReset()
      return
    }

    tableContext.setTable({
      filterApproved: isCustomView
        ? {
            from: beginDate,
            to: endDate,
          }
        : getFilterTimestamp(selectedOption),
      filterApprovedOption: isCustomView ? 5 : selectedOption,
      currentPage: 0,
    })
  }

  const doReset = () => {
    tableContext.setTable({
      filterApproved: "",
      filterApprovedOption: 0,
      descendingOption: "",
    })
    setBeginDate(getCurrentLocalDate)
    setEndDate(null)
    setCustomView(false)
    setSelectedOption(0)
  }

  const doOpen = () => {
    handleOpen && handleOpen(true)
  }

  const doClose = () => {
    handleOpen && handleOpen(false)
  }

  const doSelectFilter = option => {
    setSelectedOption(option)
  }

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
      selectedOption={selectedOption}
      filter={filterApproved}
      showLatestOrder={true}
      onOpen={doOpen}
      onClose={doClose}
      sorted={sorted}
    />
  )
}

export default PopupApproved
