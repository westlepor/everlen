import { useLayoutEffect, useState, useContext } from "react"

import { PopupContext } from "contexts/popup"

function useWindowResize() {
  const { open } = useContext(PopupContext)
  const [size, setSize] = useState({
    cellHeight: 0,
    cellOffsetX: 0,
    cellOffsetY: 0,
  })

  useLayoutEffect(() => {
    function updateSize() {
      let cellOffsetX = 0
      let cellOffsetY = 0
      if (open) {
        const triggerDom = document.querySelector(
          `#${open.split(" ").join("")}`
        )
        if (triggerDom) {
          cellOffsetX = triggerDom.offsetParent.offsetLeft + 8
          cellOffsetY = triggerDom.offsetParent.offsetTop + 2
        }
      }

      const headerCell = document.querySelector("[data-cy=table-header-cell]")
      if (headerCell) {
        setSize({
          cellHeight: headerCell.clientHeight,
          cellOffsetX,
          cellOffsetY,
        })
      }
    }
    window.addEventListener("resize", updateSize)
    updateSize()
    return () => window.removeEventListener("resize", updateSize)
  }, [open])
  return size
}

export default useWindowResize
