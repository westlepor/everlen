import React, { useState, useEffect } from "react"

import SuggestionsTable from "../SuggestionsTable"

import * as S from "./style"

const MAX_HEIGHT = 230

const SearchSuggestion = ({ columns, data, type }) => {
  const [showGradient, setShowGradient] = useState(false)

  useEffect(() => {
    if (data?.length > 4) {
      setShowGradient(true)
    } else {
      setShowGradient(false)
    }
  }, [data])

  const onScroll = event => {
    if (event.target.scrollHeight - event.target.scrollTop > MAX_HEIGHT) {
      setShowGradient(true)
    } else {
      setShowGradient(false)
    }
  }

  if (!data) {
    return null
  }

  return (
    <S.Wrapper>
      {showGradient && <S.Gradient />}

      <S.Scroll onScroll={onScroll} maxHeight={MAX_HEIGHT}>
        <SuggestionsTable {...{ columns, data, type }} />
      </S.Scroll>
    </S.Wrapper>
  )
}

export default SearchSuggestion
