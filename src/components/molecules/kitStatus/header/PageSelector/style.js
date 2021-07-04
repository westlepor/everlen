import styled from "styled-components"

import { colors, size } from "@everlywell/leaves"

import Icon from "components/atoms/icons/menuExpand"

const Container = styled.div`
  width: 128px;
  height: 32px;
  border-radius: 2px;
  border: solid 1px ${colors.green2};
  cursor: pointer;
  user-select: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px ${size.xs1}px;
  &:hover {
    border: solid 1px ${colors.green4};
  }
`

const Label = styled.span`
  font-family: "EW Nexa";
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: 0.27px;
  text-align: center;
  color: ${colors.green5};
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
