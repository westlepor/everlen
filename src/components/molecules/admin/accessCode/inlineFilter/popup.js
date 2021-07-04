import React, { useContext } from "react"
import Popup from "reactjs-popup"

import {
  PopupContent,
  ResetButton,
  ApplyButton,
  Buttons,
} from "components/molecules/kitStatus/inlineFilter/styles/popupContent"

import { PopupContext } from "contexts/popup"

const calcOffsetX = (id, popupWidth) => {
  let offsetX = 0
  const tableDom = document.querySelector("#access-code-table")
  const headerDom = document.querySelector(`#header-${id}`)
  if (!tableDom || !headerDom) {
    return offsetX
  }
  const offsetRight =
    tableDom.clientWidth - (headerDom.offsetLeft - tableDom.scrollLeft) - 16
  if (popupWidth > offsetRight) {
    offsetX = offsetRight - popupWidth
  }
  return offsetX
}

const PopupBase = ({
  column,
  open,
  menus,
  onOpen,
  onClose,
  onApply,
  onReset,
  width,
  buttonWidth,
  isNormalPopup = true,
}) => {
  const { id } = column
  const { setPopup } = useContext(PopupContext)
  const offsetX = calcOffsetX(id, width)

  return (
    <Popup
      open={open}
      trigger={() => <div style={{ height: "0px", minHeight: "0px" }}></div>}
      position="bottom left"
      on={["click"]}
      mouseLeaveDelay={100}
      contentStyle={{
        padding: "0px 0px 0px 0px",
        border: "none",
        borderRadius: "2px",
        boxShadow: "0 2px 30px -5px rgba(0, 0, 0, 0.1)",
        width: `${width}px`,
        cursor: "default",
        display: "block",
      }}
      offsetX={offsetX}
      offsetY={46}
      arrow={false}
      onOpen={onOpen}
      onClose={onClose}
    >
      {close => (
        <PopupContent data-cy="popup-content" id="filter-popup">
          {menus}

          <Buttons isNormalPopup={isNormalPopup}>
            <ResetButton
              appearance="secondary"
              onClick={() => {
                onReset()
                close()
                setPopup({ open: "" })
              }}
              width={buttonWidth}
            >
              Reset
            </ResetButton>
            <ApplyButton
              appearance="primary"
              onClick={() => {
                if (onApply) {
                  onApply()
                  close()
                  setPopup({ open: "" })
                }
              }}
              width={buttonWidth}
              isDisabled={!onApply}
            >
              Apply
            </ApplyButton>
          </Buttons>
        </PopupContent>
      )}
    </Popup>
  )
}

PopupBase.defaultProps = {
  width: 282,
}

export default PopupBase
