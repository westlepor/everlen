import styled from "styled-components"

import { RadioButton as BaseRadioButton, colors } from "@everlywell/leaves"

const Wrapper = styled.div``

const Label = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  color: ${colors.gray4};
`

const FlexDiv = styled.div``

const RadioWrapper = styled.div`
  margin: 4px 0;

  input:checked + label::before {
    border-color: ${colors.green5} !important;
  }

  input:checked + label::after {
    background: ${colors.green5} !important;
  }

  label {
    height: 20px;

    &::before {
      width: 20px;
      height: 20px;
      border-color: ${colors.green3};
      margin-top: 2px;
    }

    & > div {
      font-size: 16px;
      line-height: 1.75;
      color: ${colors.gray4};
    }

    &::after {
      left: 6px;
      top: 8px;
      width: 10px;
      height: 10px;
    }
  }
`

const RadioButton = styled(BaseRadioButton)``

export { Wrapper, Label, FlexDiv, RadioWrapper, RadioButton }
