import React from "react"
import Popup from "reactjs-popup"

import * as S from "./style"

const AmPmSelector = ({
  ampm,
  setAmpm,
  style,
  className,
  isValidTime,
  onOpen,
}) => {
  const options = ["AM", "PM"]

  return (
    <Popup
      trigger={() => (
        <S.AmContainer
          style={style}
          className={className}
          tabIndex="0"
          id="ampm"
          isValidTime={isValidTime}
        >
          <S.Label>{ampm}</S.Label>

          <S.MenuExpandIcon isValidTime={isValidTime} />
        </S.AmContainer>
      )}
      position="bottom left"
      on={["click"]}
      arrow={false}
      closeOnDocumentClick
      contentStyle={{
        width: "86px",
        padding: "0px",
        border: "none",
        borderRadius: "2px",
        boxShadow: "0 2px 30px -5px rgba(0, 0, 0, 0.1)",
        overflowY: "hidden",
      }}
      onOpen={onOpen}
      onClose={() => {
        document.querySelector("#ampm").focus()
      }}
    >
      {close => (
        <>
          <S.MenuItemListWrapper>
            {options.map(option => (
              <S.MenuItem
                key={option}
                onClick={() => {
                  close()
                  setAmpm(option)
                }}
              >
                {option}
              </S.MenuItem>
            ))}
          </S.MenuItemListWrapper>
        </>
      )}
    </Popup>
  )
}

export default AmPmSelector
