import React from "react"
import styled from "styled-components"
import DatePicker from "react-datepicker"

import { colors } from "@everlywell/leaves"

import Popup from "components/molecules/kitStatus/inlineFilter/popup/popup"
import IconArrowRight from "components/atoms/icons/arrowRight"
import IconArrowLeft from "components/atoms/icons/arrowLeft"
import IconRadio from "components/atoms/icons/radio"
import IconRadioChecked from "components/atoms/icons/radioChecked"
import IconCalendar from "components/atoms/icons/calendar"

import { InlineFilterDate } from "utils/constants"

import { formatDatePickerTime, formatDate, getDateObject } from "utils/datetime"

const Content = styled.div`
  margin: -17px -17px ${props => (props.isCustom ? "10px" : "-17px")}} -17px;
  color: ${colors.gray4};
  font-size: 18px;
`
const Header = styled.div`
  display: ${props => (props.hide ? "none" : "flex")};
  position: relative;
  align-items: center;
  padding: 0 0 7px 0;
`
const MiddleLine = styled.div`
  width: 100%;
  height: 1px;
  margin-left: 9px;
  border-bottom: 1px solid ${colors.gray2};
`
const ItemGroup = styled.div`
  margin: 14px 15px 0 15px;
`
const ItemContainer = styled.div`
  height: 35px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 9px 0;
  cursor: pointer;
`
const Item = styled.div`
  margin-left: 16px;
  font-family: "EW Nexa";
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.78;
  letter-spacing: normal;
  color: ${colors.gray4};
`
const CustomItemContainer = styled.div`
  height: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 9px 0 50px 0;
`
const CustomItem = styled.div`
  margin-left: 43px;
  font-family: "EW Nexa";
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.78;
  letter-spacing: normal;
  color: ${colors.gray4};
  cursor: pointer;
`
const CustomHeaderTitle = styled.div`
  display: contents;
`
const OptionRight = styled.div`
  height: 20px;
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: -15px;
  cursor: pointer;
`
const OptionLeft = styled.div`
  height: 20px;
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`
const CustomDateTitle = styled.div`
  margin-left: 3px;
  cursor: pointer;
  font-family: "EW Nexa";
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.78;
  letter-spacing: normal;
`
const DatePickInputContainer = styled.div`
  margin: 10px 8px 0 8px;
  display: flex;
  justify-content: space-between;
`

const DatePickInput = styled.div`
  margin-top: 3px;
  margin-bottom: 8px;
  position: relative;
`

const DatePickTitle = styled.div`
  font-family: "EW Nexa";
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  color: ${colors.gray4};
`

const InputField = styled.input`
  width: 91px;
  height: 17px;
  margin-top: 7px;
  padding: 12.5px 43px 12.5px 10px;
  border: 1px solid ${colors.green2};
  font-family: "EW Nexa";
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.75;
  letter-spacing: normal;
  color: ${colors.gray4};
  cursor: default;
  border-radius: 1px;
  box-shadow: 0 1.5px 10px 0 rgba(0, 0, 0, 0.1);

  &:focus {
    outline: none;
  }
`

const InputIcon = styled.div`
  position: absolute;
  top: 41px;
  right: 10px;
  width: 27px;
  height: 27px;
  margin-top: -2px;
  display: flex;
  justify-content: center;
  align-items: center;
`

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
  doSelectFilter,
  selectedOption,
  filter,
  showLatestOrder,
  onOpen,
  onClose,
  sorted,
}) => {
  const radioBoxes = InlineFilterDate.map((value, index) => {
    return (
      <ItemContainer
        key={index}
        onClick={() => doSelectFilter(index)}
        data-cy="date-filter-option"
      >
        {selectedOption === index ? <IconRadioChecked /> : <IconRadio />}
        <Item>{value}</Item>
      </ItemContainer>
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
    <Content isCustom={isCustomView}>
      <Header
        isCustom={isCustomView || !showLatestOrder}
        hide={!showLatestOrder && !isCustomView}
      >
        {isCustomView && (
          <CustomHeaderTitle onClick={() => setCustomView(false)}>
            <OptionLeft>
              <IconArrowLeft />
            </OptionLeft>
            <CustomDateTitle>Custom Date</CustomDateTitle>
          </CustomHeaderTitle>
        )}
      </Header>
      {isCustomView && <MiddleLine />}
      {!isCustomView && (
        <ItemGroup>
          {radioBoxes}
          <CustomItemContainer>
            <CustomItem onClick={() => setCustomView(true)}>
              Custom Date
            </CustomItem>
            <OptionRight onClick={() => setCustomView(true)}>
              <IconArrowRight />
            </OptionRight>
          </CustomItemContainer>
        </ItemGroup>
      )}
      {isCustomView && (
        <>
          <DatePickInputContainer>
            <DatePickInput>
              <DatePickTitle>Start Date</DatePickTitle>
              <InputField
                readOnly
                value={formatDate(begin, "MM/DD/YY", false)}
              />
              <InputIcon>
                <IconCalendar />
              </InputIcon>
            </DatePickInput>
            <DatePickInput>
              <DatePickTitle>End Date</DatePickTitle>
              <InputField readOnly value={formatDate(end, "MM/DD/YY", false)} />
              <InputIcon>
                <IconCalendar />
              </InputIcon>
            </DatePickInput>
          </DatePickInputContainer>
          <DatePicker
            selected={begin}
            onChange={handleChangeDate}
            startDate={begin}
            endDate={end}
            maxDate={new Date()}
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
    </Content>
  )

  const isAvailableApply =
    (isCustomView && begin && end && begin.getTime() <= end.getTime()) ||
    (!isCustomView && selectedOption >= 0 && selectedOption <= 3)

  return (
    <Popup
      open={open}
      menus={content}
      onOpen={onOpen}
      onClose={onClose}
      onApply={isAvailableApply ? doFilter : null}
      onReset={doReset}
      width={336}
      buttonWidth={131}
      isFiltered={filter}
      isNormalPopup={false}
      sorted={sorted}
    />
  )
}

export default PopupTimes
