import React, { useEffect, useLayoutEffect, useRef, useState } from "react"

import SearchIcon from "components/atoms/icons/search"
import CloseIcon from "components/atoms/icons/close"

import * as S from "./style"

const Search = ({
  placeholder,
  value,
  children,
  onChange,
  onReset,
  setShouldShowSuggestions,
  setFilter,
}) => {
  const [focus, setFocus] = useState(false)

  const wrapperRef = useRef()

  useEffect(() => {
    // makes it possible to detect outside click
    const onClickOutside = event => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShouldShowSuggestions(false)
      }
    }

    document.addEventListener("click", onClickOutside, false)

    return () => {
      document.removeEventListener("click", onClickOutside, false)
    }
    // eslint-disable-next-line
  }, [])

  useLayoutEffect(() => {
    // removes default browser autocomplete behavior
    document
      .querySelector("input[id=search]")
      .setAttribute("autocomplete", "off")
  }, [])

  const onKeyDown = e => {
    if (e.key === "Enter") {
      setFilter(value)
    } else if (e.key === "ArrowDown") {
      const firstRow = document.getElementById("row-0")
      if (firstRow) {
        firstRow.focus()
      }
      e.preventDefault()
    }
  }

  const onFocus = () => {
    setShouldShowSuggestions(true)
    setFocus(true)
  }

  const onBlur = () => setFocus(false)

  return (
    <div ref={wrapperRef}>
      <S.Wrapper isExpanded={focus || !!value}>
        <S.SearchIconWrapper>
          <SearchIcon />
        </S.SearchIconWrapper>

        <S.Input
          id="search"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onFocus={onFocus}
          onBlur={onBlur}
        />

        {!!value && (
          <S.CloseIconWrapper onClick={onReset}>
            <CloseIcon />
          </S.CloseIconWrapper>
        )}
      </S.Wrapper>

      {children}
    </div>
  )
}

export default Search
