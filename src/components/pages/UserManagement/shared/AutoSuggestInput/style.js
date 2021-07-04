import styled from "styled-components"

import { Input as BaseInput, colors, size } from "@everlywell/leaves"

const SuggestionsWrapper = styled.div`
  border: 1px solid ${colors.green2};
  box-shadow: 0 7px 30px -10px #dce4e5;
  line-height: 1.57;

  max-height: 177px;
  overflow-y: scroll;

  /*::-webkit-scrollbar {
    width: 35px;
    height: 80px;
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${colors.gray3};
    border: 14px solid transparent;
    border-radius: 30px;
    background-clip: content-box;
  }

  ::-webkit-scrollbar-track {
    background-clip: padding-box;
  } */
`

const SuggestionWrapper = styled.div``

const Suggestion = styled.div`
  height: 61px;
`

const Name = styled.div`
  font-size: 18px;
`

const ID = styled.div`
  font-size: 14px;
`

const Selection = styled.div`
  padding: ${size.sm}px ${size.lg}px ${size.sm}px ${size.md}px;
  border-radius: 1px;
  border: solid 1px ${colors.green2};
  line-height: 1.78;
  color: ${colors.gray4};
`

const SelectionHeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const SelectionName = styled.div`
  font-size: 18px;
`

const SelectionCloseButton = styled.button`
  display: flex;
  align-items: center;
  background: white;
  border: none;
  cursor: pointer;
  margin-right: -10px;
`

const SelectionID = styled.div`
  font-size: 14px;
  margin-top: ${size.sx2}px;
`

const Label = styled.label`
  margin-bottom: ${size.xs3}px;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  color: ${colors.gray4};
`

const Input = styled(BaseInput)`
  input:focus {
    border: solid 1px ${colors.green4} !important;
    box-shadow: none !important;
  }
`

export {
  ID,
  Input,
  Name,
  Label,
  Selection,
  SelectionName,
  SelectionID,
  SelectionCloseButton,
  SelectionHeaderWrapper,
  Suggestion,
  SuggestionWrapper,
  SuggestionsWrapper,
}
