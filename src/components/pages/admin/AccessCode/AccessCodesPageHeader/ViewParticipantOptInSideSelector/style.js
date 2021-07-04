import styled from "styled-components"

import { size, colors, typography } from "@everlywell/leaves"

const Link = styled.a`
  display: flex;
  align-items: center;
  background: white;
  border: 1px solid ${colors.green2};
  border-radius: 2px;
  font-weight: 600;
  cursor: pointer;
  padding: 0.428rem ${size.sm}px;
  text-decoration: none;
  transition: 0.2s;

  :hover {
    border-color: ${colors.green4};
    background-color: rgba(214, 235, 221, 0.2);
  }
`

const PortalLink = styled.a`
  display: flex;
  font-weight: ${typography.subtitle};
  font-size: 1rem;
  cursor: pointer;
  padding: 0.781rem 1.562rem;
  text-decoration: none;
  transition: 0.2s;

  :hover {
    background-color: rgba(214, 235, 221, 0.2);
  }
`

const DropdownTrigger = styled.button`
  display: flex;
  align-items: center;
  background: white;
  border: 1px solid;
  border-color: ${props => (props.isOpen ? colors.green4 : colors.green2)};
  border-radius: 2px;
  font-family: ${typography.type.nexa};
  font-weight: 600;
  cursor: pointer;
  padding: 0.428rem ${size.sm}px;
  text-decoration: none;
  transition: 0.2s;

  :hover,
  :focus {
    outline: none;
    border-color: ${colors.green4};
    background-color: rgba(214, 235, 221, 0.2);
  }
`

const ArrowWrapper = styled.span`
  margin-left: 0.562rem;
`

const Text = styled.span`
  color: ${colors.green5};
  font-size: 1rem;
  line-height: 1.5;
  letter-spacing: 0.27px;
`

const UserIconWrapper = styled.span`
  display: flex;
  align-items: center;
  margin-right: 0.562rem;
`

export {
  Link,
  Text,
  UserIconWrapper,
  DropdownTrigger,
  ArrowWrapper,
  PortalLink,
}
