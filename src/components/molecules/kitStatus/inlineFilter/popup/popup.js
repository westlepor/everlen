import React, { useEffect, useContext } from "react"
import Popup from "reactjs-popup"

import {
  PopupContent,
  ResetButton,
  ApplyButton,
  Buttons,
} from "components/molecules/kitStatus/inlineFilter/styles/popupContent"

import { PopupContext } from "contexts/popup"
import useWindowResize from "hooks/useWindowResize"

const PopupBase = ({
  open,
  menus,
  onOpen,
  onClose,
  onApply,
  onReset,
  width,
  buttonWidth,
  isScrollable = false,
  isNormalPopup = true,
}) => {
  const { offsetX, offsetY, setPopup } = useContext(PopupContext)
  const { cellHeight, cellOffsetX, cellOffsetY } = useWindowResize()
  let mixedOffsetX = cellOffsetX ? cellOffsetX : offsetX
  let mixedOffsetY = cellOffsetY ? cellOffsetY : offsetY

  const tableDom = document.querySelector("#kit-table")
  if (tableDom) {
    mixedOffsetX -= tableDom.scrollLeft
    if (mixedOffsetX < tableDom.offsetLeft) {
      mixedOffsetX = tableDom.offsetLeft
    }

    const maxLeft = tableDom.offsetLeft + tableDom.clientWidth - width
    if (mixedOffsetX > maxLeft) {
      mixedOffsetX = maxLeft
    }
  }

  mixedOffsetY -= window.scrollY
  mixedOffsetY += cellHeight

  useEffect(() => {
    const popup = document.querySelector("#filter-popup")
    if (popup) {
      popup.style.left = `${mixedOffsetX}px`
      popup.style.top = `${mixedOffsetY}px`
    }
  }, [mixedOffsetX, mixedOffsetY])

  return (
    <Popup
      open={open}
      trigger={() => <div style={{ display: "none" }}></div>}
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
      }}
      offsetX={mixedOffsetX}
      offsetY={mixedOffsetY}
      arrow={false}
      onOpen={onOpen}
      onClose={onClose}
    >
      {close => (
        <PopupContent
          data-cy="popup-content"
          id="filter-popup"
          isScrollable={isScrollable}
        >
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
              isDisabled={!onReset}
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

export default PopupBase
