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

import { useResultsEnteredAtFilter } from "hooks"

const PopupResultsEnteredAt = ({ handleOpen }) => {
  const tableContext = useContext(TableContext)
  const { open } = useContext(PopupContext)
  const { filterResultsEnteredAt, filterResultsEnteredAtOption } = tableContext

  const popupOpen = open === Field.resultsEnteredAt.name

  const [getKitResultIds, { data, loading }] = useResultsEnteredAtFilter({})

  const [selectedOption, setSelectedOption] = useState(
    filterResultsEnteredAtOption
  )
  const [isCustomView, setCustomView] = useState(
    filterResultsEnteredAtOption === 5 ? true : false
  )
  const [beginDate, setBeginDate] = useState(
    filterResultsEnteredAt?.from
      ? filterResultsEnteredAt.from
      : getCurrentLocalDate()
  )

  const [endDate, setEndDate] = useState(
    filterResultsEnteredAt?.to ? filterResultsEnteredAt.to : null
  )

  useEffect(() => {
    if (!loading) {
      tableContext.setTable({
        filterResultsEnteredAtIds: data?.rapidTestsAggregate?.nodes?.map(
          node => node.kitResultId
        ),
        filterResultsEnteredAt: isCustomView
          ? { from: beginDate, to: endDate }
          : getFilterTimestamp(selectedOption),
        filterResultsEnteredAtOption: isCustomView ? 5 : selectedOption,
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
          resultsEnteredFrom: formatTimezoneDate({ date: from, isEnd: false }),
          resultsEnteredTo: formatTimezoneDate({ date: to, isEnd: true }),
        },
      })
    } else {
      tableContext.setTable({
        filterResultsEnteredAtIds: [],
        filterResultsEnteredAt: {},
        filterResultsEnteredAtOption: isCustomView ? 5 : selectedOption,
        currentPage: 0,
      })
    }
  }

  const doReset = () => {
    tableContext.setTable({
      filterResultsEnteredAt: "",
      filterResultsEnteredAtOption: 0,
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
      filter={filterResultsEnteredAt}
      showLatestOrder={false}
      onOpen={onOpen}
      onClose={onClose}
    />
  )
}

export default PopupResultsEnteredAt
