import React from "react"
import DatePicker from "react-datepicker"

import PopupAccessCode from "components/molecules/admin/accessCode/inlineFilter/popup"

import IconArrowRight from "components/atoms/icons/arrowRight"
import IconArrowLeft from "components/atoms/icons/arrowLeft"
import IconRadio from "components/atoms/icons/radio"
import IconRadioChecked from "components/atoms/icons/radioChecked"
import IconCalendar from "components/atoms/icons/calendar"

import { InlineFilterDate } from "utils/constants"

import { formatDatePickerTime, formatDate, getDateObject } from "utils/datetime"

import * as S from "./style"

const PopupTimes = ({
  open,
  beginDate,
  setBeginDate,
  endDate,
  setEndDate,
  isCustomView,
  setCustomView,
  doFilter,
  doReset,
  onOpen,
  onClose,
  doSelectFilter,
  selectedOption,
  showLatestOrder,
  column,
}) => {
  const radioBoxes = InlineFilterDate.map((value, index) => {
    return (
      <S.ItemContainer
        key={index}
        onClick={() => doSelectFilter(index)}
        data-cy="date-filter-option"
      >
        {selectedOption === index ? <IconRadioChecked /> : <IconRadio />}
        <S.Item>{value}</S.Item>
      </S.ItemContainer>
    )
  })

  // Get dates with timestamp
  const begin = new Date()
  const beginMembers = getDateObject(beginDate)
  begin.setYear(beginMembers.year)
  begin.setMonth(beginMembers.month)
  begin.setDate(beginMembers.date)

  let end = new Date()
  const endMembers = getDateObject(endDate)
  if (endMembers) {
    end.setYear(endMembers.year)
    end.setMonth(endMembers.month)
    end.setDate(endMembers.date)
  } else {
    end = null
  }

  const handleChangeDate = dates => {
    const [start, end] = dates
    setBeginDate(formatDatePickerTime(start))
    setEndDate(formatDatePickerTime(end))
  }

  const content = (
    <S.Content isCustom={isCustomView}>
      <S.Header
        isCustom={isCustomView || !showLatestOrder}
        hide={!showLatestOrder && !isCustomView}
      >
        {isCustomView && (
          <S.CustomHeaderTitle onClick={() => setCustomView(false)}>
            <S.OptionLeft>
              <IconArrowLeft />
            </S.OptionLeft>
            <S.CustomDateTitle>Custom Date</S.CustomDateTitle>
          </S.CustomHeaderTitle>
        )}
      </S.Header>

      {isCustomView && <S.MiddleLine />}

      {!isCustomView && (
        <S.ItemGroup>
          {radioBoxes}
          <S.CustomItemContainer>
            <S.CustomItem onClick={() => setCustomView(true)}>
              Custom Date
            </S.CustomItem>
            <S.OptionRight onClick={() => setCustomView(true)}>
              <IconArrowRight />
            </S.OptionRight>
          </S.CustomItemContainer>
        </S.ItemGroup>
      )}

      {isCustomView && (
        <>
          <S.DatePickInputContainer>
            <S.DatePickInput>
              <S.DatePickTitle>Start Date</S.DatePickTitle>
              <S.InputField
                readOnly
                value={formatDate(begin, "MM/DD/YY", false)}
              />
              <S.InputIcon>
                <IconCalendar />
              </S.InputIcon>
            </S.DatePickInput>
            <S.DatePickInput>
              <S.DatePickTitle>End Date</S.DatePickTitle>
              <S.InputField
                readOnly
                value={formatDate(end, "MM/DD/YY", false)}
              />
              <S.InputIcon>
                <IconCalendar />
              </S.InputIcon>
            </S.DatePickInput>
          </S.DatePickInputContainer>

          <DatePicker
            selected={begin}
            onChange={handleChangeDate}
            startDate={begin}
            endDate={end}
            selectsRange
            inline
            disabledKeyboardNavigation
            renderCustomHeader={({
              date,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
            }) => (
              <div className="header">
                <button
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                >
                  <IconArrowLeft />
                </button>
                <span>{formatDate(date, "MMMM YYYY")}</span>
                <button
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                >
                  <IconArrowRight />
                </button>
              </div>
            )}
          />
        </>
      )}
    </S.Content>
  )

  const isAvailableApply =
    (isCustomView && begin && end && begin.getTime() <= end.getTime()) ||
    (!isCustomView && selectedOption >= 0 && selectedOption <= 3)

  return (
    <PopupAccessCode
      open={open}
      column={column}
      menus={content}
      width={336}
      buttonWidth={131}
      onApply={isAvailableApply ? doFilter : null}
      onReset={doReset}
      onOpen={onOpen}
      onClose={onClose}
    />
  )
}

export default PopupTimes
