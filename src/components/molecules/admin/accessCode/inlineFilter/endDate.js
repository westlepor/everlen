import React, { useState, useContext } from "react"

import { AccessCodeContext } from "contexts/accessCode"
import { getFilterTimestamp, getCurrentLocalDate } from "utils/datetime"

import PopupTimes from "./dateFilter"

const PopupEndDate = ({ open, handleOpen, column }) => {
  const { setFilter } = column

  const { filterEndDate, filterEndDateOption, setAccessCode } = useContext(
    AccessCodeContext
  )

  const [selectedOption, setSelectedOption] = useState(filterEndDateOption)
  const [isCustomView, setCustomView] = useState(
    filterEndDateOption === 5 ? true : false
  )
  const [beginDate, setBeginDate] = useState(
    filterEndDate?.from ? filterEndDate.from : getCurrentLocalDate()
  )
  const [endDate, setEndDate] = useState(
    filterEndDate?.to ? filterEndDate.to : null
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
      filterEndDate: dateRange,
      filterEndDateOption: isCustomView ? 5 : selectedOption,
    })

    if (!dateRange) {
      setFilter([])
    } else {
      setFilter([dateRange.from, dateRange.to])
    }
  }

  const doReset = () => {
    setAccessCode({
      filterEndDate: "",
      filterEndDateOption: 0,
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
    if (!filterEndDate && !filterEndDateOption) {
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
      filter={filterEndDate}
      // for accessCode
      column={column}
    />
  )
}

export default PopupEndDate
