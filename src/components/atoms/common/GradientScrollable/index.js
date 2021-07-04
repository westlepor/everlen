import React, { useState, useRef, useEffect } from "react"

import * as S from "./style"

const GradientScrollable = ({ menus }) => {
  const scrollRef = useRef()
  const [gradientVisible, setGradientVisible] = useState(false)

  const handleScroll = () => {
    if (scrollRef?.current) {
      if (
        scrollRef.current.scrollHeight - scrollRef.current.scrollTop ===
        scrollRef.current.clientHeight
      ) {
        setGradientVisible(false)
      } else {
        setGradientVisible(true)
      }
    }
  }

  useEffect(() => {
    handleScroll()
    // eslint-disable-next-line
  }, [])

  return (
    <>
      {gradientVisible && <S.Gradient />}
      <S.Scroll ref={scrollRef} onScroll={handleScroll}>
        {menus}
      </S.Scroll>
    </>
  )
}

export default GradientScrollable
