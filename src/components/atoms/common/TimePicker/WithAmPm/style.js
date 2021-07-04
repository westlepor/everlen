import styled from "styled-components"

import { colors, size } from "@everlywell/leaves"

import Icon from "components/atoms/icons/menuExpand"

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Wrapper = styled.div`
  display: flex;
`

const Error = styled.div`
  margin-top: 2px;
  width: 250%;
  color: ${colors.red3};
`

const AmContainer = styled.div`
  width: 56px;
  height: 40px;
  font-size: 16px;
  border-radius: 1px;
  box-shadow: 0 1.5px 10px 0 rgba(0, 0, 0, 0.1);
  border: solid 1px ${colors.green2};
  cursor: pointer;
  user-select: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px ${size.sm}px 0px ${size.md}px;
  margin-left: 8px;
  &:hover,
  &:focus {
    border: solid 1px ${colors.green4};
    outline: none;
  }
  ${props =>
    !props.isValidTime &&
    `
    border: solid 1px ${colors.red3} !important;
    `}
`

const Label = styled.span`
  line-height: 1.78;
  color: ${colors.gray4};
`

const MenuItemListWrapper = styled.div`
  max-height: 120px;
`

const MenuItem = styled.div`
  padding: 0px ${size.sm}px 0px ${size.md}px;
  cursor: pointer;
  line-height: 40px;
  color: ${colors.gray4};
  &:hover {
    background: #f5faf7;
  }
`

const MenuExpandIcon = styled(Icon)`
  stroke: #1e824c;
  margin-top: 2px;
  ${props => !props.isValidTime && `stroke: ${colors.red3}`}
`

const Input = styled.input`
  outline: none;
  width: 52px;
  height: 40px;
  padding: 0px ${size.sm}px 0px ${size.md}px;
  margin: 0;
  font-size: 16px;
  border-radius: 1px;
  box-shadow: 0 1.5px 10px 0 rgba(0, 0, 0, 0.1);
  border: solid 1px ${colors.green2};
  line-height: 1.78;
  color: ${colors.gray4};
  font-family: "EW Nexa", "Helvetica Neue", Helvetica, Arial, sans-serif;
  &:hover {
    border: solid 1px ${colors.green4};
  }
  ${props =>
    !props.isValidTime &&
    `
    border: solid 1px ${colors.red3} !important;
    `}
`

export {
  Container,
  Wrapper,
  Error,
  AmContainer,
  Label,
  MenuItemListWrapper,
  MenuItem,
  MenuExpandIcon,
  Input,
}
