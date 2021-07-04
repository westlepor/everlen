import React, { forwardRef } from "react"

import DateFnsUtils from "@date-io/date-fns"

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers"

import IconCalendar from "components/atoms/icons/calendar"

import * as S from "./style"

const DatePicker = forwardRef(
  (
    {
      name,
      label,
      value,
      onChange,
      minDate,
      maxDate,
      minDateMessage,
      maxDateMessage,
      disabled = false,
      disablePast = false,
      disableFuture = false,
      boldLabel = true,
      hideErrorMessage = false,
      ...rest
    },
    _ref
  ) => {
    return (
      <S.StyledDiv disabled={disabled}>
        <S.StyledLabel
          boldLabel={boldLabel}
          htmlFor={`date-picker-${name}`}
          disabled={disabled}
        >
          {label}
        </S.StyledLabel>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            autoOk
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            id={`date-picker-${name}`}
            inputVariant="outlined"
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
            placeholder="Select date"
            name={name}
            keyboardIcon={<IconCalendar />}
            disablePast={disablePast}
            disableFuture={disableFuture}
            value={value}
            onChange={onChange}
            minDate={minDate}
            maxDate={maxDate}
            invalidDateMessage="Please enter valid date."
            minDateMessage={hideErrorMessage ? "" : minDateMessage}
            maxDateMessage={maxDateMessage}
            maskChar="-"
            disabled={disabled}
            {...rest}
          />
        </MuiPickersUtilsProvider>
      </S.StyledDiv>
    )
  }
)

export default DatePicker
