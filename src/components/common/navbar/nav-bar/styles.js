import styled from "styled-components"

import { Container, colors, Button } from "@everlywell/leaves"

const Navigation = styled.header`
  border-bottom: 2px solid ${colors.green2};
`
const NavConatiner = styled(Container)`
  min-height: 56px;
  display: flex;
  justify-content: space-between;

  width: auto;
  padding: 0;
  margin: 0 74px;
  max-width: 120rem;

  @media (max-width: 768px) {
    position: sticky;
    height: 8vh;
    top: 0;
    left: 0;
    right: 0;
    left: 0;
    z-index: 20;
  }
`

const Toggle = styled.div`
  display: none;
  height: 100%;
  cursor: pointer;

  @media (max-width: 768px) {
    display: flex;
  }
`

const Navbox = styled.div`
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
    position: fixed;
    left: ${props => (props.open ? "0" : "-100%")};
    top: 8vh;
    width: calc(100vw - 3rem);
    height: 100%;
    justify-content: flex-start;
    background-color: white;
    transition: all 0.3s ease-in;
    padding: ${props => (props.open ? "0 1.5rem" : "unset")};
  }
`

const Hamburger = styled.div`
  background-color: ${colors.teal6};
  width: 30px;
  height: 3px;
  transition: all 0.3s linear;
  align-self: center;
  position: relative;
  transform: ${props => (props.open ? "rotate(-45deg)" : "inherit")};

  ::before,
  ::after {
    width: 30px;
    height: 3px;
    background-color: ${colors.teal6};
    content: "";
    position: absolute;
    transition: all 0.3s linear;
  }

  ::before {
    transform: ${props =>
      props.open ? "rotate(-90deg) translate(-10px, 0px)" : "rotate(0deg)"};
    top: -10px;
  }

  ::after {
    opacity: ${props => (props.open ? "0" : "1")};
    transform: ${props => (props.open ? "rotate(90deg) " : "rotate(0deg)")};
    top: 10px;
  }
`

const CliaWaiverButton = styled(Button)`
  display: flex;
  align-items: center;
  align-self: center;

  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.27px;
  line-height: 1.5;
  height: 32px;
  box-shadow: none;

  padding: 4px 10px;
  border-radius: 2px;
  border: solid 1px ${colors.green2};
  color: ${colors.green5};
  background: white;

  :hover {
    color: ${colors.green5};
    background: rgba(214, 235, 221, 0.2);
    border-color: ${colors.green4};
  }

  :focus {
    color: ${colors.green5};
    background: white;
    border: solid 1px ${colors.green2};
  }
`

export { Navigation, NavConatiner, Toggle, Navbox, Hamburger, CliaWaiverButton }
