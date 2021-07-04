import React, { useState, useContext, useEffect } from "react"

import PopupTimes from "./times"

import { TableContext } from "contexts/table"
import { PopupContext } from "contexts/popup"
import { getFilterTimestamp, getCurrentLocalDate } from "utils/datetime"
import Field from "utils/fields"

const PopupParticipantViewedAt = ({ handleOpen, sorted }) => {
  const tableContext = useContext(TableContext)
  const { open } = useContext(PopupContext)

  const {
    filterParticipantViewedAt,
    filterParticipantViewedAtOption,
    descendingOption,
  } = tableContext
  const popupOpen = open === Field.participantViewedAt.name

  const [selectedOption, setSelectedOption] = useState(
    filterParticipantViewedAtOption
  )
  const [isCustomView, setCustomView] = useState(
    filterParticipantViewedAtOption === 5 ? true : false
  )
  const [beginDate, setBeginDate] = useState(
    filterParticipantViewedAt?.from
      ? filterParticipantViewedAt.from
      : getCurrentLocalDate()
  )

  const [endDate, setEndDate] = useState(
    filterParticipantViewedAt?.to ? filterParticipantViewedAt.to : null
  )

  const [isDescending, setDescending] = useState(
    descendingOption === "participantViewedAt"
  )

  const doFilter = () => {
    if (!isCustomView && selectedOption === 0) {
      doReset()
      return
    }

    tableContext.setTable({
      filterParticipantViewedAt: isCustomView
        ? {
            from: beginDate,
            to: endDate,
          }
        : getFilterTimestamp(selectedOption),
      filterParticipantViewedAtOption: isCustomView ? 5 : selectedOption,
      descendingOption: isDescending ? "participantViewedAt" : "",
      currentPage: 0,
    })
  }

  const doReset = () => {
    tableContext.setTable({
      filterParticipantViewedAt: "",
      filterParticipantViewedAtOption: 0,
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
    setDescending(descendingOption === "participantViewedAt")
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
      filter={filterParticipantViewedAt}
      isDescending={isDescending}
      hasDescendingOption={descendingOption === "participantViewedAt"}
      showLatestOrder={false}
      doUpdateDescending={doUpdateDescending}
      sorted={sorted}
    />
  )
}

export default PopupParticipantViewedAt
