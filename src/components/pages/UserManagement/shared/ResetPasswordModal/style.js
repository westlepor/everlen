import styled from "styled-components"

import {
  RadioButton as BaseRadioButton,
  colors,
  size,
} from "@everlywell/leaves"

import { Actions as BaseActions } from "../ConfirmationModal/style"

const Actions = styled(BaseActions)`
  margin-top: 50px;

  button {
    width: 150px !important;
  }
`
const DescriptionWrapper = styled.div`
  text-align: left;
`

const Description = styled.div`
  margin-bottom: ${size.xl1}px;
  text-align: center;
`

const RadioButton = styled(BaseRadioButton)`
  height: auto;
  margin-bottom: ${size.xl1}px;

  &:last-child {
    margin-bottom: 69px;
  }

  > div {
    width: 24px;
    height: 24px;
    margin: 0 ${size.sm}px 2px 0;
  }

  label {
    font-weight: 500;
    color: ${colors.gray4};
    height: auto;

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

const Label = styled.div`
  color: ${colors.gray4};
  margin-top: -5px;
`

const LabelName = styled.div`
  font-weight: 500;
  font-size: 18px;
  line-height: 1.33;
`

const LabelDescription = styled.div`
  margin-top: 1px;
  font-size: 16px;
  line-height: 1.75;
`

export {
  Actions,
  DescriptionWrapper,
  Description,
  Label,
  LabelName,
  LabelDescription,
  RadioButton,
}
