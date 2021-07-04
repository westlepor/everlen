import styled from "styled-components"
import { Button, colors } from "@everlywell/leaves"

export const PopupContent = styled.div`
  padding: 25px;
  padding-top: ${props => (props.isScrollable ? "0" : "25px")};
`
export const MenuItem = styled.label`
  padding: 8px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: capitalize;
`
export const MenuLabel = styled.div`
  font-size: 16px;
  margin-right: 3px;
  color: ${colors.gray5};
  letter-spacing: 0.27px;
  line-height: 24px;
  font-weight: normal;
`
export const Buttons = styled.div`
  display: flex;
  margin-top: ${props => (props.isNormalPopup ? "16px" : "0")};
  justify-content: space-between;
  align-items: center;
`
export const ResetButton = styled(Button)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 48px;
  width: ${props => (props.width ? `${props.width}px` : "108px")};
  padding: 0;
  border-radius: 1px;
`
export const ApplyButton = styled(Button)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 48px;
  width: ${props => (props.width ? `${props.width}px` : "108px")};
  padding: 0;
  border-radius: 1px;
`
