import styled from "styled-components"
import { Link as BaseLink } from "gatsby"
import {
  Container as BaseContainer,
  H3 as BaseH3,
  H4 as BaseH4,
  colors,
  size,
} from "@everlywell/leaves"

import { TertiaryButton } from "./shared"

const Container = styled(BaseContainer)`
  width: auto;
  padding: 0;
  margin: 0;
  padding-bottom: 120px;
  max-width: 120rem;
`

const Wrapper = styled.div`
  margin-top: ${size.xl3}px;
`

const H3 = styled(BaseH3)`
  font-size: 25.6px;
  font-weight: 500;
  margin-bottom: 10px;
`

const H4 = styled(BaseH4)`
  line-height: 1.4;
  letter-spacing: 0.47px;
`

const SideBar = styled.div`
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
`

const MenuItem = styled(BaseLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${colors.green5};
  margin-bottom: 30px;

  ${props =>
    props.isActive &&
    `&:before {
    content: "";
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 5px solid ${colors.red2};
    margin-right: 8px;
  }
  `}
`

const Title = styled(BaseH3)`
  margin: 0;
  font-weight: 500;
  font-size: 25.6px;
  line-height: 1.25;
`

const TitleButtonWrapper = styled.div`
  margin: ${size.lg}px 0 ${size.sm}px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const Description = styled.div`
  font-size: 18px;
  line-height: 1.78;
  color: ${colors.gray4};
  margin: 0 0 ${size.xl3}px 0;
`

const Link = styled(BaseLink)`
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  color: ${colors.green6};
`

const Details = styled.div`
  display: block;
`

const Text = styled.span`
  font-size: 16px;
  line-height: 1.5;
  margin: 0 6px ${size.xs1}px 0;
`

const BoldText = styled(Text)`
  font-weight: 500;
`

const TopWrapper = styled.div`
  margin: 23px 0 24px;
  display: flex;
  justify-content: space-between;
`

const LeftButton = styled(TertiaryButton)`
  padding: 4px 19px;
  margin-right: 16px;
`

const RightButton = styled(TertiaryButton)`
  padding: 4px 10px;
`

const ButtonsWrapper = styled.div`
  display: flex;
`

export {
  H3,
  H4,
  SideBar,
  MenuItem,
  Wrapper,
  Title,
  TitleButtonWrapper,
  Description,
  Link,
  Details,
  Text,
  BoldText,
  TopWrapper,
  LeftButton,
  RightButton,
  ButtonsWrapper,
  Container,
}
