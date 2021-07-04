import styled from "styled-components"

import { colors, H3, size } from "@everlywell/leaves"

import Button from "components/atoms/button"
import Icon from "components/atoms/icons/add"

const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 45px;
`

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Title = styled(H3)`
  font-size: 32.4px;
  font-weight: normal;
  line-height: 1.23;
  letter-spacing: 0.56px;
  color: ${colors.teal6};
  margin: 0;
`

const RegisterKitButton = styled(Button)`
  height: 32px;
  width: auto;
  align-items: center;
  background: white;
  border: solid 1px ${colors.green2};
  border-radius: 2px;
  color: ${colors.green5};
  cursor: pointer;
  display: flex;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.27px;
  line-height: 1.5;
  margin-left: ${size.xl2}px;
  padding: 4px 10px;
  :hover {
    background-color: #f7fbf9;
    border-color: ${colors.green4};
  }
`

const AddIcon = styled(Icon)`
  margin-right: ${size.xs2}px;
`

export { Root, Title, LeftSection, RegisterKitButton, AddIcon }
