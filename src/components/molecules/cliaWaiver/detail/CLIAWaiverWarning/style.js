import styled from "styled-components"

import { colors } from "@everlywell/leaves"

import WarningIcon from "components/atoms/icons/warningCircle"

const Wrapper = styled.div`
  border-radius: 1px;
  box-shadow: 0 2px 20px -5px rgba(170, 169, 172, 0.4);
  border: solid 1px ${colors.orange3};
  background-color: ${colors.white};
  padding: 14px;
  display: flex;
  margin-top: 8px;
`

const Content = styled.div`
  margin-left: 9px;
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: 0.27px;
  color: ${colors.gray5};
`

const Link = styled.span`
  font-weight: 500;
  color: ${colors.green5};
  cursor: pointer;
`

const Icon = styled(WarningIcon)``

export { Wrapper, Content, Link, Icon }
