import styled from "styled-components"

import {
  Input as BaseInput,
  RadioButton as BaseRadioButton,
  colors,
  size,
} from "@everlywell/leaves"

import { TertiaryButton } from "../../shared"

const Wrapper = styled.div`
  position: relative;
  border-radius: 4px;
  border: solid 1px ${colors.teal3};
  padding: 41px 38px;
`

const ButtonWrapper = styled.div`
  position: absolute;
  top: 41px;
  right: 37px;
`

const SaveProfileButton = styled(TertiaryButton)`
  ${props =>
    props.disabled &&
    `
    cursor: not-allowed;
    pointer-events: all !important;

    &:hover {
      border-color: rgba(37,34,40,0.05);
      background-color: rgba(37,34,40,0.05);
      color: #aaa9ac;
    }
  `}
`

const CancelButton = styled(TertiaryButton)`
  border: none;
  margin-right: ${size.md}px;

  &:hover,
  &:focus,
  &:focus-visible {
    border: none;
    background: none;
  }

  &:focus-visible {
    outline: 1px auto rgb(0, 95, 204);
  }
`

const Details = styled.div`
  margin-bottom: 32px;

  &:last-child {
    margin-bottom: 0;
  }
`

const Label = styled.div`
  font-size: 18px;
  line-height: 1.33;
  letter-spacing: 0.45px;
  color: #2d2d2d;
`

const Value = styled.div`
  font-size: 16px;
  line-height: 1.75;
  color: ${colors.gray4};
`

const InputWrapper = styled.div`
  margin-bottom: 4px;

  &:last-child {
    margin-bottom: 0;
  }
`

const Input = styled(BaseInput)`
  max-width: 566px;

  label {
    font-weight: 500;
    margin-bottom: 2px;
  }

  ${props =>
    props.isError &&
    `
    input {
      border-color: ${colors.red3} !important;
      border-bottom-width: 2px !important;

      &:focus {
        border-bottom: 2px solid ${colors.red3} !important;
        box-shadow: unset !important;
      }
    }

    div {
      display: none;
    }
    `}
`

const RadioGroupWrapper = styled(InputWrapper)`
  margin-bottom: 32px;
`

const RadioGroupLabel = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  color: ${colors.gray4};
  margin-bottom: 16px;
`

const RadioButton = styled(BaseRadioButton)`
  height: auto;
  margin-bottom: 8px;

  label {
    &:before {
      width: 20px;
      height: 20px;
      border-color: rgb(113, 172, 133);
    }

    &:after {
      left: 5px;
      top: 5px;
      width: 12px;
      height: 12px;
    }
  }

  input:checked + label {
    &:before {
      border-color: rgb(75, 163, 115) !important;
    }

    &:after {
      background: rgb(30, 130, 76) !important;
    }
  }
`

const WarningWrapper = styled.div`
  display: flex;
`

const InvalidEmail = styled.div`
  color: ${colors.red3};
`

const WarningBody = styled.div`
  font-size: 18px;
  line-height: 1.78;
  color: ${colors.gray4};
`

const WarningLinkWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`

const WarningLink = styled.div`
  font-size: 18px;
  font-weight: 500;
  line-height: 1.33;
  letter-spacing: 0.3px;
  color: ${colors.green5};
  margin-left: 10px;
  margin-right: 6px;
`

export {
  Wrapper,
  ButtonWrapper,
  Label,
  Value,
  Details,
  CancelButton,
  SaveProfileButton,
  InputWrapper,
  Input,
  RadioGroupWrapper,
  RadioButton,
  RadioGroupLabel,
  WarningWrapper,
  InvalidEmail,
  WarningBody,
  WarningLinkWrapper,
  WarningLink,
}
