import React, { useState, useRef, useLayoutEffect } from "react"
import ReactTooltip from "react-tooltip"
import * as S from "./style"

const MAX_WIDTH = 256

const Link = ({ children, onClick, maxWidth = MAX_WIDTH }) => {
  const [tooltip, setTooltip] = useState(false)

  useLayoutEffect(() => {
    setTooltip(linkRef.current.getBoundingClientRect().width >= maxWidth)
  }, [maxWidth])

  const linkRef = useRef()

  return !!tooltip ? (
    <div>
      <ReactTooltip
        effect="solid"
        type="info"
        className={`custom-tooltip custom-tooltip-${maxWidth}`}
        id="link"
      />
      <S.Wrapper ref={linkRef} maxWidth={maxWidth}>
        <S.Link
          onClick={onClick}
          maxWidth={maxWidth}
          data-tip={children}
          data-for="link"
        >
          {children}
        </S.Link>
      </S.Wrapper>
    </div>
  ) : (
    <S.Wrapper ref={linkRef} maxWidth={maxWidth}>
      <S.Link onClick={onClick} maxWidth={maxWidth}>
        {children}
      </S.Link>
    </S.Wrapper>
  )
}

export default Link
