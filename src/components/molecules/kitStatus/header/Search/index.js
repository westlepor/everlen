import React, { useRef, useState, useEffect, useContext } from "react"

import ClearIcon from "components/atoms/icons/clear"
import SearchIcon from "components/atoms/icons/search"
import Row from "./preSearchRow"

import { TableContext } from "contexts/table"
import { SEARCH_CELL_KEYS } from "utils/constants"

import indicatorGif from "images/search-indicator.gif"

import * as S from "./style"

const SearchBox = ({ placeholder, data, isSearchLoading }) => {
  const wrapperRef = useRef(null)

  const tableContext = useContext(TableContext)

  const [searchText, setSearchText] = useState(tableContext.searchText)
  const [isLoading, setIsLoading] = useState(isSearchLoading)
  const [isTableSearchFiltered, setTableSearchFiltered] = useState(
    !!tableContext.searchText
  )
  const [focus, setFocus] = useState(false)
  const [showGradient, setShowGradient] = useState(false)

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false)
    if (searchText && data?.rows?.length > 4) {
      setShowGradient(true)
    } else {
      setShowGradient(false)
    }
    return () => {
      document.removeEventListener("click", handleClickOutside, false)
    }
    // eslint-disable-next-line
  }, [searchText, data])

  const handleClickOutside = event => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setIsLoading(false)
      setSearchText(tableContext.searchText)
      setTableSearchFiltered(true)
    }
  }

  const handleKeyDown = e => {
    if (e.key === "Enter") {
      setTableSearchFiltered(true)
      setIsLoading(false)
      tableContext.setTable({
        currentPage: 0,
        searchText,
      })
    } else {
      setTableSearchFiltered(false)
    }
  }

  const handleChange = e => {
    if (e.target.value) {
      setIsLoading(true)
    }

    setSearchText(e.target.value)
    tableContext.setTable({ preSearchText: e.target.value })
  }

  const handleClear = () => {
    setIsLoading(false)
    setSearchText("")

    tableContext.setTable({
      currentPage: 0,
      searchText: "",
    })
  }

  const handleScroll = e => {
    if (e.target.scrollHeight - e.target.scrollTop > 500) {
      setShowGradient(true)
    } else {
      setShowGradient(false)
    }
  }

  // build rows
  const rowsCom = () => {
    if (!data) {
      return <></>
    }

    return data.rows.map((elem, key) => {
      elem.row.cells = elem.row.cells.filter(
        cell =>
          SEARCH_CELL_KEYS.includes(cell.key) &&
          cell.value !== "-" &&
          cell.value !== ""
      )

      const handleDetailView = () => {
        const { id, isPdfExist } = elem.row
        tableContext.setTable({
          detailId: id,
          openDetailView: true,
          isPdfExist,
        })
      }

      return (
        <Row
          key={key}
          row={elem.row}
          openDetailView={handleDetailView}
          isLast={key === data.rows.length - 1}
        />
      )
    })
  }

  return (
    <S.StyledDiv
      ref={wrapperRef}
      isExpanded={(!!searchText && !isTableSearchFiltered) || focus}
    >
      <S.StyledSeachContainer active={focus}>
        <SearchIcon />

        <S.StyledInput
          minLength={2}
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          value={searchText || ""}
          debounceTimeout={300}
        />

        <S.StyledImg
          src={indicatorGif}
          alt="search loading indicator"
          isLoading={isLoading && isSearchLoading}
        />

        {searchText && !(isLoading && isSearchLoading) && (
          <S.ClearSearch data-cy="clear-search" onClick={handleClear}>
            <ClearIcon />
          </S.ClearSearch>
        )}
      </S.StyledSeachContainer>

      <S.PreSearchDropDown
        data-cy="search-results-dropdown"
        open={searchText && !isTableSearchFiltered}
      >
        {showGradient && <S.Gradient />}
        <S.Scroll onScroll={handleScroll}>{rowsCom()}</S.Scroll>
      </S.PreSearchDropDown>
    </S.StyledDiv>
  )
}

export default SearchBox
