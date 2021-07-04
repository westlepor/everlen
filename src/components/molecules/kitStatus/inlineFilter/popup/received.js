import React, { useState, useContext } from "react"

import PopupTimes from "./times"

import { TableContext } from "contexts/table"
import { PopupContext } from "contexts/popup"
import { getFilterTimestamp, getCurrentLocalDate } from "utils/datetime"
import Field from "utils/fields"

const PopupReceived = ({ handleOpen }) => {
  const tableContext = useContext(TableContext)
  const { open } = useContext(PopupContext)

  const { filterReceived, filterReceivedOption } = tableContext
  const popupOpen = open === Field.receiveTime.name

  const [selectedOption, setSelectedOption] = useState(filterReceivedOption)
  const [isCustomView, setCustomView] = useState(
    filterReceivedOption === 5 ? true : false
  )
  const [beginDate, setBeginDate] = useState(
    filterReceived?.from ? filterReceived.from : getCurrentLocalDate()
  )

  const [endDate, setEndDate] = useState(
    filterReceived?.to ? filterReceived.to : null
  )

  const doFilter = () => {
    if (!isCustomView && selectedOption === 0) {
      doReset()
      return
    }

    tableContext.setTable({
      filterReceived: isCustomView
        ? {
            from: beginDate,
            to: endDate,
          }
        : getFilterTimestamp(selectedOption),
      filterReceivedOption: isCustomView ? 5 : selectedOption,
      currentPage: 0,
    })
  }

  const doReset = () => {
    tableContext.setTable({
      filterReceived: "",
      filterReceivedOption: 0,
    })
    setBeginDate(getCurrentLocalDate)
    setEndDate(null)
    setCustomView(false)
    setSelectedOption(0)
  }

  const doSelectFilter = option => {
    setSelectedOption(option)
  }

  const onOpen = () => {
    handleOpen && handleOpen(true)
  }

  const onClose = () => {
    handleOpen && handleOpen(false)
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
      filter={filterReceived}
      showLatestOrder={false}
      onOpen={onOpen}
      onClose={onClose}
    />
  )
}

export default PopupReceived
