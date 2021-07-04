import React from "react"
import styled from "styled-components"

import { colors, size } from "@everlywell/leaves"

import SuccessIcon from "components/atoms/icons/success"
import WarningIcon from "components/atoms/icons/warning"

const Container = styled.div`
  display: flex;
  flex-direction: row;
  font-family: "EW Nexa";
`

const Column = styled.div`
  margin-left: ${size.xs1}px;
`

const Title = styled.div`
  font-size: 1rem;
  font-weight: normal;
  line-height: 1.5;
  letter-spacing: 0.27px;
  color: ${colors.gray5};

  margin-bottom: ${size.xs3}px;
`

const Content = styled.div`
  font-size: 0.889rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.55;
  letter-spacing: 0.5px;
  color: ${colors.gray4};

  margin-bottom: 0.125rem;
`

const Toast = ({ message, description, onClick, type = "success" }) => {
  return (
    <Container onClick={onClick}>
      <div>{type === "success" ? <SuccessIcon /> : <WarningIcon />}</div>
      <Column>
        <Title>{message}</Title>
        <Content>{description}</Content>
      </Column>
    </Container>
  )
}

export default Toast
