import styled from "styled-components"

import { colors } from "@everlywell/leaves"

const Content = styled.div`
  margin: -17px -17px ${props => (props.isCustom ? "10px" : "-17px")}} -17px;
  color: ${colors.gray4};
  font-size: 18px;
`

const Header = styled.div`
  display: ${props => (props.hide ? "none" : "flex")};
  position: relative;
  align-items: center;
  padding: 0 0 7px 0;
`

const MiddleLine = styled.div`
  width: 100%;
  height: 1px;
  margin-left: 9px;
  border-bottom: 1px solid ${colors.gray2};
`

const ItemGroup = styled.div`
  margin: 14px 15px 0 15px;
`

const ItemContainer = styled.div`
  height: 35px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 9px 0;
  cursor: pointer;
`

const Item = styled.div`
  margin-left: 16px;
  font-family: "EW Nexa";
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.78;
  letter-spacing: normal;
  color: ${colors.gray4};
`

const CustomItemContainer = styled.div`
  height: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 9px 0 50px 0;
`

const CustomItem = styled.div`
  margin-left: 43px;
  font-family: "EW Nexa";
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.78;
  letter-spacing: normal;
  color: ${colors.gray4};
  cursor: pointer;
`

const CustomHeaderTitle = styled.div`
  display: contents;
`

const OptionRight = styled.div`
  height: 20px;
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: -15px;
  cursor: pointer;
`

const OptionLeft = styled.div`
  height: 20px;
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

const CustomDateTitle = styled.div`
  margin-left: 3px;
  cursor: pointer;
  font-family: "EW Nexa";
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.78;
  letter-spacing: normal;
`

const DatePickInputContainer = styled.div`
  margin: 10px 8px 0 8px;
  display: flex;
  justify-content: space-between;
`

const DatePickInput = styled.div`
  margin-top: 3px;
  margin-bottom: 8px;
  position: relative;
`

const DatePickTitle = styled.div`
  font-family: "EW Nexa";
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  color: ${colors.gray4};
`

const InputField = styled.input`
  width: 91px;
  height: 17px;
  margin-top: 7px;
  padding: 12.5px 43px 12.5px 10px;
  border: 1px solid ${colors.green2};
  font-family: "EW Nexa";
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.75;
  letter-spacing: normal;
  color: ${colors.gray4};
  cursor: default;
  border-radius: 1px;
  box-shadow: 0 1.5px 10px 0 rgba(0, 0, 0, 0.1);

  &:focus {
    outline: none;
  }
`

const InputIcon = styled.div`
  position: absolute;
  top: 41px;
  right: 10px;
  width: 27px;
  height: 27px;
  margin-top: -2px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export {
  Content,
  Header,
  MiddleLine,
  ItemGroup,
  ItemContainer,
  Item,
  CustomItemContainer,
  CustomItem,
  CustomHeaderTitle,
  OptionRight,
  OptionLeft,
  CustomDateTitle,
  DatePickInputContainer,
  DatePickInput,
  DatePickTitle,
  InputField,
  InputIcon,
}
