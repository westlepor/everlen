import styled from "styled-components"

import { colors, size, Button } from "@everlywell/leaves"

import CustomButton from "components/atoms/button"

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 32px;
`

const DismissButton = styled(Button)`
  border: none;
  margin-right: 10px;
  font-weight: 500;

  &:hover {
    background: white;
    color: ${colors.green5};
  }
`

const SaveButton = styled(CustomButton)`
  width: 150px;
  height: 48px;
  font-weight: 500;
  text-align: center;
  padding: ${size.sm}px 0;
  font-size: 18px;
  line-height: 1.33;
  letter-spacing: 0.3px;
  color: white;
  background-color: ${colors.green5};
  justify-content: center;
  :hover {
    background-color: ${colors.green4};
  }
`

export { ButtonWrapper, DismissButton, SaveButton }
