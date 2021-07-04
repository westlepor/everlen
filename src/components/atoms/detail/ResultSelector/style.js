import styled from "styled-components"

import { colors, size } from "@everlywell/leaves"

const Container = styled.div`
  display: flex;
  margin-top: 20px;
`

const Button = styled.div`
  padding: ${size.sm}px ${size.lg}px;
  border: solid 1px ${colors.green2};
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0.27px;
  text-align: center;
  color: ${colors.green5};
  cursor: pointer;

  ${props =>
    props.isActive &&
    props.type === "positive" &&
    `
  border: solid 1px ${colors.red3} !important;
  background: ${colors.red1};
  color: ${colors.red3};
  `}

  ${props =>
    props.isActive &&
    props.type === "invalid" &&
    `
    background: rgb(255, 243, 222);
    border-color: rgb(247, 223, 183) !important;
    color: #8b640a;
  `}

  ${props =>
    props.isActive &&
    props.type === "negative" &&
    `
    border: solid 1px ${colors.green4} !important;
    background: #f7fbf9;
    `}

  :hover {
    ${props =>
      props.type === "positive" &&
      `
    border: solid 1px ${colors.red3} !important;
    background: ${colors.red1};
    color: ${colors.red3};
    `}
  
    ${props =>
      props.type === "invalid" &&
      `
      background: rgb(255, 243, 222);
      border-color: rgb(247, 223, 183) !important;
      color: #8b640a;
    `}
  
    ${props =>
      props.type === "negative" &&
      `
      border: solid 1px ${colors.green4} !important;
      background: #f7fbf9;
      `}
  }

  :first-child {
    border-right: solid 1px ${colors.white};
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
  }

  :last-child {
    border-left: solid 1px ${colors.white};
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
  }
`

export { Container, Button }
