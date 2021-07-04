import styled from "styled-components"

import { colors, typography } from "@everlywell/leaves"

import Icon from "components/atoms/icons/menuExpand"
import ArrowUp from "./arrowUp"
import ArrowDown from "./arrowDown"

const Field = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  color: ${colors.gray4};
  ${props => props.open && `color: ${colors.green6};`}
  margin-top: 36px;
  margin-bottom: 2px;
`

const Container = styled.div`
  height: 48px;
  border-radius: 2px;
  border: solid 1px ${colors.green2};
  padding: 0px 12px;
  padding-bottom: 3px;
  box-shadow: 0 2.5px 10px 0 rgba(170, 169, 172, 0.1);
  cursor: pointer;
  user-select: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover,
  &:focus,
  &:active {
    border: solid 1px ${colors.green4};
    padding-bottom: 3px;
    outline: unset;
  }
  ${props =>
    props.disabled &&
    `
    background-color: rgba(37,34,40,0.05);
    box-shadow: inset 0 0 5px 0 rgba(0,0,0,0.08);
    border-color: #dddddd;
    cursor: not-allowed;
    &:hover,
    &:focus,
    &:active {
      border: solid 1px #dddddd;
    }
  `}

  ${props =>
    props.open &&
    `
    border: solid 1px ${colors.green4};
    border-bottom-width: 4px;
    padding-bottom: 0px;
  `}
`

const Label = styled.span`
  font-family: ${typography.type.nexa};
  font-weight: 400;
  font-size: 1.125rem;
  line-height: 2rem;
  text-align: center;
  color: ${props => (props.disabled ? colors.gray3 : colors.gray4)};
`

const MenuItem = styled.div`
  padding: 10px;
  cursor: pointer;
  font-family: ${typography.type.nexa};
  color: ${colors.gray4};
  font-size: 18px;
  line-height: 1.78;

  &:hover,
  &:focus,
  &:active {
    background: #f5faf7;
    outline: unset;
  }
`

const MenuExpandIcon = styled(Icon)`
  margin-top: 2px;
`

const IconArrowUp = styled(ArrowUp)``

const IconArrowDown = styled(ArrowDown)``

export {
  Field,
  Container,
  Label,
  MenuItem,
  MenuExpandIcon,
  IconArrowUp,
  IconArrowDown,
}
