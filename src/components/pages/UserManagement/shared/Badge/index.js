import React, { useState, useRef, useLayoutEffect } from "react"
import ReactTooltip from "react-tooltip"

import * as S from "./style"

const Badge = ({ id, children, onClick, maxWidth }) => {
  const [tooltip, setTooltip] = useState(false)

  useLayoutEffect(() => {
    setTooltip(badgeRef.current.getBoundingClientRect().width > maxWidth)
    // eslint-disable-next-line
  }, [])

  const badgeRef = useRef()

  return !!tooltip ? (
    <div>
      <ReactTooltip
        effect="solid"
        type="info"
        className={`custom-tooltip custom-tooltip-${maxWidth}`}
        id={`badge-${id}`}
      />
      <S.Badge
        onClick={onClick}
        maxWidth={maxWidth}
        data-tip={children}
        data-for={`badge-${id}`}
        data-cy="badge"
      >
        {children}
      </S.Badge>
    </div>
  ) : (
    <S.Badge
      onClick={onClick}
      ref={badgeRef}
      maxWidth={maxWidth}
      data-cy="badge"
    >
      {children}
    </S.Badge>
  )
}

export default Badge
