import React from "react"

import Popup from "reactjs-popup"

import * as S from "./style"

export default ({ maxRows, setMaxRows, style, className }) => {
  const label = maxRows + " per page"

  return (
    <Popup
      trigger={() => (
        <S.Container style={style} className={className}>
          <S.Label>{label}</S.Label>
          <S.MenuExpandIcon />
        </S.Container>
      )}
      on={["click"]}
      contentStyle={{
        width: "146px",
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
          <S.MenuItem
            onClick={() => {
              close()
              setMaxRows(25)
            }}
          >
            25 per page
          </S.MenuItem>
          <S.MenuItem
            onClick={() => {
              close()
              setMaxRows(50)
            }}
          >
            50 per page
          </S.MenuItem>
          <S.MenuItem
            onClick={() => {
              close()
              setMaxRows(100)
            }}
          >
            100 per page
          </S.MenuItem>
        </>
      )}
    </Popup>
  )
}
