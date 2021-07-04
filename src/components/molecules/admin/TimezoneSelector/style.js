import styled from "styled-components"

import { colors } from "@everlywell/leaves"

import Icon from "components/atoms/icons/menuExpand"

const Container = styled.div`
  height: 48px;
  border-radius: 2px;
  border: solid 1px ${colors.green2};
  cursor: pointer;
  user-select: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 12px;
  &:hover {
    border: solid 1px ${colors.green4};
  }
  ${props =>
    props.disabled &&
    `
    background-color: rgba(37,34,40,0.05);
    box-shadow: inset 0 0 5px 0 rgba(0,0,0,0.08);
    border-color: #dddddd;
    cursor: not-allowed;
    &:hover {
      border: solid 1px #dddddd;
    }
  `}
`

const Label = styled.span`
  font-family: "EW Nexa";
  font-weight: 400;
  font-size: 1.125rem;
  line-height: 2rem;
  text-align: center;
  color: ${props => (props.disabled ? colors.gray3 : colors.gray4)};
`

const MenuItem = styled.div`
  padding: 10px;
  cursor: pointer;
  font-family: "EW Nexa";
  color: ${colors.gray4};
  font-size: 14px;
  &:hover {
    background: #f5faf7;
  }
`

const MenuExpandIcon = styled(Icon)`
  margin-top: 2px;
`

export { Container, Label, MenuItem, MenuExpandIcon }
