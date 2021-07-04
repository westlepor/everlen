import React from "react"

import Popup from "reactjs-popup"

import { getActiveTimezones, getNotActiveTimezones } from "utils/datetime"

import * as S from "./style"

export default ({ timezone, setTimezone, disabled, style, className }) => {
  const ACTIVE_TIMEZONES = getActiveTimezones()
  const NOT_ACTIVE_TIMEZONES = getNotActiveTimezones()

  const label = ACTIVE_TIMEZONES[timezone] || NOT_ACTIVE_TIMEZONES[timezone]

  if (disabled) {
    return (
      <S.Container style={style} className={className} disabled={true}>
        <S.Label data-cy="timezone-selector-label-disabled" disabled={true}>
          {label}
        </S.Label>
      </S.Container>
    )
  }

  return (
    <Popup
      trigger={() => (
        <S.Container style={style} className={className}>
          <S.Label data-cy="timezone-selector-label">{label}</S.Label>
          <S.MenuExpandIcon />
        </S.Container>
      )}
      on={["click"]}
      contentStyle={{
        width: "100%",
        padding: "11px 0",
        border: "none",
        borderRadius: "2px",
        boxShadow: "0 2px 30px -5px rgba(0, 0, 0, 0.1)",
      }}
      arrow={false}
      closeOnDocumentClick
    >
      {close => (
        <>
          {Object.keys(ACTIVE_TIMEZONES).map(timezone => (
            <S.MenuItem
              key={timezone}
              onClick={() => {
                close()
                setTimezone(timezone)
              }}
            >
              {ACTIVE_TIMEZONES[timezone]}
            </S.MenuItem>
          ))}
        </>
      )}
    </Popup>
  )
}
