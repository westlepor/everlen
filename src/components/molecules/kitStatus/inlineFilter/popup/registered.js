import React, { useState, useContext } from "react"

import PopupTimes from "./times"

import { TableContext } from "contexts/table"
import { PopupContext } from "contexts/popup"
import { getFilterTimestamp, getCurrentLocalDate } from "utils/datetime"
import Field from "utils/fields"

const PopupRegistered = ({ handleOpen }) => {
  const tableContext = useContext(TableContext)
  const { open } = useContext(PopupContext)

  const { filterRegistered, filterRegisteredOption } = tableContext
  const popupOpen = open === Field.registerTime.name

  const [selectedOption, setSelectedOption] = useState(filterRegisteredOption)
  const [isCustomView, setCustomView] = useState(
    filterRegisteredOption === 5 ? true : false
  )
  const [beginDate, setBeginDate] = useState(
    filterRegistered?.from ? filterRegistered.from : getCurrentLocalDate()
  )

  const [endDate, setEndDate] = useState(
    filterRegistered?.to ? filterRegistered.to : null
  )

  const doFilter = () => {
    if (!isCustomView && selectedOption === 0) {
      doReset()
      return
    }

    tableContext.setTable({
      filterRegistered: isCustomView
        ? {
            from: beginDate,
            to: endDate,
          }
        : getFilterTimestamp(selectedOption),
      filterRegisteredOption: isCustomView ? 5 : selectedOption,
      currentPage: 0,
    })
  }

  const doReset = () => {
    tableContext.setTable({
      filterRegistered: "",
      filterRegisteredOption: 0,
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
      filter={filterRegistered}
      showLatestOrder={false}
      onOpen={onOpen}
      onClose={onClose}
    />
  )
}

export default PopupRegistered
