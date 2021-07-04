import React, { useState, useEffect } from "react"

import { useRunAfterUpdate } from "hooks"

import { formatLocalTime, isValidCollectionTime, dayjs } from "utils/datetime"

import AmPm from "./AmPmSelector"

import { normalizeTime, moveCursor, getUpdatedTime } from "./utils"

import * as S from "./style"

const WithAmPm = ({ time, setTime, isShowIcon }) => {
  const [ampm, setAmpm] = useState("AM")
  const [ampmOpened, setAmpmOpened] = useState(false)
  const [hourMin, setHourMin] = useState(dayjs().format("hh:mm"))

  const runAfterUpdate = useRunAfterUpdate()

  useEffect(() => {
    const localTime = formatLocalTime({ time })
    if (localTime !== "Invalid Date") {
      const arr = localTime.split(" ")
      if (arr.length >= 2) {
        setHourMin(arr[0])
        setAmpm(arr[1])
      }
    }
    // eslint-disable-next-line
  }, [])

  const handleChange = (ampm, hourMin) => {
    const updatedTime = getUpdatedTime(ampm, hourMin)
    setTime(updatedTime)
  }

  const onInputChange = event => {
    event.preventDefault()
    event.stopPropagation()
  }

  const onInputKeyDown = e => {
    const newTime = normalizeTime(hourMin, e)

    if (newTime != null) {
      const [cursorStart, cursorEnd] = moveCursor(e)

      setHourMin(newTime)
      handleChange(ampm, newTime)

      e.target.selectionEnd = cursorStart
      e.target.selectionStart = cursorEnd

      runAfterUpdate(() => {
        e.target.selectionEnd = cursorStart
        e.target.selectionStart = cursorEnd
      })
    }
  }

  const isTimeSelectedInFuture = isValidCollectionTime(time) === "future"
  const isTimeSelectedTooLateInPast = isValidCollectionTime(time) === "past"

  return (
    <S.Container>
      <S.Wrapper>
        <S.Input
          ref={input => input && !ampmOpened && input.focus()}
          value={hourMin}
          isValidTime={
            isValidCollectionTime(time) !== "past" &&
            isValidCollectionTime(time) !== "future"
          }
          onKeyDown={onInputKeyDown}
          onChange={onInputChange}
        />

        <AmPm
          ampm={ampm}
          setAmpm={ampm => {
            setAmpm(ampm)
            handleChange(ampm, hourMin)
          }}
          isShowIcon={isShowIcon}
          isValidTime={!isTimeSelectedTooLateInPast && !isTimeSelectedInFuture}
          onOpen={() => setAmpmOpened(true)}
        />
      </S.Wrapper>

      {isTimeSelectedTooLateInPast && (
        <S.Error>
          Please select a time in the last 12 hours (current day).
        </S.Error>
      )}

      {isTimeSelectedInFuture && (
        <S.Error>
          Please select a time in the last 12 hours (current day). We do not
          support sample collections for a future time.
        </S.Error>
      )}
    </S.Container>
  )
}

export default WithAmPm
