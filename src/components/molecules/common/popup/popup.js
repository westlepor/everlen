import React from "react"
import styled from "styled-components"
import Popup from "reactjs-popup"

import ThreeDotIcon from "components/atoms/icons/threeDot"

import { ROW_MENUS } from "utils/constants"

const Trigger = styled.div`
  height: 32px;
  width: 29px;
  justify-content: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 4px;
  margin-right: 4px;
`

const MenuItem = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background: #f5faf7;
  }
`

const PopupMenu = ({ list, detailId, isPdfExist }) => {
  const menus = list.map((e, i) => {
    if (e.label === ROW_MENUS.PDF && !isPdfExist) {
      return null
    }

    return (
      <MenuItem
        key={i}
        onClick={() => {
          e.handler(detailId, isPdfExist)
        }}
      >
        {e.label}
      </MenuItem>
    )
  })

  return (
    <Popup
      offsetX={-38}
      offsetY={-33}
      trigger={open => (
        <Trigger
          data-cy="popup-trigger"
          style={open ? { background: "#f5faf7" } : {}}
        >
          <ThreeDotIcon />
        </Trigger>
      )}
      position="bottom right"
      on={["click", "hover"]}
      mouseLeaveDelay={100}
      contentStyle={{
        padding: "11px 0",
        border: "none",
        borderRadius: "2px",
        boxShadow: "0 2px 30px -5px rgba(0, 0, 0, 0.1)",
      }}
      arrow={false}
    >
      <>{menus}</>
    </Popup>
  )
}

export default PopupMenu
