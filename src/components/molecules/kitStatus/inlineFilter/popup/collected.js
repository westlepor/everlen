import React, { useState, useContext, useEffect } from "react"

import PopupTimes from "./times"

import { TableContext } from "contexts/table"
import { PopupContext } from "contexts/popup"

import {
  getFilterTimestamp,
  getCurrentLocalDate,
  formatTimezoneDate,
} from "utils/datetime"

import Field from "utils/fields"

import { useCollectedAtFilter } from "hooks"

const PopupCollected = ({ handleOpen }) => {
  const tableContext = useContext(TableContext)
  const { open } = useContext(PopupContext)
  const { filterCollected, filterCollectedOption } = tableContext

  const popupOpen = open === Field.collectTime.name

  const [getKitResultIds, { data, loading }] = useCollectedAtFilter({})

  const [selectedOption, setSelectedOption] = useState(filterCollectedOption)
  const [isCustomView, setCustomView] = useState(
    filterCollectedOption === 5 ? true : false
  )
  const [beginDate, setBeginDate] = useState(
    filterCollected?.from ? filterCollected.from : getCurrentLocalDate()
  )

  const [endDate, setEndDate] = useState(
    filterCollected?.to ? filterCollected.to : null
  )

  useEffect(() => {
    if (!loading) {
      tableContext.setTable({
        filterCollectedIds: data?.rapidTestsAggregate?.nodes?.map(
          node => node.kitResultId
        ),
        filterCollected: isCustomView
          ? { from: beginDate, to: endDate }
          : getFilterTimestamp(selectedOption),
        filterCollectedOption: isCustomView ? 5 : selectedOption,
        currentPage: 0,
      })
    }
    // eslint-disable-next-line
  }, [loading])

  const doFilter = () => {
    if (!isCustomView && selectedOption === 0) {
      doReset()
      return
    }

    const { from, to } = isCustomView
      ? { from: beginDate, to: endDate }
      : getFilterTimestamp(selectedOption) || {}

    if (from && to) {
      getKitResultIds({
        variables: {
          collectedFrom: formatTimezoneDate({ date: from, isEnd: false }),
          collectedTo: formatTimezoneDate({ date: to, isEnd: true }),
        },
      })
    } else {
      tableContext.setTable({
        filterCollectedIds: [],
        filterCollected: {},
        filterCollectedOption: isCustomView ? 5 : selectedOption,
        currentPage: 0,
      })
    }
  }

  const doReset = () => {
    tableContext.setTable({
      filterCollected: "",
      filterCollectedOption: 0,
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
      filter={filterCollected}
      showLatestOrder={false}
      onOpen={onOpen}
      onClose={onClose}
    />
  )
}

export default PopupCollected
