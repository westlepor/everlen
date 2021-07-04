import React, { useState } from "react"
import Popup from "reactjs-popup"

import {
  formatLocalTime,
  nextOneHourTimeOptionsWithIncrement,
} from "utils/datetime"

import * as S from "./style"

const SCROLL_HEIGHT = 120

export default ({
  time,
  setTime,
  isShowIcon,
  style,
  className,
  timeOptions,
}) => {
  const [showGradient, setShowGradient] = useState(true)

  const options = timeOptions || nextOneHourTimeOptionsWithIncrement()

  const handleScroll = event => {
    const { scrollHeight, scrollTop } = event.target

    if (scrollHeight - scrollTop > SCROLL_HEIGHT) {
      setShowGradient(true)
    } else {
      setShowGradient(false)
    }
  }

  return (
    <Popup
      trigger={() => (
        <S.Container style={style} className={className}>
          <S.Label>{formatLocalTime({ time })}</S.Label>

          {isShowIcon && <S.MenuExpandIcon />}
        </S.Container>
      )}
      position="bottom left"
      on={["click"]}
      arrow={false}
      closeOnDocumentClick
      contentStyle={{
        width: "258px",
        padding: "0px",
        border: "none",
        borderRadius: "2px",
        boxShadow: "0 2px 30px -5px rgba(0, 0, 0, 0.1)",
        height: SCROLL_HEIGHT,
        overflowY: "auto",
      }}
    >
      {close => (
        <>
          {showGradient && <S.Overlay />}

          <S.MenuItemListWrapper onScroll={handleScroll}>
            {options.map(option => (
              <S.MenuItem
                key={option}
                onClick={() => {
                  close()
                  setTime(option)
                }}
              >
                {formatLocalTime({ time: option })}
              </S.MenuItem>
            ))}
          </S.MenuItemListWrapper>
        </>
      )}
    </Popup>
  )
}
