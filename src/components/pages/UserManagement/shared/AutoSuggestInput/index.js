import React, { createRef } from "react"
import * as Autosuggest from "react-autosuggest"

import "./AutoSuggestInput.css"

import * as S from "./style"

const getSuggestionValue = suggestion => suggestion.name

const renderInputComponent = inputProps => <S.Input {...inputProps} />

const renderSuggestionsContainer = ({ containerProps, children }) => {
  return (
    <S.SuggestionsWrapper {...containerProps}>{children}</S.SuggestionsWrapper>
  )
}

class AutoSuggestInput extends React.Component {
  constructor(props) {
    super()

    this.state = {
      value: "",
      suggestions: [],
    }

    this.inputRef = props.inputRef || createRef()
    this.searchables = props.searchables || ["id", "name"]
  }

  onChange = (_event, { newValue }) => {
    this.setState({ value: newValue })
  }

  getSuggestions = value => {
    const inputValue = value.toString().trim().toLowerCase()
    const inputLength = inputValue.length

    return inputLength === 0
      ? []
      : this.props.items.filter(item => {
          const hasMatch = this.searchables.some(searchable => {
            return item[searchable]
              ?.toString()
              ?.toLowerCase()
              ?.split(",")
              ?.join(" ")
              ?.includes(inputValue)
          })

          return hasMatch
        })
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({ suggestions: this.getSuggestions(value) })
  }

  onSuggestionsClearRequested = () => {
    this.setState({ suggestions: [] })
  }

  render() {
    const { value, suggestions } = this.state
    const { placeholder, inputID, label } = this.props

    const inputProps = {
      value,
      label: label ? label : "",
      placeholder,
      id: inputID,
      onChange: this.onChange,
      ref: this.inputRef,
    }

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        onSuggestionSelected={this.props.onSuggestionSelected}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={this.props.renderSuggestion}
        inputProps={inputProps}
        renderInputComponent={renderInputComponent}
        renderSuggestionsContainer={renderSuggestionsContainer}
      />
    )
  }
}

export default AutoSuggestInput
