import React from "react"

import CloseIcon from "components/atoms/icons/autoSuggestClose"

import AutoSuggestInput from "../AutoSuggestInput"

import * as S from "../AutoSuggestInput/style"

const AutoSuggestSelector = ({
  inputID,
  selectedID,
  displayName,
  displayID,
  setSelectedID,
  placeholder,
  items,
  label,
  inputRef,
  type,
  searchables,
}) => {
  const onSuggestionSelected = (_e, { suggestion }) => {
    setSelectedID(suggestion.id)
  }

  const renderSuggestion = suggestion => {
    const isGroupSuggestion = suggestion.hasOwnProperty("partner_id")

    if (!isGroupSuggestion) {
      return (
        <S.SuggestionWrapper>
          <S.Name>{suggestion.name}</S.Name>
          <S.ID>
            {type} ID: {suggestion.id}
          </S.ID>
        </S.SuggestionWrapper>
      )
    }

    const hasClients = suggestion?.client_ids?.length > 0

    const displayType = hasClients ? "Client" : "Partner"

    const displayID = hasClients
      ? suggestion.client_ids.join(", ")
      : suggestion.partner_id

    const shouldBePlural = displayID?.toString().includes(",")

    return (
      <S.SuggestionWrapper>
        <S.Name>{suggestion.name}</S.Name>
        <S.ID>
          {displayType} ID{shouldBePlural && "s"}: {displayID}
        </S.ID>
      </S.SuggestionWrapper>
    )
  }

  if (!!selectedID) {
    const shouldBePlural = displayID?.toString().includes(",")

    return (
      <>
        {label && <S.Label htmlFor={inputID}>{label}</S.Label>}

        <S.Selection>
          <S.SelectionHeaderWrapper>
            <S.SelectionName>{displayName}</S.SelectionName>
            <S.SelectionCloseButton
              onClick={e => {
                setSelectedID()
                e.preventDefault()
              }}
            >
              <CloseIcon />
            </S.SelectionCloseButton>
          </S.SelectionHeaderWrapper>

          <S.SelectionID>
            {type} ID{shouldBePlural && "s"}: {displayID || selectedID}
          </S.SelectionID>
        </S.Selection>
      </>
    )
  }

  return (
    <AutoSuggestInput
      inputID={inputID}
      items={items}
      label={label}
      renderSuggestion={renderSuggestion}
      onSuggestionSelected={onSuggestionSelected}
      inputRef={inputRef}
      placeholder={placeholder}
      searchables={searchables}
    />
  )
}

export default AutoSuggestSelector
