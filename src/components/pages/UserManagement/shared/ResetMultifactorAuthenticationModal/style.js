import styled from "styled-components"

import { Checkbox as BaseCheckbox, colors, size } from "@everlywell/leaves"

import { Actions as BaseActions } from "../ConfirmationModal/style"

const Actions = styled(BaseActions)`
  margin-top: 50px;

  button {
    &:first-child {
      width: 150px !important;
    }
  }
`
const DescriptionWrapper = styled.div`
  text-align: left;
`

const Description = styled.div`
  margin-bottom: ${size.xl1}px;
`

const Checkbox = styled(BaseCheckbox)`
  margin-bottom: 76px;

  div {
    width: 24px;
    height: 24px;
    margin: 0 ${size.sm}px 2px 0;
  }

  label {
    font-weight: 500;
    color: ${colors.gray4};
  }
`

export { Actions, DescriptionWrapper, Description, Checkbox }
