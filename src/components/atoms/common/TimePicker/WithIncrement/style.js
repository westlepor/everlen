import styled from "styled-components"

import { colors, size } from "@everlywell/leaves"

import Icon from "components/atoms/icons/clock"

const Container = styled.div`
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
  &:hover {
    border: solid 1px ${colors.green4};
  }
`

const Label = styled.span`
  line-height: 1.78;
  color: ${colors.gray4};
`

const MenuItemListWrapper = styled.div`
  max-height: 120px;
  overflow-y: scroll;
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
  margin-top: 2px;
`

const Overlay = styled.div`
  position: absolute;
  z-index: 99;
  bottom: 0;
  height: 30px;
  width: 100%;
  background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0),
    #fff 50%
  );
`

export {
  Container,
  Overlay,
  Label,
  MenuItemListWrapper,
  MenuItem,
  MenuExpandIcon,
}
