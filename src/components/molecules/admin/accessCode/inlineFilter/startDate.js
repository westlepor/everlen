import React, { useState, useContext } from "react"

import { AccessCodeContext } from "contexts/accessCode"
import { getFilterTimestamp, getCurrentLocalDate } from "utils/datetime"

import PopupTimes from "./dateFilter"

const PopupStartDate = ({ open, handleOpen, column }) => {
  const { setFilter } = column

  const { filterStartDate, filterStartDateOption, setAccessCode } = useContext(
    AccessCodeContext
  )

  const [selectedOption, setSelectedOption] = useState(filterStartDateOption)
  const [isCustomView, setCustomView] = useState(
    filterStartDateOption === 5 ? true : false
  )
  const [beginDate, setBeginDate] = useState(
    filterStartDate?.from ? filterStartDate.from : getCurrentLocalDate()
  )
  const [endDate, setEndDate] = useState(
    filterStartDate?.to ? filterStartDate.to : null
  )

  const doFilter = () => {
    if (!isCustomView && selectedOption === 0) {
      doReset()
      return
    }

    const dateRange = isCustomView
      ? {
          from: beginDate,
          to: endDate,
        }
      : getFilterTimestamp(selectedOption)

    setAccessCode({
      filterStartDate: dateRange,
      filterStartDateOption: isCustomView ? 5 : selectedOption,
    })

    if (!dateRange) {
      setFilter([])
    } else {
      setFilter([dateRange.from, dateRange.to])
    }
  }

  const doReset = () => {
    setAccessCode({
      filterStartDate: "",
      filterStartDateOption: 0,
    })

    setFilter([])
    setBeginDate(getCurrentLocalDate)
    setEndDate(null)
    setCustomView(false)
    setSelectedOption(0)
  }

  const doSelectFilter = option => {
    setSelectedOption(option)
  }

  const doOpen = () => {
    if (!filterStartDate && !filterStartDateOption) {
      setBeginDate(getCurrentLocalDate)
      setEndDate(null)
      setCustomView(false)
      setSelectedOption(0)
    }

    handleOpen && handleOpen(true)
  }

  const doClose = () => {
    handleOpen && handleOpen(false)
  }

  return (
    <PopupTimes
      open={open}
      beginDate={beginDate}
      setBeginDate={setBeginDate}
      endDate={endDate}
      setEndDate={setEndDate}
      isCustomView={isCustomView}
      setCustomView={setCustomView}
      doFilter={doFilter}
      doReset={doReset}
      onOpen={doOpen}
      onClose={doClose}
      doSelectFilter={doSelectFilter}
      selectedOption={selectedOption}
      filter={filterStartDate}
      // for accessCode
      column={column}
    />
  )
}

export default PopupStartDate
